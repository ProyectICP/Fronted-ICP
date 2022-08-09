
import { useSession } from "../hooks/useSession";
import "./styles/signin.css";

const ViewSession = () => {
  const { handleChange, handleSubmit } = useSession();
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Inicio Sesión</div>
        <div className="form">
          <form 
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
              />
            </div>

              <div className="button-container">
                <button >Ingresar</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewSession;
