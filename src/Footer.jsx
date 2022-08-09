import { Link } from "react-router-dom";
import "./views/styles/footer.css";

const logo = "/src/images/logo-ecopetrol.webp";

export default function Footer() {
  return (
    <div className="pie-pagina">
      <div className="group-1">
        <div className="box">
          <figure>
            <Link to="/">
              <img className='img-fluid' src={logo} alt="" />
            </Link>
          </figure>
        </div>
        <div className="footer_text">
          <h2>Sobre Nosotros</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        
      </div>
      <div className="group-2">
        <small>
          © <b>Copyright.</b> Todos los derechos reservados - 2022
        </small>
      </div>
    </div>
  );
}
