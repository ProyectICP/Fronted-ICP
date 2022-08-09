import { Link, useParams } from 'react-router-dom';
import { useState, useMemo, useRef, useCallback } from 'react';

import TabInstruments from './components/Instruments/TabInstruments';
import Search from '../components/Search';
import useView from '../hooks/useView';
import { getApiUrl } from '../services/config';

import './styles/equipment.css';

export default function ViewEquipment() {

  const [search, setSearch] = useState('');
  const { area } = useParams();
  const searchInput = useRef(null);

  const data = useView(getApiUrl(`instruments`), area);

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  }, [])

  const searchList = useMemo(
    () =>
      data.filter((e) => {
        if (
          e.caption.toLowerCase().includes(search.toLowerCase()) ||
          e.code_sap.toLowerCase().includes(search.toLowerCase())
        ) {
          return e
        }
      }),
    [data, search]
  )

  return (
    <>
      <div className='container text-center py-4'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <Link className='btn mb-2' to={-1} style={{ color: '#004236' }}>
              <i className='fa-solid fa-arrow-left-long fa-xl'></i>
            </Link>
            <ul className='agg'>
              <li>
                <input type='checkbox' name='list' id='nivel1-1' />
                <label htmlFor='nivel1-1'>
                  <i className='fa-solid fa-circle-plus'></i>
                </label>
                <ul className='interior'>
                  <Link
                    className='btn mb-2 link'
                    to={`equipo`}
                    state={{ _id: '0', equipment: null, area: area }}
                    style={{ color: '#004236' }}
                  >
                    <li>
                      <label className='font' htmlFor='nivel2-1'>
                        Instrumento
                      </label>
                    </li>
                  </Link>

                  <Link
                    className='btn mb-2 link'
                    to={`instrument`}
                    state={{ _id: '1', equipment: null, area: area }}
                    style={{ color: '#004236' }}
                  >
                    <li>
                      <label className='font' htmlFor='nivel2-1'>
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
        <TabInstruments data={searchList}></TabInstruments>
      </div>
    </>
  )
}
