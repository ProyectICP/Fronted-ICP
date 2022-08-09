import { Link } from "react-router-dom";

import Tabs from "../components/Tabs";
import { infoViewLabFieh } from "./objects/info";
import "./styles/barra.css";

export default function ViewLabFieh() {
  
  return (
    <div className="container mx-auto py-4">
      <div className="d-flex justify-content-between">
        <Link className="btn mb-2" to={-1} style={{ color: "#004236" }}>
          <i className="fa-solid fa-arrow-left-long fa-xl"></i>
        </Link>
        <h3 className="text-center mb-4">
          LABORATORIO FENOMENOS INTERFACIALES Y EVALUACIÓN DE HIDROCARBUROS
        </h3>
      </div>
      <Tabs data={infoViewLabFieh}></Tabs>
      <div className="container-bar">
        <div className="icon-down">
          <Link to={"/aut/downloandExcel"} state={{ lab: "fieh" }}>
            <button className="excel_inv opt">
              <i className="fa-solid fa-download"></i>
              <span id="title">Inventario</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
