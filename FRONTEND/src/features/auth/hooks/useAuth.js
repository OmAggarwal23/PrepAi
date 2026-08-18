import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { register, login, logout, getMe } from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      console.error("Login failed:", err);
      // optionally: setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      console.error("Register failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      localStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  //   const handleGetMe = async () => {

  //     setLoading(true);
  //     const data = await getMe();
  //     setUser(data.user);
  //     setLoading(false);
  //   };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
