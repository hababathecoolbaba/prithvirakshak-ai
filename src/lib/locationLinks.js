export function getGPSPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error(
          "Location services are not supported by this browser."
        )
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,
        });
      },

      () => {
        reject(
          new Error(
            "Location permission was not granted."
          )
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

export function mapsSearchURL(
  query,
  coords = null
) {
  let searchQuery = query;

  if (coords) {
    searchQuery =
      `${query} near ` +
      `${coords.latitude},${coords.longitude}`;
  } else {
    searchQuery = `${query} near me`;
  }

  return (
    "https://www.google.com/maps/search/" +
    "?api=1&query=" +
    encodeURIComponent(searchQuery)
  );
}

export function mapsDirectionsURL({
  destination,
  coords = null,
  travelMode = "driving",
}) {
  const params = new URLSearchParams({
    api: "1",
    destination,
    travelmode: travelMode,
  });

  if (coords) {
    params.set(
      "origin",
      `${coords.latitude},${coords.longitude}`
    );
  }

  return (
    "https://www.google.com/maps/dir/?" +
    params.toString()
  );
}

export function openExternal(url) {
  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}
