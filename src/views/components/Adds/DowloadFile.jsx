import React, { useEffect, useState } from "react";
import useDowload from "../../../hooks/useDowload";
import { Link } from "react-router-dom";
import { getApiUrl } from "../../../services/config";

export default function DowloadFile() {
  const equipOptions = ["Manual", "Licencia", "Certificado"];
  const instOptions = ["Manual", "Calibrador"];
  const [options, setOptions] = useState([]);

  const { handleChange, handleSubmit, form, api, caption } = useDowload();

  useEffect(() => {
    switch (form.inputEquipInst) {
      case "Equipos":
        setOptions(equipOptions);
        api(getApiUrl("equipments"));
        break;

      case "Instrumentos":
        setOptions(instOptions);
        api(getApiUrl("instruments"));
        break;

      default:
        setOptions([]);
    }
  }, [form.inputEquipInst]);

  return (
    <>
      <Link className="btn mb-2" to={-1} style={{ color: "#004236" }}>
        <i className="fa-solid fa-arrow-left-long fa-xl"></i>
      </Link>
      <div className="mt-5 container">
        <form noValidate onSubmit={handleSubmit}>
          <div className="mt-5">
            <label htmlFor="formEqui" className="form-label">
              Seleccione si desea descargar de Instrumento o Equipo
            </label>
            <select
              onChange={handleChange}
              className="form-select"
              name="inputEquipInst"
            >
              <option value="Equipos">Equipo</option>
              <option value="Instrumentos">Instrumento</option>
            </select>
          </div>
          <div className="mt-5">
            <label htmlFor="formEqui" className="form-label">
              Seleccione a cual va descargar
            </label>
            <select
              onChange={handleChange}
              className="form-select"
              name="inputOption"
            >
              <option value="">Seleccione</option>
              {caption.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <label htmlFor="formEqui" className="form-label">
              Seleccione que documento va descargar
            </label>
            <select
              onChange={handleChange}
              className="form-select"
              name="inputDoc"
            >
              <option value="">Seleccione</option>
              {options.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="button-container mt-5 mb-5">
            <button>Descargar</button>
          </div>
        </form>
      </div>
    </>
  );
}
