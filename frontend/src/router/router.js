import Developers from "../pages/Developers";
import Devop from "../pages/Devop";
import { Navigate } from "react-router-dom";

export const routes = [
  {path: '/devops', element: <Developers />},
  {path: '/devops/:id', element: <Devop />},
  {path: '*', element: <Navigate to="/devops" replace /> }
];