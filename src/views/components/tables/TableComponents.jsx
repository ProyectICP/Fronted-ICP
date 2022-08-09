import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalUser from "../../../hooks/useGlobalUser";

import Search from "../../../components/Search";
import useDeleteOpt from "../../../hooks/useDeletesOpt";
import { getApiUrl } from "../../../services/config";
import "../../../views/styles/home.css";

export default function TableComponents({ id }) {
  const { user, setUser } = useGlobalUser();
  const [search, setSearch] = useState("");
  const [resp, setResp] = useState([]);
  const { delet, handleClick } = useDeleteOpt();

  useEffect(() => {
    fetch(getApiUrl("components"))
      .then((res) => res.json())
      .then((data) => setResp(data))
      .catch((err) => console.log(err.message));
  }, [delet]);

  const data = resp.filter((e) => e.equipment_id === id);

  const searchInput = useRef(null);

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filterConmponents = useMemo(
    () =>
      data.filter((e) => {
        if (
          e.caption.toString().toLowerCase().includes(search.toLowerCase()) ||
          e.code_sap.toString().toLowerCase().includes(search.toLowerCase())
        ) {
          return e;
        }
      }),
    [data, search]
  );

  function handleClickSwal(){
    Swal.fire({
      icon: "warning",
      title: `No eres administrador`,
      showConfirmButton: false,
      timer: 1000,
    });
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>Componentes</h3>
          <Search
            search={search}
            searchInput={searchInput}
            handleSearch={handleSearch}
          />
        </div>
      </div>
      <div
        className="container table-responsive "
        style={{ height: "250px", overflow: "auto" }}
      >
        <table className="table table-bordered table-sm align-middle">
          <thead style={{ background: "#004236", color: "white" }}>
            <tr className="text-center">
              <th style={{ width: "9rem" }}>Nº parte</th>
              <th style={{ width: "29rem" }}>Nombre</th>
              <th style={{ width: "29rem" }}>Descripción</th>
              <th style={{ width: "auto" }}>Codigo Sap</th>
              <th style={{ width: "auto" }}>Exis</th>
              <th style={{ width: "3rem" }} colSpan="2">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filterConmponents.map((item) => {
              return (
                <tr
                  key={item._id}
                  className={
                    Number(item.existence) <= 10 ? "stock_min" : "stock_ok"
                  }
                >
                  <td style={{ width: "9rem" }}>{item.number_part}</td>
                  <td style={{ width: "29rem" }}>{item.caption}</td>
                  <td style={{ width: "29rem" }}>{item.description}</td>
                  <td style={{ width: "auto" }}>{item.code_sap}</td>
                  <td style={{ width: "2rem" }}>{item.existence}</td>

                  <td style={{ width: "1rem" }}>
                    <Link
                      to={"/aut/components"}
                      state={{
                        id: item.equipment_id,
                        component: item,
                        componentId: item._id,
                      }}
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </Link>
                  </td>
                  <td style={{ width: "1rem" }}>
                    {user.role === "administrador" ? (
                      <i
                        onClick={() => {
                          handleClick("componente", "components", item._id);
                        }}
                        className="bi bi-trash delete_icon"
                      ></i>
                    ) : (
                      <i
                        onClick={handleClickSwal}
                        className="bi bi-trash delete_icon"
                      ></i>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
