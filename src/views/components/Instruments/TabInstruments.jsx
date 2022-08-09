import { Link } from "react-router-dom";
import useGlobalUser from "../../../hooks/useGlobalUser";

export default function TabInstruments({ data, func }) {
  const {user,setUser} = useGlobalUser();
  return (
    <div className="p-4 row row-cols-auto gap-2">
      {data.map((item) => {
        return (
          <div key={item._id} className="col">
            <div className="card rounded" style={{ width: "20rem" }}>
              <img
                className="card-img-top p-2 img-fluid"
                style={{ height: "18rem" }}
                src={item.photoSrc}
                loading="lazy"
                alt=""
              />
              <div className="card-body" style={{ height: "5rem" }}>
                <p className="card-text">{item.caption}</p>
              </div>
              <div className="card-footer">
                <div className="btn-group">
                  <Link
                    className="btn"
                    to={`instrumento`}
                    state={{ _id: item._id, instrument: item }}
                    style={{ background: "#004236", color: "white" }}
                  >
                    Editar
                  </Link>
                  <button
                    className={
                      user.role === "administrador"
                        ? "md btn btn-danger"
                        : "optionNav"
                    }
                    style={{ fontSize: "15px" }}
                    onClick={() => func(item._id)}
                  >
                    Eliminar
                  </button>
                  {/* <Link
                    className=' md btn btn-sm'
                    to={`instrument`}
                    state={{ _id: item._id, instrument: item }}
                    style={{ background: '#004236', color: 'white' }}
                  >
                    Manual
                  </Link>
                  <Link
                    className=' md btn btn-sm'
                    to={`instrument`}
                    state={{ _id: item._id, instrument: item }}
                    style={{ background: '#004236', color: 'white' }}
                  >
                    Licencia
                  </Link> 
                  <Link
                    className=' md btn btn-sm'
                    to={`instrument`}
                    state={{ _id: item._id, instrument: item }}
                    style={{ background: '#004236', color: 'white' }}
                  >
                    Calibración
                  </Link>*/}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
