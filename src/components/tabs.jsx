import { Link } from 'react-router-dom';

export default function Tabs({ data }) {
  return (
    <div className="p-4 row gap-2 lh-sm">
      {data.map((item) => {
        let link =
          item.area === undefined || item.area === ""
            ? `${item.link}`
            : `${item.link}/${item.area}`;
        return (
          <div
            key={item._id}
            className="card rounded"
            style={{
              maxWidth: "628px",
            }}
          >
            <div className="row">
              <div className="col-md-5 p-1">
                <img
                  className="img-thumbail rounded img-fluid"
                  style={{ width: "250px", height: "250px" }}
                  loading="lazy"
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title ">
                    {item.caption}
                  </h5>
                  <p className="card-text mt-2 content-description" >
                    
                    {item.description}
                  </p>
                  <p className="text-end">
                    <Link
                      className="btn btn-sm"
                      style={{ background: "#004236", color: "white" }}
                      to={link}
                      state={{ caption: item.caption }}
                    >
                      Ver mas
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
