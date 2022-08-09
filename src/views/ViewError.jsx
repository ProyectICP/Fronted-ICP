import { Link } from 'react-router-dom';

import './styles/error.css';

export default function ViewError(){
  return (
    
      <div className="err">
        <h1 >404</h1>
        <div>
          <h2>Not found.</h2>
          <Link to={'/'}>
            <button className="btn btn-primary">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    
  );
};
