import { useEffect, useState } from "react";
import axios from 'axios';
export const useDataExcel = (url,lab) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.post(url,lab)
    .then((resp) => setData(resp.data))
    .catch((err) => console.log(err))
  }, [url]);
  return data;
};
