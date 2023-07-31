import { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext();
import { toast } from "react-toastify";
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login/", { username, password });

      if (response.status === 200) {
        toast("Login Successful");
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast("Invalid credentials");
      } else {
        toast("Server Error");
      }
    }
  };

  const logout = () => {
    axios
      .post("/auth/logout/")
      .then((response) => {
        toast("Logged Out");
      })
      .catch((error) => {
        console.log(error);
      });
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
