import { useMemo } from 'react';
import { useEffect, useState } from 'react';

const useTables = (url, id) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err.message));
  }, [url, id])

  const list = data.filter((e) => e.equipment_id === id);
  return list;
}

export default useTables
