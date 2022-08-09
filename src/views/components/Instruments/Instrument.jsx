import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInstruments } from "../../../hooks/useInstrument";
import { getApiUrl } from "../../../services/config";
import TableEquipments from "../tables/TableEquipments";

export default function Intrument() {
  const location = useLocation();
  const [lab, setLab] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const { _id, instrument, area } = location.state;
  const [nameEquip, setNameEquip] = useState([]);

  useEffect(() => {
    fetch(getApiUrl("equipments"))
      .then((resp) => resp.json())
      .then((data) => setNameEquip(data));

    if (instrument === null) {
      if (area === "cam") {
        setAreaInput("CARACTERIZACION DE MATERIALES");
      } else if (area === "resistencia") {
        setAreaInput("RESISTENCIA DE MATERIALES");
      } else if (area === "cat") {
        setAreaInput("CORROSION A ALTA TEMPERATURA");
      } else if (area === "fir") {
        setAreaInput("FENOMENOS INTERFACIALES");
      } else {
        let valor = area;
        setAreaInput(valor.toUpperCase());
      }
    } else {
      let valor = instrument.area;
      setAreaInput(valor.toUpperCase());
    }

    const labLocation = location.pathname;

    if (labLocation.includes("lim")) {
      setLab("LABORATORIO INGENIERIA E INTEGRIDAD DE MATERIALES");
    } else if (labLocation.includes("fieh")) {
      setLab(
        "LABORATORIO FENOMENOS INTERFACIALES Y EVALUACIÓN DE HIDROCARBUROS"
      );
    }
  }, []);

  const { data, handleChange, handleSubmit, showPreview } = useInstruments(
    _id,
    instrument,
    area
  );

  return (
    <div className="container py-4">
      <form
        className="container"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="text-end mb-5">
          <button
            className="btn btn-sm me-2"
            style={{ background: "#004236", color: "white" }}
          >
            Guardar Instrumento
          </button>

          <Link
            className="btn btn-sm"
            style={{ background: "#004236", color: "white" }}
            to={-1}
          >
            Volver
          </Link>
        </div>
        <div className="py-2">
          <h3 className="text-center">Datos Instrumento</h3>
        </div>
        <div className="row g-3">
          <div className="col-sm-12 col-md-4">
            <div
              className="form-group mb-2 text-center"
              style={{ height: "320px" }}
            >
              <img
                className="img-thumbail img-fluid rounded"
                style={{ height: "320px", width: "320px" }}
                loading="lazy"
                src={data.photoSrc}
                alt=""
              />
            </div>
            <div className="form-group text-center">
              <input
                type="file"
                accept="image/*"
                className="form-control-file form-control-sm"
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
          </div>
          <div className="col-8">
            <div className="form-group input-group-sm mb-2">
              <label>Nombre Instrumento</label>
              <input
                type="text"
                className="form-control"
                name="caption"
                value={data.caption}
                onChange={handleChange}
              />
            </div>

            <div className="form-group input-group-sm mb-2">
              <label>Laboratorio</label>
              <select
                onChange={handleChange}
                className="form-select"
                name="laboratorie"
                value={data.laboratorie}
              >
                <option value=""></option>
                <option value={lab}>{lab}</option>
              </select>
            </div>
            <div className="row">
              <div className="form-group col-md-6 input-group-sm mb-2">
                <label>Area</label>
                <select
                  onChange={handleChange}
                  className="form-select"
                  name="area"
                  value={data.area}
                >
                  <option value=""></option>
                  <option value={areaInput}>{areaInput}</option>
                </select>
              </div>
              <div className="form-group col-md-6 input-group-sm mb-2">
                <label>Número de Serie</label>
                <input
                  type="text"
                  className="form-control"
                  name="number_serie"
                  value={data.number_serie}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6 input-group-sm mb-2">
                <label>Número Parte</label>
                <input
                  type="text"
                  className="form-control"
                  name="number_part"
                  value={data.number_part}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-6 input-group-sm mb-2">
                <label>Codigo Sap</label>
                <input
                  type="text"
                  className="form-control"
                  name="code_sap"
                  value={data.code_sap}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6 input-group-sm mb-2">
                <label>Existencia</label>
                <input
                  type="text"
                  className={
                    Number(data.existencia) <= 10
                      ? "stock_minIns form-control"
                      : " form-control"
                  }
                  name="existencia"
                  value={data.existencia}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-6 input-group-sm mb-2">
                <label>Stock minimo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="10"
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 input-group-sm mb-2">
                <label>Marca</label>
                <input
                  type="text"
                  className="form-control"
                  name="marca"
                  value={data.marca}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6 input-group-sm mb-2">
                <label>Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  name="modelo"
                  value={data.modelo}
                  onChange={handleChange}
                />
              </div>

 
            </div>
          </div>
        </div>
      </form>

    </div>
  );
}
