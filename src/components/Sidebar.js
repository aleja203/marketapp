import React from "react";
import RubroForm from "./RubroForm";
import SubRubroForm from "./SubRubroForm";
import ProductoForm from "./ProductoForm";

const Sidebar = () => {
  return (
    <div className="flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
      <a
        href="/"
        className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
      >
        {/* <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"/></svg> */}
        <span className="fs-5 fw-semibold">Collapsible</span>
      </a>
      <ul className="list-unstyled">
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="true"
          >
            Producto
          </button>
          <div className="collapse show" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="/cargar-producto" className="link-dark rounded">
                  Cargar producto
                </a>
              </li>
              <li>
                <a href="/cargar-rubro" className="link-dark rounded">
                  Cargar rubro
                </a>
              </li>
              <li>
                <a href="/cargar-subrubro" className="link-dark rounded">
                  Cargar Subrubro
                </a>
              </li>
            </ul>
          </div>
        </li>

        {/* Sección para Rubros */}
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#rubros-collapse"
            aria-expanded="false"
          >
            Rubros
          </button>
          <div className="collapse" id="rubros-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <RubroForm />
              </li>
            </ul>
          </div>
        </li>

        {/* Sección para SubRubros */}
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#subrubros-collapse"
            aria-expanded="false"
          >
            SubRubros
          </button>
          <div className="collapse" id="subrubros-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <SubRubroForm />
              </li>
            </ul>
          </div>
        </li>

        {/* Espacio reservado para el componente Producto */}
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#productos-collapse"
            aria-expanded="false"
          >
            Productos
          </button>
          <div className="collapse" id="productos-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                {/* Placeholder para el futuro componente */}
                <p className="text-muted">Componente Producto aquí</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
