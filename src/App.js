import "./App.css";
// import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RubroForm from "./components/RubroForm";
import SubRubroForm from "./components/SubRubroForm";
import ProductoForm from "./components/ProductoForm";
import { Detail } from './components/Detail';
import Layout from "./components/Layout";
import Carrito from "./components/Carrito";
import Pago from "./components/Pago";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/style.css";



function App() {
  return (
    <Router>
      <Routes>
        {/* Envolvemos todas las rutas dentro del Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} /> {/* Ruta principal */}
          <Route path="cargar-rubro" element={<RubroForm />} />
          <Route path="cargar-subrubro" element={<SubRubroForm />} />
          <Route path="cargar-producto" element={<ProductoForm />} />
          <Route path={"/details/:codigo"} element={<Detail/>} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago" element={<Pago />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
