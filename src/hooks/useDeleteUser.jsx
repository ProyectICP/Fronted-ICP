import { useState } from "react";
import axios from "axios";
import { getApiUrl } from "../services/config";
import { useEffect } from "react";

export default function useDeleteUser() {
  const [loading, setLoading] = useState(true);
  const [datosUser, setDatosUser] = useState([]);
  const [delet, setDelet] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(getApiUrl("user")).then((resp) => {
      const captionOp = resp.data;
      setDatosUser(captionOp);
      setLoading(false);
    });
  }, [delet]);

  const deleteUser = (_ID) => {
    const fromData = new FormData();
    fromData.append("_ID", _ID);

    axios
      .post(getApiUrl("user/delete"), fromData)
      .then((e) => {
        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
        setDelet(true);
      })

      .catch((err) => console.log(err));
  };

  const handleClick = (_ID) => {
    Swal.fire({
      title: "Desea eliminar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(_ID);
      }
    });
  };

  return {
    datosUser,
    handleClick,
    loading,
  };
}
