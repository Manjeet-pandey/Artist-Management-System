import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const { login } = useAuth();
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={login}>Login</button>
    </div>
  );
};
