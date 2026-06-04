import { createContext, useContext, useMemo, useState } from "react";
import { apiFetch, setToken as storeToken, clearToken, getToken } from "../api/client";

function decodePayload(token) {
  if (!token) return null;
  try {
    const base64 = token.split(".")[1];
    const normalized = base64.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(normalized);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());
  const payload = useMemo(() => decodePayload(token), [token]);
  
  // 🌟 EXTRACTION FIXES:
  // Dynamically grab role and uid from the decrypted token payload
  const role = payload?.role || null;
  const uid = payload?.uid || null; // Match whatever variable name your Python JWT uses (e.g., 'uid' or 'user_id')

  async function login(email, password) {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      auth: false,
      body: { email, password },
    });
    
    storeToken(data.token);
    setTokenState(data.token);
    return data;
  }

  function logout() {
    clearToken();
    setTokenState(null);
  }

  // 🌟 ADDED 'uid' here so it is shared across your whole application
  const value = { token, role, uid, login, logout, isAuthed: !!token };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}