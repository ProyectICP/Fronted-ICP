import React from "react";
import { Link } from "react-router-dom";
import useGlobalUser from "../../../hooks/useGlobalUser";
import "../../../views/styles/table.css";

export default function TabEquipments({ data,func }) {

  const {user,setUser} = useGlobalUser(); 

  return (
    <div className="p-4 row row-cols-auto gap-2">
      {data.map((item) => {
        return (
          
          <div key={item._id} className="col ">
            <div id={`card${item._id}`} className="card rounded" style={{ width: "20rem" }}>
              <img
                className="card-img-top p-2 img-fluid imgRela"
                style={{ height: "18rem" }}
                src={item.photoSrc}
                loading="lazy"
                alt={item.caption}
              />

              <div className="card-body" style={{ height: "5rem" }}>
                <p className="card-text">{item.caption}</p>
              </div>
              <div className="card-footer">
                <div className="btn-group">
                  <Link
                    className="btn"
                    to={`equipo`}
                    state={{ _id: item._id, equipment: item }}
                    style={{ background: "#004236", color: "white" }}
                    id={`linkEdit${item._id}`}
                  >
                    Editar
                  </Link>
                   <button
                    className={user.role === 'administrador' ? 'md btn btn-danger' : 'optionNav' }
                    onClick={() => func(item._id)}
                    style={{ fontSize: '15px' }}
                  >
                    Eliminar
                  </button>

                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
