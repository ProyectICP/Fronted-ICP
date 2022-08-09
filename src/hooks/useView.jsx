


const useView = (url, area) => {

    return fetch(url)
      .then((res) => res.json())
      .then(response => {
        const data  = response

        const list = data.filter((e) => {
          if (area === 'fir') {
            return e.area_analitica === 'fir'
          } else if (area === 'crudos') {
            return e.area_analitica === 'crudos'
          } else if (area === 'resistencia') {
            return e.area_analitica === 'resistencia'
          } else if (area === 'cam') {
            return e.area_analitica === 'cam'
          } else if (area === 'corrosion') {
            return e.area_analitica === 'corrosion'
          } else if (area === 'recubrimientos') {
            return e.area_analitica === 'recubrimientos'
          } else if (area === 'cat') {
            return e.area_analitica === 'cat'
          }
        })
        return list
      })
      .catch((err) => console.log(err.message))
}

export default useView

