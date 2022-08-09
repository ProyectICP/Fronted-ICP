import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import useTabEquipInst from "../hooks/useTabEquipInst";
import TabEquipments from "./components/Equipments/TabEquipments";
import TabInstruments from "./components/Instruments/TabInstruments";
import Search from "../components/Search";
import useView from "../hooks/useView";
import { getApiUrl } from "../services/config";

import "./styles/equipment.css";
import ViewLoading from "./ViewLoading";

export default function ViewEquipment() {
  const { delet, handleClickEquip, handleClickInst } = useTabEquipInst();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const { area } = useParams();
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    setLoading(true);
    useView(getApiUrl(`equipments`), area).then((list) => {
      setData(list);
      setLoading(false);
    });

    useView(getApiUrl(`instruments`), area).then((list) => {
      setData2(list);
      setLoading(false);
    });
    
  }, [delet]);

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
    setSearch2(searchInput.current.value);
  }, []);

  const searchList = useMemo(
    () =>
      data.filter((e) => {
        if (
          e.caption.toLowerCase().includes(search.toLowerCase()) ||
          e.code_sap.toLowerCase().includes(search.toLowerCase())
        ) {
          return e;
        }
      }),
    [data, search]
  );

  const searchList2 = useMemo(
    () =>
      data2.filter((e) => {
        if (
          e.caption.toLowerCase().includes(search2.toLowerCase()) ||
          e.code_sap.toLowerCase().includes(search2.toLowerCase())
        ) {
          return e;
        }
      }),
    [data2, search2]
  );

  return (
    <>
      <div className="container text-center py-4 ">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Link className="btn mb-2" to={-1} style={{ color: "#004236" }}>
              <i className="fa-solid fa-arrow-left-long fa-xl"></i>
            </Link>
            <ul className="agg">
              <li>
                <input type="checkbox" name="list" id="nivel1-1" />
                <label htmlFor="nivel1-1">
                  <i className="fa-solid fa-circle-plus"></i>
                </label>
                <ul className="interior">
                  <Link
                    className="btn mb-2 link"
                    to={`equipo`}
                    state={{ _id: "0", equipment: null, area: area }}
                    style={{ color: "#004236" }}
                  >
                    <li>
                      <label className="font" htmlFor="nivel2-1">
                        Equipo
                      </label>
                    </li>
                  </Link>

                  <Link
                    className="btn mb-2 link"
                    to={`instrumento`}
                    state={{ _id: "0", instrument: null, area: area }}
                    style={{ color: "#004236" }}
                  >
                    <li>
                      <label className="font" htmlFor="nivel2-1">
                        Intrumento
                      </label>
                    </li>
                  </Link>
                </ul>
              </li>
            </ul>
          </div>

          <Search
            search={search}
            searchInput={searchInput}
            handleSearch={handleSearch}
          />
        </div>
        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <ViewLoading />
            ) : (
              <TabEquipments
                data={searchList}
                func={handleClickEquip}
              ></TabEquipments>
            )}
          </div>
          <div className="col-md-12">
            <TabInstruments
              data={searchList2}
              func={handleClickInst}
            ></TabInstruments>
          </div>
        </div>
      </div>
    </>
  );
}
