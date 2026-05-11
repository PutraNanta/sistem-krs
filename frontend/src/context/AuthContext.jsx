import { createContext, useEffect, useMemo, useState } from "react";
import { getProfile, login as loginRequest } from "../services/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      const profile = response?.data;
      setUser(profile);
      return profile;
    } catch {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      if (!token) {
        if (mounted) {
          setLoading(false);
        }
        return;
      }

      await loadProfile();

      if (mounted) {
        setLoading(false);
      }
    };

    bootstrap();

    return () => {
      mounted = false;
    };
  }, [token]);

  const login = async (email, password) => {
    const response = await loginRequest({ email, password });
    const nextToken = response?.data?.token;
    const nextUser = response?.data?.user;

    localStorage.setItem("token", nextToken);
    setToken(nextToken);
    setUser(nextUser || null);

    if (!nextUser) {
      await loadProfile();
    }

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
      refreshProfile: loadProfile,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
