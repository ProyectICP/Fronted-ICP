import React from "react";
import { Link,useLocation } from 'react-router-dom';
import { useEquipmentExcel } from "../hooks/useEquipmentExcel";
import { useInventarioMinExcel } from "../hooks/useInventarioMinExcel";
import "../views/styles/dowloadExcel.css";

const DownloadExcel = () => {
  const location = useLocation();
  const { lab } = location.state;
  
  const { handleOnClickInv  } = useEquipmentExcel(lab);
  const { handleOnClickInvMin } = useInventarioMinExcel(lab);

  return (
    <div className="excel_container">
      <Link className="btn mb-2" to={-1} style={{ color: "#004236" }}>
          <i className="fa-solid fa-arrow-left-long fa-xl"></i>
        </Link>
      <section className="excel_down">
        <article className="excel_down_tot">
          <span>Inventario total</span>
          <button onClick={handleOnClickInv}>
            <i className="fa-solid fa-download"></i> Descargar
          </button>
        </article>
        <article className="excel_down_min">
          <span>Inventario Minimo</span>
          <button onClick={handleOnClickInvMin}>
            <i className="fa-solid fa-download"></i> Descargar
          </button>
        </article>
      </section>
    </div>
  );
};

export default DownloadExcel;
