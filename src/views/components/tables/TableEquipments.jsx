import { useState, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Search from '../../../components/Search';
import useTables from '../../../hooks/useTables';
import { getApiUrl } from '../../../services/config';

export default function TableEquipments({ id }) {

  const [search, setSearch] = useState('');
  const searchInput = useRef(null);
  const data = useTables(getApiUrl(`equipments`), id);

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  }, [])

  const filterConmponents = useMemo(
    () =>
      data.filter((e) => {
        if (
          e.caption.toString().toLowerCase().includes(search.toLowerCase()) ||
          e.code_sap.toString().toLowerCase().includes(search.toLowerCase())
        ) {
          return e
        }
      }),
    [data, search]
  )

  return (
    <div>
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <h3 className=''>Equipos</h3>
          <Search
            search={search}
            searchInput={searchInput}
            handleSearch={handleSearch}
          />
        </div>
      </div>
      <div
        className='container table-responsive '
        style={{ height: '250px', overflow: 'auto' }}
      >
        <table className='table table-bordered table-sm align-middle'>
          <thead style={{ background: '#004236', color: 'white' }}>
            <tr className='text-center'>
              <th style={{ width: '9rem' }}>Nº parte</th>
              <th style={{ width: '29rem' }}>Nombre</th>
              <th style={{ width: '29rem' }}>Descripción</th>
              <th style={{ width: 'auto' }}>Codigo Sap</th>
              <th style={{ width: '3rem' }} colSpan='2'>
                Existencia
              </th>
            </tr>
          </thead>
          <tbody>
            {filterConmponents.map((item) => {
              return (
                <tr key={item._id}>
                  <td style={{ width: '9rem' }}>{item.number_part}</td>
                  <td style={{ width: '29rem' }}>{item.caption}</td>
                  <td style={{ width: '29rem' }}>{item.description}</td>
                  <td style={{ width: 'auto' }}>{item.code_sap}</td>
                  <td className='text-center' style={{ width: '2rem' }}>
                    {item.existence}
                  </td>
                  <td className='text-center' style={{ width: '1rem' }}>
                    <Link
                      to={'/aut/components'}
                      state={{
                        id: item.equipment_id,
                        component: item,
                        componentId: item._id,
                      }}
                    >
                      <i className='fa-solid fa-ellipsis'></i>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
