import React from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../../hooks/useRegister";
import "../../styles/register.css";

export default function Register() {
  const { data, handleChange, handleSubmit } = useRegister();
  return (
    <div className='regi'>
      <Link className="btn mb-2" to={-1} style={{ color: "#004236" }}>
        <i className="fa-solid fa-arrow-left-long fa-xl"></i>
      </Link>
      <div className="app">        
        <div className="login-form">
          <div className="title">Registro Usuario</div>
          <div className="form">
            <form autoComplete="off" onSubmit={handleSubmit} noValidate>
              <div className="input-container">
                <label>Nombre </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-container">
                <label>Email </label>
                <input
                  value={data.email}
                  type="text"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-container">
                <label>Password </label>
                <input
                  value={data.password}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-container select">
                <label>Role </label>
                <select name="role" onChange={handleChange} value={data.role}>
                  <option value=""></option>
                  <option value="administrador">Administrador</option>
                  <option value="usuario">Usuario</option>
                </select>
              </div>

              <div className="button-container">
                <button>Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
