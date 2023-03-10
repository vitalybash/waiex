import Header from "./components/UI/Header/Header";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
