import { RiHome6Line } from "react-icons/ri";
import { HiOutlineChartSquareBar, HiOutlineCog } from "react-icons/hi";
import { BiPieChartAlt2 } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { LuCopyCheck } from "react-icons/lu";
import { PiStackLight } from "react-icons/pi";
import { CgSupport } from "react-icons/cg";
import { RouteI } from "../../types";

const Routes: Array<RouteI> = [
  {
    path: "/home",
    exact: true,
    name: "Home",
    icon: RiHome6Line,
    comingSoon: false,
    bottom: false,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    icon: HiOutlineChartSquareBar,
    comingSoon: false,
    bottom: false,
    children: [
      {
        label: "Sender",
        path: "/sender",
      },
      {
        label: "Notifications",
        path: "/notifications",
      },
      {
        label: "Analytics",
        path: "/analytics",
      },
    ],
  },
  {
    path: "/projects",
    exact: true,
    name: "Projects",
    icon: PiStackLight,
    comingSoon: true,
    bottom: false,
  },
  {
    path: "/tasks",
    exact: true,
    name: "Tasks",
    icon: LuCopyCheck,
    comingSoon: true,
    bottom: false,
  },
  {
    path: "/reporting",
    exact: true,
    name: "Reporting",
    icon: BiPieChartAlt2,
    comingSoon: true,
    bottom: false,
  },
  {
    path: "/users",
    exact: true,
    name: "Users",
    icon: FiUsers,
    comingSoon: true,
    bottom: false,
  },
];

const Routes2: Array<RouteI> = [
  {
    path: "/support",
    exact: true,
    name: "Support",
    icon: CgSupport,
    comingSoon: true,
    bottom: true,
  },
  {
    path: "/settings",
    exact: true,
    name: "Settings",
    icon: HiOutlineCog,
    comingSoon: true,
    bottom: true,
  },
];


export { Routes, Routes2 };
