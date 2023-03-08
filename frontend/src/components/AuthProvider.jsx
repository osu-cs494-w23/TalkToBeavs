// Auth context provider

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/auth/user?${Date.now()}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/login", { email, password });
      setUser(res.data);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post("/api/signup", { email, password });
      setUser(res.data);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
