import { Link } from "react-router-dom";

import Tabs from "../components/Tabs";
import { infoViewLabLim } from "./objects/info";
import "./styles/barra.css";

export default function ViewLabLim() {

  return (
    <div className="container mx-auto py-4">
      <div className="d-flex justify-content-evenly">
        <Link className="btn mb-2" to={-1} style={{ color: "#004236" }}>
          <i className="fa-solid fa-arrow-left-long fa-xl"></i>
        </Link>
        <h3 className="text-center mb-4">
          LABORATORIO INGENIERIA E INTEGRIDAD DE MATERIALES
        </h3>
      </div>
      <Tabs data={infoViewLabLim}></Tabs>

      <div className="container-bar">
        <div className="icon-down">
          <Link to={'/aut/downloandExcel'} state={{lab: 'lim'}}>
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
