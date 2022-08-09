import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getApiUrl } from "../services/config";

export default function useFile() {
  let navigate = useNavigate();
  const [error, setErrors] = useState();
  const [caption, setCaption] = useState([]);

  const [form, setForm] = useState({
    inputEquipInst: "Equipos",
    inputOption: "",
    inputDoc: "",
    file: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const api = (url) => {
    axios.get(url).then((resp) => {
      const captionOp = resp.data.map(({ caption }) => {
        return caption[0].toUpperCase() + caption.slice(1).toLowerCase();
      });
      setCaption(captionOp);
    });
  };

  const uploadFile = (formData) => {
    axios
      .post(getApiUrl("file"), formData)
      .then((resp) => {
        let icono ='success';
        if (resp.data == "Archivo ya existe") {
          icono = 'warning'
        }

        Swal.fire({
          icon: icono,
          title: resp.data,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((resp) => {
        Swal.fire({
          icon: "warning",
          title: "No se ha podido guardar el archivo",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const validate = () => {
    let temp = {};
    temp.inputEquipInst = form.inputEquipInst === "" ? false : true;
    temp.inputOption = form.inputOption === "" ? false : true;
    temp.inputDoc = form.inputDoc === "" ? false : true;
    temp.file = form.file === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("inputEquipInst", form.inputEquipInst);
      formData.append("inputOption", form.inputOption);
      formData.append("inputDoc", form.inputDoc);
      formData.append("file", form.file);
      uploadFile(formData);
    } else {
      Swal.fire({
        icon: "error",
        title: "Los datos son obligatorios",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const deleteFile = (formData) => {
    axios
      .post(getApiUrl("delete"), formData)
      .then((resp) => {
        Swal.fire({
          icon: "success",
          title: "Archivo eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((resp) => {
        Swal.fire({
          icon: "warning",
          title: "No se ha podido eliminar el archivo",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const validateDelete = () => {
    let temp = {};
    temp.inputEquipInst = form.inputEquipInst === "" ? false : true;
    temp.inputOption = form.inputOption === "" ? false : true;
    temp.inputDoc = form.inputDoc === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const handleDeleteFile = () => {
    if (validateDelete()) {
      const formData = new FormData();
      formData.append("inputEquipInst", form.inputEquipInst);
      formData.append("inputOption", form.inputOption);
      formData.append("inputDoc", form.inputDoc);
      Swal.fire({
        title: "Desea eliminar el archivo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFile(formData);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Los datos son obligatorios",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return {
    handleChange,
    handleSubmit,
    form,
    setForm,
    api,
    caption,
    handleDeleteFile,
  };
}
