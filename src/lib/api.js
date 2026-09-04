export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:8000" : "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.message ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}

export const api = {
  health: () => request("/api/health"),

  risk: (location) =>
    request(`/api/risk/${encodeURIComponent(location)}`),

  alerts: () => request("/api/alerts"),

  nowcast: () => request("/api/nowcast"),

  shelters: () => request("/api/shelters"),

  resources: () => request("/api/resources"),

  incidents: () => request("/api/incidents"),

  createIncident: (payload) =>
    request("/api/incidents", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  assistant: (message, location = "Jaipur") =>
    request("/api/assistant", {
      method: "POST",
      body: JSON.stringify({
        message,
        location,
      }),
    }),

  approveAlert: (alertId) =>
    request(
      `/api/authority/alerts/${encodeURIComponent(alertId)}/approve`,
      { method: "POST" }
    ),

  modifyAlert: (alertId, note) =>
    request(
      `/api/authority/alerts/${encodeURIComponent(alertId)}/modify`,
      {
        method: "POST",
        body: JSON.stringify({ note }),
      }
    ),

  rejectAlert: (alertId) =>
    request(
      `/api/authority/alerts/${encodeURIComponent(alertId)}/reject`,
      { method: "POST" }
    ),

  assignIncident: (incidentId, team = "Response Team Alpha") =>
    request(
      `/api/authority/incidents/${encodeURIComponent(incidentId)}/assign`,
      {
        method: "POST",
        body: JSON.stringify({ team }),
      }
    ),
};

