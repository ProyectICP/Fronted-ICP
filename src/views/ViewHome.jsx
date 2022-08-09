import TabHome from "../components/TabHome.jsx";
import { infoViewHome } from "./objects/info";
import "./styles/home.css";

export default function ViewHome() {
  return (
    <>

      <div className="text-center img-wrapper">
        <div className="info-home">
          <h1 className="title-home">
            GERENCIA DE OPERACIONES DE INNOVACIÓN Y TECNOLOGÍA
          </h1>
        </div>
      </div>
      <div className="container mx-auto py-4">
        <TabHome data={infoViewHome}></TabHome>
      </div>
    </>
  );
}
