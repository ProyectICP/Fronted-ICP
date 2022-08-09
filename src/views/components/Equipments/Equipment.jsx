import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { formatDate } from "../../../components/utilities";
import { useEquipment } from "../../../hooks/useEquipment";

import TableComponents from "../Tables/TableComponents";
import TableReagents from "../Tables/TableReagents";
import TableConsumables from "../Tables/TableConsumables";
import { useEffect } from "react";

export default function Equipment() {
  const location = useLocation();
  const [lab, setLab] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const { _id, equipment, area } = location.state;

  useEffect(() => {
    if (equipment === null) {
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
      let valor = equipment.area;
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

  const { error, data, handleChange, handleSubmit, showPreview } = useEquipment(
    _id,
    equipment,
    area
  );

  if (error) {
    return <h4>{error.message}</h4>;
  } else {
    return (
      <div className="py-4">
        <form
          className="container"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="btn-toolbar mb-2 justify-content-end">
            <button
              type="submit"
              className="btn btn-sm me-2"
              style={{ background: "#004236", color: "white" }}
            >
              Guardar Equipo
            </button>
            <Link
              className={_id === "0" ? "d-none" : "btn btn-sm me-2"}
              to={"/aut/components"}
              state={{ id: `${data._id}`, component: null }}
              style={{ background: "#004236", color: "white" }}
            >
              Agregar Componenente
            </Link>
            <Link
              className={_id === "0" ? "d-none" : "btn btn-sm me-2"}
              to={"/aut/consumables"}
              state={{ id: `${data._id}`, consumable: null }}
              style={{ background: "#004236", color: "white" }}
            >
              Agregar Consumible
            </Link>
            <Link
              className={_id === "0" ? "d-none" : "btn btn-sm me-2"}
              to={"/aut/reagents"}
              state={{ id: `${data._id}`, reagent: null }}
              style={{ background: "#004236", color: "white" }}
            >
              Agregar Reactivo
            </Link>
            <Link
              className="btn btn-sm"
              to={-1}
              style={{ background: "#004236", color: "white" }}
            >
              Volver
            </Link>
          </div>
          <h3 className="text-center py-4">Datos Generales</h3>
          <div className="row g-3">
            <div className="col-md-4">
              <div
                className="form-group mb-2 text-center"
                style={{ height: "325px", border: "1px solid grey" }}
              >
                <img
                  className="img-thumbail rounded img-fluid"
                  style={{ height: "320px", width: "320px" }}
                  src={data.photoSrc}
                  loading="lazy"
                  alt="photo"
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
            <div className="col-md-8">
              <div className="form-group input-group-sm mb-2">
                <label>Laboratorio</label>
                <select
                  onChange={handleChange}
                  className="form-select"
                  name="laboratorio"
                  value={data.laboratorio}
                >
                  <option value=""></option>
                  <option value={lab}>{lab}</option>
                </select>
              </div>
              <div className="form-group input-group-sm">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="caption"
                  value={data.caption}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group input-group-sm mb-2">
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
              <div className="form-group input-group-sm mb-2">
                <label>Fabricante</label>
                <input
                  type="text"
                  className="form-control"
                  name="fabricante"
                  value={data.fabricante}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group input-group-sm">
                <label>Proveedor</label>
                <input
                  type="text"
                  className="form-control"
                  name="proveedor"
                  value={data.proveedor}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group col-md-4 input-group-sm mb-2">
              <label>Número Serie</label>
              <input
                type="text"
                className="form-control"
                name="code_serie"
                value={data.code_serie}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4 input-group-sm mb-2">
              <label>Modelo</label>
              <input
                type="text"
                className="form-control"
                name="model"
                value={data.model}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4 input-group-sm mb-2">
              <label>Software</label>
              <input
                type="text"
                className="form-control"
                name="software"
                value={data.software}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4 input-group-sm mb-2">
              <label>Consecutivo</label>
              <input
                type="text"
                className="form-control"
                name="consecutivo"
                value={data.consecutivo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4 input-group-sm mb-2">
              <label>Code Sap</label>
              <input
                type="text"
                className="form-control"
                name="code_sap"
                value={data.code_sap}
                onChange={handleChange}
              />
            </div>

            {/* <div className="form-group col-md-4 input-group-sm mb-2">
              <label>Fecha Ingreso</label>
              <input
                type="text"
                className="form-control"
                name="date_make"
                value={formatDate(data.date_make)}
                onChange={handleChange}
              />
            </div> */}
            <div className="form-group col-md-8 input-group-sm mb-2">
              <label>Ubicación</label>
              <input
                type="text"
                className="form-control"
                name="ubicacion"
                value={data.ubicacion}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4 input-group-sm mb-2">
              <label>CECO</label>
              <input
                type="text"
                className="form-control"
                name="ceco"
                value={data.ceco}
                onChange={handleChange}
              />
            </div>
          </div>
          <h3 className="text-center py-2">Aspectos Tecnicos</h3>
          <div className="row g-3 align-items-center">
            <div className="form-group col-md-4 input-group-sm mb-2">
              <label>Condicciones Ambientales</label>
              <input
                type="text"
                className="form-control"
                name="ambientales"
                value={data.ambientales}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4 input-group-sm mb-2">
              <label>Condicciones Electricas</label>
              <input
                type="text"
                className="form-control"
                name="electricas"
                value={data.electricas}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-2 input-group-sm mb-2">
              <label>Dimensiones</label>
              <input
                type="text"
                className="form-control"
                name="dimensiones"
                value={data.dimensiones}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-2 input-group-sm mb-2">
              <label>Peso</label>
              <input
                type="text"
                className="form-control"
                name="peso"
                value={data.peso}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <div className={_id === "0" || _id === "undefined" ? "d-none" : "py-4"}>
          <TableComponents id={data._id}></TableComponents>
        </div>
        <div className={_id === "0" || _id === "undefined" ? "d-none" : "py-4"}>
          <TableConsumables id={data._id}></TableConsumables>
        </div>
        <div className={_id === "0" || _id === "undefined" ? "d-none" : "py-4"}>
          <TableReagents id={data._id}></TableReagents>
        </div>
      </div>
    );
  }
}
