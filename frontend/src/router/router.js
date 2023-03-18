import Services from "../pages/Services";
import Devop from "../pages/Devop/Devop";
import { Navigate } from "react-router-dom";
import OrderForm from "../components/OrderForm/OrderForm";

export const routes = [
  { path: '/Services', element: <Services/> },
  { path: '/devops/:id', element: <Devop/> },
  { path: '/orders/add', element: <OrderForm/> },
  { path: '*', element: <Navigate to="/services" replace/> }
];