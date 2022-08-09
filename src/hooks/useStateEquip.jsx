import { useData } from "../hooks/useData";
import { getApiUrl } from "../services/config";

export const useStateEquip = () => {
  const datos = useData(getApiUrl(`equipments`));

  let datosMap = datos.map((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "_state") {
        if (key !== "_id") {
          delete item[key];
        }
      }
    });
    return item;
  });
  return datosMap;
};
