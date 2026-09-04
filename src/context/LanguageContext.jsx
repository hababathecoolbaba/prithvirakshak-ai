import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LanguageContext = createContext(null);

export const languages = [
  { code: "en", native: "English", english: "English", dir: "ltr" },
  { code: "hi", native: "\u0939\u093f\u0928\u094d\u0926\u0940", english: "Hindi", dir: "ltr" },
  { code: "es", native: "Espa\u00f1ol", english: "Spanish", dir: "ltr" },
  { code: "fr", native: "Fran\u00e7ais", english: "French", dir: "ltr" },
  { code: "de", native: "Deutsch", english: "German", dir: "ltr" },
  { code: "pt", native: "Portugu\u00eas", english: "Portuguese", dir: "ltr" },
  { code: "ar", native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", english: "Arabic", dir: "rtl" },
  { code: "ur", native: "\u0627\u0631\u062f\u0648", english: "Urdu", dir: "rtl" },
  { code: "zh", native: "\u4e2d\u6587", english: "Chinese", dir: "ltr" },
  { code: "ja", native: "\u65e5\u672c\u8a9e", english: "Japanese", dir: "ltr" },
  { code: "ko", native: "\ud55c\uad6d\uc5b4", english: "Korean", dir: "ltr" },
  { code: "ru", native: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", english: "Russian", dir: "ltr" },
];

const translations = {
  en: {
    home: "Home",
    liveMap: "Live Map",
    nowcast: "Forecast",
    alerts: "Weather Risk",
    preparedness: "Preparedness",
    services: "Services",
    language: "Language",
    accessibility: "Accessibility",
    signIn: "Sign In",
    signUp: "Create Account",
    logout: "Sign Out",
    enterCitizen: "Enter as Citizen",
    authorityLogin: "Authority Login",
    responderLogin: "Responder Login",
    emergencyAccess: "Emergency Access",
    predictEarly: "Predict Early.",
    warnLocally: "Warn Locally.",
    actFaster: "Act Faster.",
    heroSubtitle:
      "AI-driven hyper-local severe weather forecasting and disaster intelligence.",
    liveWeather: "Live Weather",
    liveWeatherTitle: "Live Hyper-Local Weather Intelligence.",
    liveWeatherSubtitle:
      "Current conditions and forecast data for locations worldwide.",
    useMyLocation: "Use My Location",
    hourlyForecast: "Hourly Forecast",
    searchPlaceholder: "Enter city or place",
    search: "Search",
    liveLocation: "LIVE LOCATION",
    loadingWeather: "Loading live weather...",
    feelsLike: "Feels like",
    humidity: "Humidity",
    rain: "Rain",
    wind: "Wind",
    windGust: "Wind Gust",
    cloudCover: "Cloud Cover",
    pressure: "Pressure",
    forecastRisk: "PRITHVIRAKSHAK FORECAST RISK",
    riskDisclaimer:
      "Forecast-based prototype indicator, not an official warning.",
    currentConditions: "Current Conditions",
    temperature: "Temperature",
    rainChance: "Rain Chance",
    visibility: "Visibility",
    disasterIntelligence: "Disaster Intelligence",
    liveForecast: "Live Forecast",
    weatherRisk: "Weather Risk",
    lowerRiskRoute: "Lower-Risk Route",
    findShelter: "Find Shelter",
    askPrithvi: "Ask Prithvi AI",
    welcomeBack: "Welcome Back",
    accountTitle: "Citizen Account",
    email: "Email",
    password: "Password",
    name: "Name",
    confirmPassword: "Confirm Password",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    createAccount: "Create Account",
    signInButton: "Sign In",
    demoAuth:
      "Prototype authentication. Production accounts require a secure authentication service.",
    invalidLogin: "Email or password is incorrect.",
    accountCreated: "Account created successfully.",
    passwordsMismatch: "Passwords do not match.",
    accountExists: "An account with this email already exists.",
    fillFields: "Please complete all required fields.",
    ministry: "Ministry of Earth Sciences",
  },

  hi: {
    home: "\u0939\u094b\u092e",
    liveMap: "\u0932\u093e\u0907\u0935 \u092e\u0948\u092a",
    nowcast: "\u092e\u094c\u0938\u092e \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928",
    alerts: "\u092e\u094c\u0938\u092e \u091c\u094b\u0916\u093f\u092e",
    preparedness: "\u0924\u0948\u092f\u093e\u0930\u0940",
    services: "\u0938\u0947\u0935\u093e\u090f\u0902",
    language: "\u092d\u093e\u0937\u093e",
    accessibility: "\u0938\u0941\u0932\u092d\u0924\u093e",
    signIn: "\u0938\u093e\u0907\u0928 \u0907\u0928",
    signUp: "\u0916\u093e\u0924\u093e \u092c\u0928\u093e\u090f\u0902",
    logout: "\u0938\u093e\u0907\u0928 \u0906\u0909\u091f",
    enterCitizen: "\u0928\u093e\u0917\u0930\u093f\u0915 \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u092a\u094d\u0930\u0935\u0947\u0936",
    authorityLogin: "\u092a\u094d\u0930\u093e\u0927\u093f\u0915\u0930\u0923 \u0932\u0949\u0917\u093f\u0928",
    responderLogin: "\u0930\u093f\u0938\u094d\u092a\u0949\u0928\u094d\u0921\u0930 \u0932\u0949\u0917\u093f\u0928",
    emergencyAccess: "\u0906\u092a\u093e\u0924\u0915\u093e\u0932\u0940\u0928 \u092a\u094d\u0930\u0935\u0947\u0936",
    predictEarly: "\u091c\u0932\u094d\u0926 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928\u0964",
    warnLocally: "\u0938\u094d\u0925\u093e\u0928\u0940\u092f \u091a\u0947\u0924\u093e\u0935\u0928\u0940\u0964",
    actFaster: "\u0924\u0947\u091c\u0940 \u0938\u0947 \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908\u0964",
    heroSubtitle:
      "\u090f\u0906\u0908 \u0906\u0927\u093e\u0930\u093f\u0924 \u0939\u093e\u0907\u092a\u0930-\u0932\u094b\u0915\u0932 \u0917\u0902\u092d\u0940\u0930 \u092e\u094c\u0938\u092e \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928 \u0914\u0930 \u0906\u092a\u0926\u093e \u092c\u0941\u0926\u094d\u0927\u093f\u092e\u0924\u094d\u0924\u093e\u0964",
    liveWeather: "\u0932\u093e\u0907\u0935 \u092e\u094c\u0938\u092e",
    liveWeatherTitle: "\u0932\u093e\u0907\u0935 \u0939\u093e\u0907\u092a\u0930-\u0932\u094b\u0915\u0932 \u092e\u094c\u0938\u092e \u091c\u093e\u0928\u0915\u093e\u0930\u0940\u0964",
    liveWeatherSubtitle:
      "\u0926\u0941\u0928\u093f\u092f\u093e \u092d\u0930 \u0915\u0947 \u0938\u094d\u0925\u093e\u0928\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f \u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u092e\u094c\u0938\u092e \u0914\u0930 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928\u0964",
    useMyLocation: "\u092e\u0947\u0930\u093e \u0938\u094d\u0925\u093e\u0928 \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0947\u0902",
    hourlyForecast: "\u0918\u0902\u091f\u0947\u0935\u093e\u0930 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928",
    searchPlaceholder: "\u0936\u0939\u0930 \u092f\u093e \u0938\u094d\u0925\u093e\u0928 \u0932\u093f\u0916\u0947\u0902",
    search: "\u0916\u094b\u091c\u0947\u0902",
    liveLocation: "\u0932\u093e\u0907\u0935 \u0938\u094d\u0925\u093e\u0928",
    loadingWeather: "\u0932\u093e\u0907\u0935 \u092e\u094c\u0938\u092e \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u093e \u0939\u0948...",
    feelsLike: "\u092e\u0939\u0938\u0942\u0938",
    humidity: "\u0928\u092e\u0940",
    rain: "\u092c\u093e\u0930\u093f\u0936",
    wind: "\u0939\u0935\u093e",
    windGust: "\u0939\u0935\u093e \u0915\u0947 \u091d\u094b\u0902\u0915\u0947",
    cloudCover: "\u092c\u093e\u0926\u0932",
    pressure: "\u0935\u093e\u092f\u0941\u0926\u093e\u092c",
    forecastRisk: "\u092a\u0943\u0925\u094d\u0935\u0940\u0930\u0915\u094d\u0937\u0915 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928 \u091c\u094b\u0916\u093f\u092e",
    riskDisclaimer:
      "\u092f\u0939 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928 \u0906\u0927\u093e\u0930\u093f\u0924 \u0938\u0902\u0915\u0947\u0924\u0915 \u0939\u0948, \u0906\u0927\u093f\u0915\u093e\u0930\u093f\u0915 \u091a\u0947\u0924\u093e\u0935\u0928\u0940 \u0928\u0939\u0940\u0902\u0964",
    currentConditions: "\u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u092e\u094c\u0938\u092e",
    temperature: "\u0924\u093e\u092a\u092e\u093e\u0928",
    rainChance: "\u092c\u093e\u0930\u093f\u0936 \u0915\u0940 \u0938\u0902\u092d\u093e\u0935\u0928\u093e",
    visibility: "\u0926\u0943\u0936\u094d\u092f\u0924\u093e",
    disasterIntelligence: "\u0906\u092a\u0926\u093e \u092c\u0941\u0926\u094d\u0927\u093f\u092e\u0924\u094d\u0924\u093e",
    liveForecast: "\u0932\u093e\u0907\u0935 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928",
    weatherRisk: "\u092e\u094c\u0938\u092e \u091c\u094b\u0916\u093f\u092e",
    lowerRiskRoute: "\u0915\u092e \u091c\u094b\u0916\u093f\u092e \u092e\u093e\u0930\u094d\u0917",
    findShelter: "\u0936\u0930\u0923\u0938\u094d\u0925\u0932 \u0916\u094b\u091c\u0947\u0902",
    askPrithvi: "\u092a\u0943\u0925\u094d\u0935\u0940 AI \u0938\u0947 \u092a\u0942\u091b\u0947\u0902",
    welcomeBack: "\u0935\u093e\u092a\u0938 \u0906\u092a\u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948",
    accountTitle: "\u0928\u093e\u0917\u0930\u093f\u0915 \u0916\u093e\u0924\u093e",
    email: "\u0908\u092e\u0947\u0932",
    password: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921",
    name: "\u0928\u093e\u092e",
    confirmPassword: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0926\u094b\u092c\u093e\u0930\u093e",
    noAccount: "\u0916\u093e\u0924\u093e \u0928\u0939\u0940\u0902 \u0939\u0948?",
    haveAccount: "\u092a\u0939\u0932\u0947 \u0938\u0947 \u0916\u093e\u0924\u093e \u0939\u0948?",
    createAccount: "\u0916\u093e\u0924\u093e \u092c\u0928\u093e\u090f\u0902",
    signInButton: "\u0938\u093e\u0907\u0928 \u0907\u0928",
    demoAuth:
      "\u092a\u094d\u0930\u094b\u091f\u094b\u091f\u093e\u0907\u092a \u092a\u094d\u0930\u092e\u093e\u0923\u0940\u0915\u0930\u0923\u0964 \u092a\u094d\u0930\u094b\u0921\u0915\u094d\u0936\u0928 \u0916\u093e\u0924\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u092a\u094d\u0930\u092e\u093e\u0923\u0940\u0915\u0930\u0923 \u0938\u0947\u0935\u093e \u091a\u093e\u0939\u093f\u090f\u0964",
    invalidLogin: "\u0908\u092e\u0947\u0932 \u092f\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0917\u0932\u0924 \u0939\u0948\u0964",
    accountCreated: "\u0916\u093e\u0924\u093e \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u092c\u0928 \u0917\u092f\u093e\u0964",
    passwordsMismatch: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092e\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u093e\u0924\u0947\u0964",
    accountExists: "\u0907\u0938 \u0908\u092e\u0947\u0932 \u0938\u0947 \u0916\u093e\u0924\u093e \u092a\u0939\u0932\u0947 \u0938\u0947 \u092e\u094c\u091c\u0942\u0926 \u0939\u0948\u0964",
    fillFields: "\u0938\u092d\u0940 \u0906\u0935\u0936\u094d\u092f\u0915 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u092d\u0930\u0947\u0902\u0964",
    ministry: "\u092a\u0943\u0925\u094d\u0935\u0940 \u0935\u093f\u091c\u094d\u091e\u093e\u0928 \u092e\u0902\u0924\u094d\u0930\u093e\u0932\u092f",
  },
};

function fallbackDictionary(code) {
  return {
    ...translations.en,
    ...(translations[code] || {}),
  };
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("prithvirakshak-language") || "en";
  });

  useEffect(() => {
    const selected =
      languages.find((item) => item.code === language) ||
      languages[0];

    localStorage.setItem(
      "prithvirakshak-language",
      selected.code
    );

    document.documentElement.lang = selected.code;
    document.documentElement.dir = selected.dir;
  }, [language]);

  function setLanguage(code) {
    setLanguageState(code);
  }

  const value = useMemo(() => {
    const dictionary = fallbackDictionary(language);

    return {
      language,
      setLanguage,
      languages,
      t(key) {
        return dictionary[key] || translations.en[key] || key;
      },
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
