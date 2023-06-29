import { FC, ReactNode, useState } from "react";
import Header from "./Header";
import SideNav from "./SideNav";

interface IProps {
  children: ReactNode;
}

/**
 * @author traj3ctory
 * @function @DashboardLayout
 **/

const DashboardLayout: FC<IProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="dashboard_layout">
      <SideNav display={isOpen} />
      <div className="wrapper">
        <Header toggle={handleToggle} />
        <main className="content px-lg-3 container-fluid">{children}</main>
        <div className={`${isOpen && "overlay"}`} onClick={handleToggle} />
      </div>
    </section>
  );
};

export default DashboardLayout;
