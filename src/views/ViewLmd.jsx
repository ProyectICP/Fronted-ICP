import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Tabs from '../components/Tabs.jsx';
import { infoViewLmd } from './objects/info';

export default function ViewLmd() {

  return (
    <div className='container mx-auto py-4'>
      <div className='d-flex justify-content-between'>
        <Link className='btn mb-2' to={-1} style={{ color: '#004236' }}>
          <i className='fa-solid fa-arrow-left-long fa-xl'></i>
        </Link>
        <h3 className='text-center mb-4'>Laboratorios LMD</h3>
        <p></p>
      </div>      
      
      <Tabs data={infoViewLmd}></Tabs>
    </div>
  )
}
