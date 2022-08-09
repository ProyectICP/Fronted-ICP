import { Link } from 'react-router-dom';

import Tabs from '../components/Tabs';
import { infoViewLup } from './objects/info';

export default function ViewLup() {
  return (
    <div className='container mx-auto py-4'>
      <div className='d-flex justify-content-between'>
        <Link className='btn mb-2' to={-1} style={{ color: '#004236' }}>
          <i className='fa-solid fa-arrow-left-long fa-xl'></i>
        </Link>
        <h3 className='text-center mb-4'>Laboratorios LUP</h3>
        <p></p>
      </div>
      <Tabs data={infoViewLup}></Tabs>
    </div>
  )
}
