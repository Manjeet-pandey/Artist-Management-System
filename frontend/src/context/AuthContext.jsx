import { createContext, useEffect, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  useEffect(() => {
    console.log("useEffect - isLoggedIn:", isLoggedIn);
    // Whenever isLoggedIn changes, update the local storage value
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = () => {
    // You can implement your login logic here, e.g., calling an authentication API
    console.log("Loggen IN");
    setIsLoggedIn(true);
  };

  const logout = () => {
    // You can implement your logout logic here
    console.log("Loggen OUT");
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
