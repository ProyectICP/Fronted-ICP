import { useDataExcel } from "../hooks/useDataExcel";
import { useData } from "../hooks/useData";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getApiUrl } from "../services/config";
import { useEffect } from "react";
import { useState } from "react";

export const useEquipmentExcel = (lab) => {
  const [labora, setLabora] = useState("");
  useEffect(() => {
    if (lab === "lim") {
      setLabora("LABORATORIO INGENIERIA E INTEGRIDAD DE MATERIALES");
    } else if (lab === "fieh") {
      setLabora(
        "LABORATORIO FENOMENOS INTERFACIALES Y EVALUACIÓN DE HIDROCARBUROS"
      );
    }
  }, []);


  const labForm = new FormData();
  labForm.append('lab',lab)

  const datosInv = useData(getApiUrl(`inventarioEquip`));

  let datosMap = datosInv
    .filter((i) => i.laboratorio === labora)
    .map((item) => {
      Object.keys(item).forEach((key) => {
        if (item[key] === null || key === "_state" || item === "components")
          delete item[key];
      });
      return item;
    });

  const datosComp = useDataExcel(getApiUrl(`comp`), labForm);
  let datosMapComp = datosComp.map((item) => {
    Object.keys(item).forEach((key) => {
      if (
        item[key] === null ||
        key === "_state" ||
        key === "photo" ||
        key === "photoSrc"
      )
        delete item[key];
    });
    return item;
  });

  const datosCons = useDataExcel(getApiUrl(`cons`), labForm);
  let datosMapCons = datosCons.map((item) => {
    Object.keys(item).forEach((key) => {
      if (
        item[key] === null ||
        key === "_state" ||
        key === "photo" ||
        key === "photoSrc"
      )
        delete item[key];
    });
    return item;
  });

  const datosReg = useDataExcel(getApiUrl(`reag`), labForm);
  let datosMapReg = datosReg.map((item) => {
    Object.keys(item).forEach((key) => {
      if (
        item[key] === null ||
        key === "_state" ||
        key === "photo" ||
        key === "photoSrc"
      )
        delete item[key];
    });
    return item;
  });

  const datosIns = useData(getApiUrl(`inventarioIns`));
  let datosMapIns = datosIns
    .filter((i) => i.laboratorio === labora)
    .map((item) => {
      Object.keys(item).forEach((key) => {
        if (
          item[key] === null ||
          key === "_state" ||
          key === "photo" ||
          key === "photoSrc" ||
          key === "caption_equipment" ||
          key === "date_make"
        )
          delete item[key];
      });
      return item;
    });

  const handleOnClickInv = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const wsInv = XLSX.utils.json_to_sheet(datosMap);
    const wsCom = XLSX.utils.json_to_sheet(datosMapComp);
    const wsCons = XLSX.utils.json_to_sheet(datosMapCons);
    const wsIns = XLSX.utils.json_to_sheet(datosMapIns);
    const wsReg = XLSX.utils.json_to_sheet(datosMapReg);
    const wb = {
      Sheets: {
        Equipments: wsInv,
        Components: wsCom,
        Consumables: wsCons,
        Instruments: wsIns,
        Reagents: wsReg,
      },
      SheetNames: [
        "Equipments",
        "Components",
        "Consumables",
        "Instruments",
        "Reagents",
      ],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Inventario Total` + fileExtension);
  };

  return {
    handleOnClickInv,
  };
};
