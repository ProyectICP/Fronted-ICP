import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

/**Views */
import ViewFieh from "../views/ViewEquipment";
import ViewLabLim from "../views/ViewLabLim";
import ViewLabFieh from "../views/ViewLabFieh";
import ViewLmd from "../views/ViewLmd";


import Equipments from "../views/components/Equipments/Equipment";
import Instrument from "../views/components/Instruments/Instrument";
import Components from "../views/components/Adds/Components";
import Comsumable from "../views/components/Adds/Comsumable";
import Reagent from "../views/components/Adds/Reagent";
import Register from '../views/components/Adds/Register';
import File from '../views/components/Adds/File';
import DowloadFile from "../views/components/Adds/DowloadFile";
import { DeleteUser } from "../components/DeleteUser";
import DownloadExcel from "../components/DownloadExcel";

export const DashboardRouter = () => {
  return (
    
      <Routes>      
        <Route path="register" element={<Register />} />
        <Route path="file" element={<File />} />
        <Route path="down" element={<DowloadFile />} />
        <Route path="deleteUser" element={<DeleteUser />} />
        <Route path="lmd" element={<ViewLmd />} />
        
        
        <Route path="fieh" element={<ViewLabFieh />} />
        <Route path="fieh/:area" element={<ViewFieh />} />
        <Route path="fieh/:area/equipo" element={<Equipments />} />
        <Route path="fieh/:area/instrumento" element={<Instrument />} />

        {/* materiales */}
        <Route path="lim" element={<ViewLabLim />} />
        <Route path="lim/:area" element={<ViewFieh />} />
        <Route path="lim/:area/equipo" element={<Equipments />} />
        <Route path="lim/:area/instrumento" element={<Instrument />} />

        {/* <Route path="download/:lab" element={<DownloadExcel />} /> */}
        <Route path="downloandExcel" element={<DownloadExcel />} />

        <Route path="components" element={<Components />} />
        <Route path="consumables" element={<Comsumable />} />
        <Route path="reagents" element={<Reagent />} />
        <Route path='*' element={<Navigate to='/session' replace />} />
      </Routes>

  );
};
