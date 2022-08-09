import { useState } from "react";
import axios from "axios";
import { getApiUrl } from "../services/config";

export default function useDeleteOpt() {
  const [delet, setDelet] = useState(true);

  const deleteOption = (tipo, name, id) => {
    const formData = new FormData();
    formData.append("id", id);    
    axios
      .post(getApiUrl(`${name}/delete`), formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `${tipo} eliminado`,
          showConfirmButton: false,
          timer: 1500,
        });
        setDelet(false);
      })
      .catch((err) => console.log(err.message));
  };

  const alerta = (tipo, name, id) => {
    Swal.fire({
      title: `Desea eliminar el ${tipo}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOption(tipo, name, id);
      }
    });
  };

  const handleClick = (tipo, name, id) => {
    setDelet(true)
    alerta(tipo, name, id);
  };

  return {
    delet,
    handleClick,
  };
}
