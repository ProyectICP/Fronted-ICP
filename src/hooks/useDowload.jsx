import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { getApiUrl } from "../services/config";

export default function useDowload() {
  const [error, setErrors] = useState();
  const [caption, setCaption] = useState([]);

  const [form, setForm] = useState({
    inputEquipInst: "Equipos",
    inputOption: "",
    inputDoc: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const api = (url) => {
    axios.get(url)
    .then(resp => {
      const captionOp = resp.data.map(({ caption }) => {
        return caption[0].toUpperCase() + caption.slice(1).toLowerCase()
      })
      setCaption(captionOp)
    })
  }

  const uploadFile = (formData) => {
    let name = `${form.inputDoc}-${form.inputOption}.pdf`
    axios.post(getApiUrl('down'),formData,{
      responseType: 'blob'
    })
    .then( (resp) => {
      fileDownload(resp.data,name)
    })
  }


  const validate = () => {
    let temp = {};
    temp.inputEquipInst = form.inputEquipInst === "" ? false : true;
    temp.inputOption = form.inputOption === "" ? false : true;
    temp.inputDoc = form.inputDoc === "" ? false : true;
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

  return {
    handleChange,
    handleSubmit,
    form,
    api,
    caption
  }
}
