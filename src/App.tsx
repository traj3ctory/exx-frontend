import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/notFound";
import { ConfigProvider } from "antd";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import "./styles/main.scss";

// Define a custom private route component for authenticated routes
interface PrivateRouteProps {
  path: string;
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, children }) => {
  // Replace this with your authentication logic
  // const isAuthenticated = getValue(ClientToken) || false; // Example: Assume the user is authenticated
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7A5AF8",
        },
      }}
    >
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="*" element={<NotFound />} />

          <Route
            path="/"
            element={<Navigate to="/dashboard/sender" replace />}
          />
          {/* Authenticated route */}
          <Route
            path="/dashboard/sender"
            element={
              <PrivateRoute path="/dashboard/sender">
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
