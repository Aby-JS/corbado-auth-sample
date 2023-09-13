import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Auth";
import Protected from "./components/Protected";
import { useSession } from "./contexts/SessionContext";

function App() {
  const { isLoggedIn } = useSession();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Protected isSignedIn={isLoggedIn}>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="*"
        element={
          <Protected isSignedIn={isLoggedIn}>
            <Dashboard />
          </Protected>
        }
      />
    </Routes>
  );
}

export default App;
