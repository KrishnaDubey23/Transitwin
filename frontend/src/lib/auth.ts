import { apiSignUp, apiLogin } from "@/lib/api";

export interface User {
  username: string;
  email: string;
}

const STORAGE_KEY = "transitwin_user";
const TOKEN_KEY = "transitwin_token";
const USERS_KEY = "transitwin_users";

export interface StoredUser {
  username: string;
  email: string;
  password: string;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/** Try backend first; fall back to local storage if backend unavailable */
export async function signUp(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { user, error } = await apiSignUp({
      email,
      password,
      full_name: username,
    });
    if (error) return { success: false, error };

    // Backend doesn't return token on signup - user must login
    const loginResult = await apiLogin(email, password);
    if (loginResult.error)
      return { success: false, error: "Account created. Please login." };

    if (loginResult.access_token) {
      localStorage.setItem(TOKEN_KEY, loginResult.access_token);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          username: user?.full_name ?? username,
          email: user?.email ?? email,
        })
      );
    }
    return { success: true };
  } catch {
    // Fallback to local storage if backend unreachable
    const users = getStoredUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "Email already registered" };
    }
    if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: "Username already taken" };
    }
    users.push({ username, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, email }));
    return { success: true };
  }
}

/** Try backend first; fall back to local storage */
export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await apiLogin(email, password);
    if (result.error) {
      // Try local fallback
      const users = getStoredUsers();
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (user && user.password === password) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ username: user.username, email: user.email })
        );
        return { success: true };
      }
      return { success: false, error: result.error };
    }

    if (result.access_token) {
      localStorage.setItem(TOKEN_KEY, result.access_token);
      // Fetch user or use email - backend login doesn't return user; we store email
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ username: email.split("@")[0], email })
      );
    }
    return { success: true };
  } catch {
    const users = getStoredUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return { success: false, error: "Invalid email or password" };
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ username: user.username, email: user.email })
    );
    return { success: true };
  }
}

export function signOut(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function updateUser(updates: Partial<User>): void {
  const user = getCurrentUser();
  if (!user) return;
  const updated = { ...user, ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.email === user.email);
  if (idx >= 0) {
    users[idx] = { ...users[idx], ...updates };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

export function updatePassword(
  currentPassword: string,
  newPassword: string
): { success: boolean; error?: string } {
  const user = getCurrentUser();
  if (!user) return { success: false, error: "Not logged in" };
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.email === user.email);
  if (idx < 0 || users[idx].password !== currentPassword) {
    return { success: false, error: "Current password is incorrect" };
  }
  users[idx].password = newPassword;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
}
