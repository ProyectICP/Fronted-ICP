import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../services/config";
import { genId } from "../components/utilities";

const DATA_INITIAL = {
  id: genId("-1"),
  name: "",
  email: "",
  password: "",
  role: "",
}

export const useRegister = () => {
  const navigate = useNavigate();

  const [error, setErrors] = useState();
  const [data, setData] = useState(DATA_INITIAL);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = () => {
    let temp = {};
    temp.id = data.id === "" ? false : true;
    temp.name = data.name === "" ? false : true;
    temp.email = data.email === "" ? false : true;
    temp.password = data.password === "" ? false : true;
    temp.role = data.role === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).includes(false);
  };

  const handleSubmit = (e) => {
    const expre = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    e.preventDefault();

    if (!expre.test(data.email)) {
      Swal.fire({
        icon: "error",
        title: "Email invalido",
        showConfirmButton: false,
        timer: 1500,
      });
      return
    }

    if (validate()) {
      Swal.fire({
        icon: "error",
        title: "Los datos son obligatorios",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      let temp = {
        id: "",
        name: "",
        email: "",
        password: "",
        role: "",
      };

      const formData = new FormData();

      temp.id = data.id;
      temp.name = data.name;
      temp.email = data.email;
      temp.password = data.password;
      temp.role = data.role;

      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      
      autenticar(formData);
    }
  };

  const autenticar = (formData) => {

    const url = getApiUrl("user/register");

    axios
      .post(url, formData)
      .then((e) => {
        Swal.fire({
          icon: "success",
          title: "Usuario creado con exito",
          showConfirmButton: false,
          timer: 1500,
        });
        setData(DATA_INITIAL);
        //     navigate("/aut/lmd");
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "No se ha podido crear el usuario",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return {
    data,
    handleChange,
    handleSubmit,
  };
};
