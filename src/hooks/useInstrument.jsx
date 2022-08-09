import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { genId } from '../components/utilities';
import { getApiUrl } from '../services/config';

export const useInstruments = ( _id, instrument, area) => {
  
  let volver = useNavigate();
  const defaultImageSource = '/src/images/no-photo.webp';
  const [error, setErrors] = useState();

  const [data, setData] = useState({
    _id: genId('-1'),
    laboratorie: '',
    area: '',    
    area_analitica: area,
    caption: '',
    number_serie: '',
    modelo: '',
    marca: '',
    code_sap: '',
    existencia: '',
    date_make: new Date().toLocaleString(),
    number_part: '',
    photo: '',
    _state: '0',
    photoSrc: defaultImageSource,
    photoFile: null,
  });

  useEffect(() => {
    if (instrument !== null) {
      setData(instrument)
    }
  }, [instrument])

  const API = (url = getApiUrl('instruments')) => {
    return {
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(url + `/${id}`, updateRecord),
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const addOrEdit = (formData) => {
    if (formData.get('_id') !== _id) {
      API()
        .create(formData)
        .then((res) => {
          volver(-1)
        })
        .catch((err) => console.log(err.message))
    } else {
      API()
        .update(formData.get('_id'), formData)
        .then((res) => {
          volver(-1)
        })
        .catch((err) => console.log(err.message))
    }
  }

  const validate = () => {
    let temp = {}
    temp._id = data._id === '' ? false : true
    temp.laboratorie = data.laboratorie === '' ? false : true
    temp.area = data.area === '' ? false : true
    temp.area_analitica = data.area_analitica === '' ? false : true
    temp.caption = data.caption === '' ? false : true
    temp.number_serie = data.number_serie === '' ? false : true
    temp.modelo = data.modelo === '' ? false : true
    temp.marca = data.marca === '' ? false : true
    temp.code_sap = data.code_sap === '' ? false : true
    temp.existencia = data.existencia === '' ? false : true
    temp.number_part = data.number_part === '' ? false : true
    temp._state = data._state === '' ? false : true
    temp.photoSrc = data.photoSrc === '' ? false : true
    setErrors(temp)
    return Object.values(temp).every((x) => x === true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const formData = new FormData()
      formData.append('_id', data._id)
      formData.append('laboratorie', data.laboratorie)
      formData.append('area', data.area)
      formData.append('area_analitica', data.area_analitica)
      formData.append('caption', data.caption)
      formData.append('number_serie', data.number_serie)
      formData.append('modelo', data.modelo)
      formData.append('marca', data.marca)
      formData.append('code_sap', data.code_sap)      
      formData.append('date_make', data.date_make)
      formData.append('existencia', data.existencia)
      formData.append('number_part', data.number_part)
      formData.append('_state', data._state)
      formData.append('photo', data.photo)
      formData.append('photoFile', data.photoFile)
      if (data.existencia <= 10) {
        Swal.fire({
          icon: 'error',
          title: 'alerta stock Minimo',
          showConfirmButton: false,
          timer: 1500
        })
      }
      addOrEdit(formData)
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let photoFile = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (x) => {
        setData({
          ...data,
          photoFile,
          photoSrc: x.target.result,
        })
      }
      reader.readAsDataURL(photoFile)
    } else {
      setData({
        ...data,
        photoFile: null,
        photoSrc: defaultImageSource,
      })
    }
  }
  return {
    data,
    handleChange,
    handleSubmit,
    showPreview,
  }
}
