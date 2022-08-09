import { Link } from 'react-router-dom';


export default function TabHome({ data }) {
  return (
    <div className="p-4 row gap-3 lh-sm">
      {data.map((item) => {
        return (
          <div
            key={item._id}
            className="rounded"
            style={{
              maxWidth: "628px",
              border: "1px solid gray",
              padding: "20px"
            }}
          >
            <div className="row">
              <div className="col-md-5 p-1">
                <Link to={item.link}>
                  <img
                    className="img-thumbail rounded-circle img-fluid"
                    style={{ width: "100%", height: "100%" }}
                    loading="lazy"
                    src={item.image}
                    alt=""
                  />
                </Link>
              </div>
              
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title" style={{ height: "5rem" }}>
                    {item.caption}
                  </h5>
                  <p className="card-text mb-1 content-description">
                    {item.description}
                  </p>
                  <p className="text-end">
                    <Link
                      className="btn btn-sm"
                      style={{ background: "#004236", color: "white" }}
                      to={item.link}
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
