import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { genId } from '../components/utilities';
import { getApiUrl } from '../services/config';

export const useComponent = ( id, component, componentId ) => {
  const defaultImageSource = "/src/images/no-photo.webp";
  let navigate = useNavigate();
  const [error, setErrors] = useState();
  const [data, setData] = useState({
    _id: genId("-1"),
    equipment_id: id,
    caption: "",
    description: "",
    number_part: "",
    code_sap: "",
    existence: 0,
    _state: "0",
    photo: "",
    photoSrc: defaultImageSource,
    photoFile: null,
  });

  useEffect(() => {
    if (component !== null) {
      setData(component);
    }
  }, [component])

  const API = (url = getApiUrl('components')) => {
    return {
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(url + `/${id}`, updateRecord),
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const addOrEdit = (formData) => {
    if (formData.get("_id") !== componentId) {
      API()
        .create(formData)
        .then(() => {
          navigate(-1);
        })
        .catch((err) => console.log(err.message));
    } else {
      API()
        .update(formData.get("_id"), formData)
        .then(() => {
         
          navigate(-1);
        })
        .catch((err) => console.log(err.message));
    }
  }

  const validate = () => {
    let temp = {};
    temp._id = data._id === "" ? false : true;
    temp.equipment_id = data.equipment_id === "" ? false : true;
    temp.caption = data.caption === "" ? false : true;
    temp.description = data.description === "" ? false : true;
    temp.number_part = data.number_part === "" ? false : true;
    temp.code_sap = data.code_sap === "" ? false : true;
    temp.existence = data.existence === "" ? false : true;
    temp._state = data._state === "" ? false : true;
    temp.photoSrc = data.photoSrc === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  }

  const handleSubmit = (e) => {    
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("_id", data._id);
      formData.append("equipment_id", data.equipment_id);
      formData.append("caption", data.caption);
      formData.append("description", data.description);
      formData.append("number_part", data.number_part);
      formData.append("code_sap", data.code_sap);
      formData.append("existence", data.existence);
      formData.append("_state", data._state);
      formData.append("photo", data.photo);
      formData.append("photoFile", data.photoFile);
      if (data.existence <= 10) {
        Swal.fire({
          icon: 'error',
          title: 'alerta stock Minimo',
          showConfirmButton: false,
          timer: 1500
        })
      }
      addOrEdit(formData);
    }else{
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let photoFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setData({
          ...data,
          photoFile,
          photoSrc: x.target.result,
        })
      }
      reader.readAsDataURL(photoFile);
    } else {
      setData({
        ...data,
        photoFile: null,
        photoSrc: defaultImageSource,
      })
    }
  };
  return {
    data,
    handleChange,
    handleSubmit,
    validate,
    showPreview,
  }
}
