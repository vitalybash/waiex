import Services from "../pages/Services";
import Devop from "../pages/Devop/Devop";
import { Navigate } from "react-router-dom";

export const routes = [
  {path: '/Services', element: <Services />},
  {path: '/devops/:id', element: <Devop />},
  {path: '*', element: <Navigate to="/services" replace /> }
];