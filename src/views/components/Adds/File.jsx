import React, { useEffect, useState } from "react";
import useFile from "../../../hooks/useFile";
import { getApiUrl } from "../../../services/config";
import { Link } from "react-router-dom";
import "../../styles/file.css";

export default function File() {
  const equipOptions = ["Manual", "Licencia", "Certificado"];
  const instOptions = ["Manual", "Calibrador"];
  const [options, setOptions] = useState([]);

  const {
    handleChange,
    handleSubmit,
    form,
    setForm,
    api,
    caption,
    handleDeleteFile,
  } = useFile();


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
              Seleccione si desea subir de Instrumento o Equipo
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
              Seleccione a cual va subir
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
              Seleccione que documento va subir
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
          <div className="mt-5">
            <label htmlFor="formFile" className="form-label">
              Selecciona el archivo a subir
            </label>
            <input
              className="form-control"
              type="file"
              name="file"
              accept="application/pdf"
              onChange={(e) => {
                const { name, files } = e.target;
                setForm({ ...form, [name]: files[0] });
              }}
            />
          </div>
          <div className="container-btn">
            <button className="btn btn-guard">Guardar</button>
          </div>
        </form>
        <button
          className=" btn btn-danger position-btn"
          onClick={handleDeleteFile}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </>
  );
}
