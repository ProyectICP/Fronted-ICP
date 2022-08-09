import React from "react";
import { Link } from "react-router-dom";
import useDeleteUser from "../hooks/useDeleteUser";
import ViewLoading from "../views/ViewLoading";

export const DeleteUser = () => {
  const { datosUser, handleClick, loading } = useDeleteUser();

  return (
    <div className="container my-5">
      <Link className="btn mb-2" to={-1} style={{ color: "#004236" }}>
        <i className="fa-solid fa-arrow-left-long fa-xl"></i>
      </Link>
      {loading ? (
        <ViewLoading />
      ) : (
        <div className="card border-primary mb3 backg">
          <div className="card-body text-white">
            <h5 className="card-title text-center">Listado de usuarios</h5>

            <table className="table table-border table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {datosUser.map((us) => {
                  return (
                    <tr key={us._ID}>
                      <td>{us.name}</td>
                      <td>{us.email}</td>
                      <td>{us.role}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            handleClick(us._ID);
                          }}
                        >
                          Elminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
