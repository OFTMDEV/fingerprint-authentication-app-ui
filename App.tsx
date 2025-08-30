import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./authContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
