import type { MenuProps } from "antd";
import { Input, Menu } from "antd";
import { FC, createElement, useState } from "react";
import { BiPieChartAlt2, BiSearch } from "react-icons/bi";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { LuCopyCheck } from "react-icons/lu";
import { PiStackLight } from "react-icons/pi";
import { RiHome6Line } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import userAvatar from "@/assets/user_avatar.png";
import { RouteI } from "@/types";
import { Routes2 } from "./Route";

type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
//   type?: "group"
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   } as MenuItem;
// }
const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items: MenuProps["items"] = [
  getItem(
    "Home",
    "/home",
    <span className="icon">
      <RiHome6Line />
    </span>
  ),
  getItem(
    "Dashboard",
    "/dashboard",
    <span className="icon">
      <HiOutlineChartSquareBar />
    </span>,
    [
      getItem("Sender", "/dashboard/sender", null),
      getItem("Notifications", "/dashboard/notifications", null),
      getItem("Analytics", "/dashboard/analytics", null),
    ]
  ),
  getItem(
    "Projects",
    "project",
    <span className="icon">
      <PiStackLight />
    </span>
  ),
  getItem(
    "Tasks",
    "task",
    <span className="icon">
      <LuCopyCheck />
    </span>,
    [getItem("To do", "todo", null), getItem("Updates", "updates", null)]
  ),
  getItem(
    "Reporting",
    "reporting",
    <span className="icon">
      <BiPieChartAlt2 />
    </span>
  ),
  getItem(
    "Users",
    "user",
    <span className="icon">
      <FiUsers />
    </span>
  ),
];

const rootSubmenuKeys = ["home", "/dashboard"];

interface IProps {
  display: boolean;
}

/**
 * @author traj3ctory
 * @function @SideNav
 **/

const SideNav: FC<IProps> = ({ display }) => {
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState(["/dashboard"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    if (rootSubmenuKeys.includes(latestOpenKey!)) {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    } else {
      setOpenKeys(keys);
    }
  };
  // const onOpenChange = (keys: string[]) => {
  //   setOpenKeys(keys.filter((key) => !rootSubmenuKeys.includes(key)));
  // };

  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };  

  return (
    <aside className={`left_nav px-2 pt-3 ${display && "left_expand"}`}>
      <div className="header">
        <img src={logo} alt="project logo" className="logo" />
        <Input size="large" placeholder="Search" prefix={<BiSearch />} />
      </div>

      <div className="body">
        <Menu
          mode="inline"
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 256 }}
          items={items}
        />
      </div>

      <div className="footer">
        <ul>
          {Routes2.map((el: RouteI, i: number) => {
            const isActive = location.pathname === el.path;
            return (
              <li
                key={i}
                className={`${isActive && "active"} ${
                  el.comingSoon && "disabled"
                }`}
              >
                <NavLink
                  to={el.path}
                  className={`${el.comingSoon && "disabled"}`}
                >
                  <span className="icon">{createElement(el.icon)}</span>
                  &ensp;{el.name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="user_footer">
          <img src={userAvatar} alt="Olivia Ryhe" />
          <div className="outer">
            <div className="inner">
              <h5>Olivia Ryhe</h5>
              <span className="icon">
                <FiLogOut />
              </span>
            </div>
            <p>olivia@untitledui.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
