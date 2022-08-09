import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../services/config';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export const useSession = () => {
  const navigate = useNavigate();
  const { user,setUser} = useContext(AuthContext);
  const [storedValue,setValue] = useLocalStorage('login',user);

  const [error, setErrors] = useState();
  const [dataL, setDataL] = useState({    
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataL({ ...dataL, [name]: value });
  }

  const validate = () => {
    let temp = {};
    temp.email = dataL.email === "" ? false : true;
    temp.password = dataL.password === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  }

  const handleSubmit = (e) => {  
    const expre = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    e.preventDefault();
    

    if (validate()) {
      const formData = new FormData();
      formData.append('email',dataL.email);
      formData.append('password',dataL.password);
      if(expre.test(dataL.email)){
        autenticar(formData)
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Email invalido',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Los datos son obligatorios',
        showConfirmButton: false,
        timer: 1500
      })
    }
   
  }

  const API = (url = getApiUrl('user/login')) => {
    return {
      search: (userRecord) => axios.post(url, userRecord),
    }
  }

  const autenticar = (formData) => {
    API().search(formData).then((resp) => {
      setUser(resp.data)
      setValue(resp.data)
      navigate('/aut/lmd')
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  return {
    handleChange,
    handleSubmit
  }
}
