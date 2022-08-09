import { useEffect, useState } from 'react';

const useArea = (url) => {
  const [dataArea, setDataArea] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((dataArea) => setDataArea(dataArea))
      .catch((err) => console.log(err.message));
    }, [url])
    
    // const nameArea = dataArea.map( item => item.name_area)

  return dataArea;
}

export default useArea
