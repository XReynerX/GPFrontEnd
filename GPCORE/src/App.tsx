import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Grid, GridItem, Stack } from "@chakra-ui/react";
import Login from "./components/login";
import Activos from "./components/activos";
import ManageOutgoingAssets from "./components/salidaActivos";
import AuthorizeAssets from "./components/autorizacionActivos";
import MainPage from "./components/principal";
import { AuthProvider, useAuth } from "./components/authContext";
import { useState } from "react";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav nav" "aside main"`,
          }}
        >
          <Stack hideBelow="lg">
            <GridItem area="aside">Aside</GridItem>
          </Stack>
          <GridItem area="main">
            <AppRoutes />
          </GridItem>
        </Grid>
      </Router>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setRefresh(!refresh);
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="/" element={<Login />} />
      ) : (
        <>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/manage-assets"
            element={<Activos onSave={handleSave} />}
          />
          <Route
            path="/manage-outgoing-assets"
            element={<ManageOutgoingAssets />}
          />
          <Route path="/authorize-assets" element={<AuthorizeAssets />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
