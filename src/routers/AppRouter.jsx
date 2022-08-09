import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRouter } from "./PrivateRouter";
import { DashboardRouter } from "./DashboardRouter";
import { AuthContextProvider } from "../context/AuthContext";

import ViewHome from "../views/ViewHome";
import ViewLup from "../views/ViewLup";
import ViewSession from "../views/ViewSession";
import ViewError from "../views/ViewError";
import Navigation from "../Navigation";
import Footer from "../Footer";

export const AppRouter = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="lup" element={<ViewLup />} />
          <Route path="session" element={<ViewSession />} />

          <Route
            path="aut/*"
            element={
              <PrivateRouter>
                <DashboardRouter />
              </PrivateRouter>
            }
          />

          <Route path="*" element={<ViewError />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  );
};
