import { IconType } from "react-icons";

interface RouteI {
  path: string;
  exact: boolean;
  name: string;
  icon: IconType;
  comingSoon: boolean;
  bottom: boolean;
  children?: ChildrenI[];
}

interface ChildrenI {
  label: string;
  path: string;
}

interface jsonArrayI {
  address: string;
  count: string;
}

export type { RouteI, jsonArrayI };

