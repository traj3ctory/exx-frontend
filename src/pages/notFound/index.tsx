import { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {}

/**
 * @author traj3ctory
 * @function @NotFound
 **/

const NotFound: FC<IProps> = () => {
  return (
    <section className="not_found">
      <div className="container-lg container-fluid w-100">
        <h4>Page Not Found || 404</h4>
        <span>
          <i className="bi bi-arrow-left" />
          &ensp;<Link to="/">home</Link>
        </span>
      </div>
    </section>
  );
};

export default NotFound;
