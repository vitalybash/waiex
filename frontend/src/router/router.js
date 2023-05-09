import Skills from "../pages/Skills";
import Devop from "../pages/Devop/Devop";
import { Navigate } from "react-router-dom";
import OrderForm from "../components/OrderForm/OrderForm";
import Chat from "../components/Chat/Chat";

export const routes = [
  { path: '/skills', element: <Skills/> },
  { path: '/devops/:id', element: <Devop/> },
  { path: '/orders/add', element: <OrderForm/> },
  { path: '/chat', element: <Chat/>},
  { path: '*', element: <Navigate to="/skills" replace/> }
];