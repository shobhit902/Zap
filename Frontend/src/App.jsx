import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router";
import HomePage from "./pages/HomePage";
import RootLayout from "./layout/RootLayout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

// Fake auth check function
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // or use context/state
};

// Protected route wrapper
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>

        {/* Public routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signUp" element={<SignUpPage />} />

        {/* Protected/Auth routes */}
        <Route path="settings" element={<PrivateRoute element={<SettingsPage />} />} />
        <Route path="profile" element={<PrivateRoute element={<ProfilePage />} />} />

      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
