import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getApiUrl } from '../services/config';
import { genId } from '../components/utilities';

export const useEquipment = ( _id, equipment, area ) => {

  let volver = useNavigate();
  const defaultImageSource = '/src/images/no-photo.webp';
  const [data, setData] = useState({
    _id: genId('-1'),
    laboratorio: '',
    area: '',
    area_analitica: area,
    caption: '',
    fabricante: '',
    proveedor: '',
    code_serie: '',
    model: '',
    software: '',
    consecutivo: '',
    code_sap: '',
    date_make: new Date().toLocaleString(),
    ubicacion: '',
    ceco: '',
    photo: '',
    photoSrc: defaultImageSource,
    photoFile: null,
    ambientales: '',
    electricas: '',
    dimensiones: '',
    peso: '',
    _state: '0',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (equipment !== null) {
      setData(equipment)
    }
  }, [equipment])

  const API = (url = getApiUrl('equipments')) => {
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
    temp.laboratorio = data.laboratorio === '' ? false : true
    temp.area = data.area === '' ? false : true
    temp.area_analitica = data.area_analitica === '' ? false : true
    temp.caption = data.caption === '' ? false : true
    temp.fabricante = data.fabricante === '' ? false : true
    temp.proveedor = data.proveedor === '' ? false : true
    temp.code_serie = data.code_serie === '' ? false : true
    temp.model = data.model === '' ? false : true
    temp.software = data.software === '' ? false : true
    temp.consecutivo = data.consecutivo === '' ? false : true
    temp.code_sap = data.code_sap === '' ? false : true
    temp.date_make = data.date_make === '' ? false : true
    temp.ubicacion = data.ubicacion === '' ? false : true
    temp.ceco = data.ceco === '' ? false : true
    temp.ambientales = data.ambientales === '' ? false : true
    temp.electricas = data.electricas === '' ? false : true
    temp.dimensiones = data.dimensiones === '' ? false : true
    temp.peso = data.peso === '' ? false : true
    temp._state = data._state === '' ? false : true
    temp.photoSrc = data.photoSrc === '' ? false : true
    setError(temp)
    return Object.values(temp).every((x) => x === true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const formData = new FormData()
      formData.append('_id', data._id)
      formData.append('laboratorio', data.laboratorio)
      formData.append('area', data.area)
      formData.append('area_analitica', data.area_analitica)
      formData.append('caption', data.caption)
      formData.append('fabricante', data.fabricante)
      formData.append('proveedor', data.proveedor)
      formData.append('code_serie', data.code_serie)
      formData.append('model', data.model)
      formData.append('software', data.software)
      formData.append('consecutivo', data.consecutivo)
      formData.append('code_sap', data.code_sap)
      formData.append('date_make', data.date_make)
      formData.append('ubicacion', data.ubicacion)
      formData.append('ceco', data.ceco)
      formData.append('_state', data._state)
      formData.append('photo', data.photo)
      formData.append('photoFile', data.photoFile)
      formData.append('ambientales', data.ambientales)
      formData.append('electricas', data.electricas)
      formData.append('dimensiones', data.dimensiones)
      formData.append('peso', data.peso)
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
