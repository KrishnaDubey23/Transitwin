const SETTINGS_KEY = "transitwin_settings";

export interface UserSettings {
  preferredTransport: "Car" | "Metro" | "Bus" | "Walking";
  trafficAlerts: boolean;
  routeUpdates: boolean;
}

const defaults: UserSettings = {
  preferredTransport: "Metro",
  trafficAlerts: true,
  routeUpdates: true,
};

export function getSettings(): UserSettings {
  if (typeof window === "undefined") return defaults;
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaults, ...JSON.parse(data) } : defaults;
  } catch {
    return defaults;
  }
}

export function updateSettings(updates: Partial<UserSettings>): void {
  const current = getSettings();
  const next = { ...current, ...updates };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
}
