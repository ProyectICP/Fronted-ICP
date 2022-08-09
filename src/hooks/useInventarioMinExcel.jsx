import { useData } from "../hooks/useData";
import { useDataExcel } from "../hooks/useDataExcel";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getApiUrl } from "../services/config";
import { useEffect } from "react";
import { useState } from "react";

export const useInventarioMinExcel = (lab) => {
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

  //Componentes minimo
  const datosComp = useDataExcel(getApiUrl(`comp`), labForm);
  let datosMapComp = datosComp
    .filter((item) => item.existence <= 10)
    .map((item) => {
      Object.keys(item).forEach((key) => {
        if (
          item[key] === null ||
          key === "_state" ||
          key === "photo" ||
          key === "photoSrc"
        ) {
          delete item[key];
        }
      });
      return item;
    });

  //Consumables
  const datosCons = useDataExcel(getApiUrl(`cons`), labForm);
  let datosMapCons = datosCons
    .filter((item) => item.existence <= 10)
    .map((item) => {
      Object.keys(item).forEach((key) => {
        if (
          item[key] === null ||
          key === "_state" ||
          key === "photo" ||
          key === "photoSrc"
        ) {
          delete item[key];
        }
      });
      return item;
    });

  //Reagents
  const datosReag = useDataExcel(getApiUrl(`reag`), labForm);
  let datosMapReag = datosReag
    .filter((item) => item.existence <= 10)
    .map((item) => {
      Object.keys(item).forEach((key) => {
        if (
          item[key] === null ||
          key === "_state" ||
          key === "photo" ||
          key === "photoSrc"
        ) {
          delete item[key];
        }
      });
      return item;
    });

  //Instruments
  const datosIns = useData(getApiUrl(`instruments`));
  let datosMapIns = datosIns
    .filter((item) => (item.existencia <= 10) & (item.laboratorie === labora))
    .map((item) => {
      Object.keys(item).forEach((key) => {
        if (
          item[key] === null ||
          key === "_state" ||
          key === "photo" ||
          key === "photoSrc" ||
          key === "caption_equipment" ||
          key === "date_make"
        ) {
          delete item[key];
        }
      });
      return item;
    });

  const handleOnClickInvMin = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(datosMapComp);
    const wsCons = XLSX.utils.json_to_sheet(datosMapCons);
    const wsReag = XLSX.utils.json_to_sheet(datosMapReag);
    const wsIns = XLSX.utils.json_to_sheet(datosMapIns);
    const wb = {
      Sheets: {
        Components: ws,
        Consumables: wsCons,
        Reagents: wsReag,
        Instruments: wsIns,
      },
      SheetNames: ["Components", "Consumables", "Reagents", "Instruments"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Inventario Mínimo` + fileExtension);
  };

  return {
    handleOnClickInvMin,
  };
};
