import { Link, useLocation } from 'react-router-dom';

import { useReagent } from '../../../hooks/useReagent';

export default function Reagent() {
 
  const location = useLocation();
  const { id, reagent, reagentId } = location.state
  const { data, handleChange, handleSubmit, showPreview } = useReagent(
    id,
    reagent,
    reagentId
  );

  return (
    <div className='container py-4'>
      <div className='text-end'>
        <Link
          className='btn btn-sm'
          style={{ background: '#004236', color: 'white' }}
          to={-1}
        >
          Volver
        </Link>
      </div>
      <div className='py-2'>
        <h3 className='text-center'>Datos Reactivo</h3>
      </div>
      <form
        className='container py-4'
        autoComplete='off'
        noValidate
        onSubmit={handleSubmit}
      >
        <div className='row g-3'>
          <div className='col-sm-12 col-md-4'>
            <div
              className='form-group mb-2 text-center'
              style={{ height: '320px' }}
            >
              <img
                className='img-thumbail rounded img-fluid'
                style={{ height: '320px', width: '320px' }}
                loading='lazy'
                src={data.photoSrc}
                alt=''
              />
            </div>
            <div className='form-group text-center'>
              <input
                type='file'
                accept='image/*'
                className='form-control-file form-control-sm'
                onChange={showPreview}
                id='image-uploader'
              />
            </div>
          </div>
          <div className='col-sm-12 col-md-8 col-lg-8'>
            <div className='form-group input-group-sm mb-2'>
              <label>Nombre Reactivo</label>
              <input
                type='text'
                className='form-control'
                name='caption'
                value={data.caption}
                onChange={handleChange}
              />
            </div>
            <div className='form-group input-group-sm mb-2'>
              <label>Descripción</label>
              <input
                type='text'
                className='form-control'
                name='description'
                value={data.description}
                onChange={handleChange}
              />
            </div>
            <div className='form-group input-group-sm mb-2'>
              <label>Número Parte</label>
              <input
                type='text'
                className='form-control'
                name='number_part'
                value={data.number_part}
                onChange={handleChange}
              />
            </div>
            <div className='form-group input-group-sm mb-2'>
              <label>Codigo Sap</label>
              <input
                type='text'
                className='form-control'
                name='code_sap'
                value={data.code_sap}
                onChange={handleChange}
              />
            </div>
            <div className='row'>
              <div className='form-group col-md-6 input-group-sm mb-2'>
                <label>Existencia</label>
                <input
                  type='text'
                  className='form-control'
                  name='existence'
                  value={data.existence}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group col-md-6 input-group-sm mb-2'>
                <label>Número Cas</label>
                <input
                  type='text'
                  className='form-control'
                  name='code_cas'
                  value={data.code_cas}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='text-end'>
          <button
            className='btn btn-sm'
            style={{ background: '#004236', color: 'white' }}
            type="submit"
          >
            Reactivo
          </button>
        </div>
      </form>
    </div>
  )
}
