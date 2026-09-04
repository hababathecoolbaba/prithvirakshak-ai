const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export function weatherDescription(code) {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Rain showers",
    82: "Heavy rain showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail",
  };

  return descriptions[code] || "Weather conditions";
}

export async function searchLocation(query) {
  const url =
    `${GEOCODING_URL}?name=${encodeURIComponent(query)}` +
    "&count=1&language=en&format=json";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Location search failed.");
  }

  const data = await response.json();

  if (!data.results?.length) {
    throw new Error("Location not found.");
  }

  const result = data.results[0];

  return {
    name: result.name,
    admin1: result.admin1 || "",
    country: result.country || "",
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
    displayName: [
      result.name,
      result.admin1,
      result.country,
    ]
      .filter(Boolean)
      .join(", "),
  };
}

export async function getWeatherByCity(query) {
  const location = await searchLocation(query);

  return getWeatherByCoords(
    location.latitude,
    location.longitude,
    location
  );
}

export async function getWeatherByCoords(
  latitude,
  longitude,
  location = null
) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "rain",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ].join(","),

    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation_probability",
      "precipitation",
      "rain",
      "weather_code",
      "cloud_cover",
      "visibility",
      "wind_speed_10m",
      "wind_gusts_10m",
    ].join(","),

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_gusts_10m_max",
    ].join(","),

    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(
    `${FORECAST_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Weather service unavailable.");
  }

  const data = await response.json();

  const currentTime = data.current?.time || "";
  const hourKey = currentTime.slice(0, 13);

  let startIndex = data.hourly?.time?.findIndex((time) =>
    time.startsWith(hourKey)
  );

  if (startIndex == null || startIndex < 0) {
    startIndex = 0;
  }

  const hourly = [];

  for (
    let i = startIndex;
    i < Math.min(startIndex + 24, data.hourly.time.length);
    i++
  ) {
    hourly.push({
      time: data.hourly.time[i],
      temperature: data.hourly.temperature_2m[i],
      humidity: data.hourly.relative_humidity_2m[i],
      precipitationProbability:
        data.hourly.precipitation_probability[i],
      precipitation: data.hourly.precipitation[i],
      rain: data.hourly.rain[i],
      weatherCode: data.hourly.weather_code[i],
      condition: weatherDescription(
        data.hourly.weather_code[i]
      ),
      cloudCover: data.hourly.cloud_cover[i],
      visibility: data.hourly.visibility[i],
      windSpeed: data.hourly.wind_speed_10m[i],
      windGusts: data.hourly.wind_gusts_10m[i],
    });
  }

  const daily = data.daily.time.map((time, index) => ({
    time,
    weatherCode: data.daily.weather_code[index],
    condition: weatherDescription(
      data.daily.weather_code[index]
    ),
    maxTemperature: data.daily.temperature_2m_max[index],
    minTemperature: data.daily.temperature_2m_min[index],
    precipitation: data.daily.precipitation_sum[index],
    precipitationProbability:
      data.daily.precipitation_probability_max[index],
    maxWindGust:
      data.daily.wind_gusts_10m_max[index],
  }));

  const nextSix = hourly.slice(0, 6);

  const maxRainProbability = Math.max(
    0,
    ...nextSix.map(
      (item) => item.precipitationProbability || 0
    )
  );

  const maxPrecipitation = Math.max(
    0,
    ...nextSix.map((item) => item.precipitation || 0)
  );

  const maxWindGust = Math.max(
    data.current?.wind_gusts_10m || 0,
    ...nextSix.map((item) => item.windGusts || 0)
  );

  const thunderstorm = nextSix.some((item) =>
    [95, 96, 99].includes(item.weatherCode)
  );

  let riskLevel = "GREEN";
  let actionLevel = "NORMAL";

  if (
    thunderstorm ||
    maxWindGust >= 60 ||
    maxPrecipitation >= 10
  ) {
    riskLevel = "ORANGE";
    actionLevel = "BE PREPARED";
  } else if (
    maxWindGust >= 40 ||
    maxPrecipitation >= 5 ||
    maxRainProbability >= 60
  ) {
    riskLevel = "YELLOW";
    actionLevel = "STAY AWARE";
  }

  const riskFactors = [];

  if (thunderstorm) {
    riskFactors.push(
      "Thunderstorm conditions appear in the next 6-hour forecast."
    );
  }

  if (maxRainProbability >= 60) {
    riskFactors.push(
      `Rain probability reaches ${Math.round(
        maxRainProbability
      )}% in the next 6 hours.`
    );
  }

  if (maxWindGust >= 40) {
    riskFactors.push(
      `Forecast wind gusts reach about ${Math.round(
        maxWindGust
      )} km/h.`
    );
  }

  if (maxPrecipitation >= 5) {
    riskFactors.push(
      `Hourly precipitation may reach ${maxPrecipitation.toFixed(
        1
      )} mm.`
    );
  }

  if (!riskFactors.length) {
    riskFactors.push(
      "No major prototype risk trigger detected in the next 6 hours."
    );
  }

  const visibility =
    hourly[0]?.visibility != null
      ? hourly[0].visibility / 1000
      : null;

  return {
    source: "Open-Meteo",
    live: true,

    location: location || {
      name: "Current Location",
      displayName: "Current Location",
      latitude,
      longitude,
    },

    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,

    current: {
      ...data.current,
      condition: weatherDescription(
        data.current.weather_code
      ),
      visibilityKm: visibility,
      precipitationProbability:
        hourly[0]?.precipitationProbability ?? null,
    },

    hourly,
    daily,

    risk: {
      level: riskLevel,
      action: actionLevel,
      factors: riskFactors,
      thunderstorm,
      maxRainProbability,
      maxWindGust,
      maxPrecipitation,
      officialWarning: false,
    },
  };
}
