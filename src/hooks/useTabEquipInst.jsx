import { useState } from "react";
import axios from "axios";
import { getApiUrl } from "../services/config";

export default function useTabEquipInst() {
  const [delet, setDelet] = useState(false);

  const deleteOption = (opcion, id) => {
    const formData = new FormData();
    formData.append("id", id);

    const opcionMens = opcion.slice(0,-1)

    axios
      .post(getApiUrl(`${opcion}/delete`),formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `${opcionMens} eliminado`,
          showConfirmButton: false,
          timer: 1500,
        });
        setDelet(true);
      })
      .catch((err) => console.log(err.message));

  };

  const handleClickEquip = (id) => {
    Swal.fire({
      title: "Desea eliminar el equipo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOption('equipments',id)
      }
    });
  };

  const handleClickInst = (id) => {
    Swal.fire({
      title: "Desea eliminar el instrumento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOption('instruments',id)    
      }
    });
  };

  return {
    delet,
    handleClickEquip,
    handleClickInst,
  };
}
