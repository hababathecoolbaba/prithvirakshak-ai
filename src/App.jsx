import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Emergency from "./pages/Emergency";
import Responder from "./pages/Responder";

import LiveMap from "./pages/LiveMap";
import Nowcast from "./pages/Nowcast";
import Alerts from "./pages/Alerts";
import SafeRoute from "./pages/SafeRoute";
import Shelters from "./pages/Shelters";

import Report from "./pages/Report";
import Preparedness from "./pages/Preparedness";
import Services from "./pages/Services";
import Assistant from "./pages/Assistant";

import AuthorityDashboard from "./pages/AuthorityDashboard";
import AuthorityAlerts from "./pages/AuthorityAlerts";
import AuthorityIncidents from "./pages/AuthorityIncidents";
import AuthorityResources from "./pages/AuthorityResources";
import DisasterPulse from "./pages/DisasterPulse";
import SystemHealth from "./pages/SystemHealth";
import AuditLogs from "./pages/AuditLogs";
import AuthorityPlaceholder from "./pages/AuthorityPlaceholder";

import LocationPage from "./pages/LocationPage";
import LiteMode from "./pages/LiteMode";
import About from "./pages/About";
import Sources from "./pages/Sources";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/emergency" element={<Emergency />} />

      <Route path="/map" element={<LiveMap />} />
      <Route path="/nowcast" element={<Nowcast />} />
      <Route path="/alerts" element={<Alerts />} />

      <Route
        path="/location/:location"
        element={<LocationPage />}
      />

      <Route path="/safe-route" element={<SafeRoute />} />
      <Route path="/shelters" element={<Shelters />} />
      <Route path="/services" element={<Services />} />

      <Route path="/report" element={<Report />} />
      <Route path="/preparedness" element={<Preparedness />} />
      <Route path="/assistant" element={<Assistant />} />

      <Route path="/lite" element={<LiteMode />} />
      <Route path="/about" element={<About />} />
      <Route path="/sources" element={<Sources />} />

      <Route
        path="/authority"
        element={
          <Navigate
            to="/authority/dashboard"
            replace
          />
        }
      />

      <Route
        path="/authority/dashboard"
        element={<AuthorityDashboard />}
      />

      <Route
        path="/authority/alerts"
        element={<AuthorityAlerts />}
      />

      <Route
        path="/authority/incidents"
        element={<AuthorityIncidents />}
      />

      <Route
        path="/authority/resources"
        element={<AuthorityResources />}
      />

      <Route
        path="/authority/pulse"
        element={<DisasterPulse />}
      />

      <Route
        path="/authority/system-health"
        element={<SystemHealth />}
      />

      <Route
        path="/authority/audit"
        element={<AuditLogs />}
      />

      <Route
        path="/authority/responders"
        element={
          <AuthorityPlaceholder title="Responder Tracking" />
        }
      />

      <Route
        path="/authority/infrastructure"
        element={
          <AuthorityPlaceholder title="Critical Infrastructure" />
        }
      />

      <Route
        path="/authority/analytics"
        element={
          <AuthorityPlaceholder title="Disaster Analytics" />
        }
      />

      <Route
        path="/responder"
        element={<Responder />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

