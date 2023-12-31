import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import { LoginPage } from "./pages/LoginPage";
import UsersPage from "./components/UsersPage";
import ArtistsPage from "./components/ArtistsPage";
import ArtistDetails from "./components/ArtistDetails";
import { useAuth } from "./context/AuthContext";
import { RegistrationPage } from "./pages/RegisterPage";
import { NotFound } from "./pages/NotFound";

const App = () => {
  const { isLoggedIn } = useAuth(); // Use the login hook

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />}
        ></Route>
        <Route
          path="/dashboard/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route index element={<ArtistsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="artists" element={<ArtistsPage />} />
          <Route path="artists/:artistId" element={<ArtistDetails />} />
        </Route>
        <Route
          path="/register/"
          element={
            !isLoggedIn ? <RegistrationPage /> : <Navigate to="/dashboard" />
          }
        ></Route>
        <Route
          path="/login/"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />}
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
