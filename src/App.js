import "./App.css";
// import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RubroForm from "./components/RubroForm";
import SubRubroForm from "./components/SubRubroForm";
import ProductoForm from "./components/ProductoForm";
import Layout from "./components/Layout";

// function App() {
//   return (
//     <div className="app-container">
//       <Navbar />
//       <div className="content-container">
//         {/* <Sidebar />
//         <Main /> */}
//         <Layout />
//         {/* <Routes>
//         <Route path="/cargar-rubro" element={<RubroForm />} />
//         <Route path="/cargar-subrubro" element={<SubRubroForm />} />
//       </Routes> */}
//       </div>
//     </div>
//   );
// }

// export default App;

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
