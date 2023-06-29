import { Button } from "antd";
import { FC } from "react";
import { BsBell, BsLightningCharge } from "react-icons/bs";
import { HiOutlineCog } from "react-icons/hi";
import userAvatar from "@/assets/user_avatar.png";

interface IProps {
  toggle: () => void;
}

/**
 * @author traj3ctory
 * @function @Header
 **/

const Header: FC<IProps> = ({ toggle }) => {
  return (
    <header className="header">
      <nav className="">
        <Button size="large" icon={<BsLightningCharge />}>Upgrade now</Button>

        <span className="icon">
          <HiOutlineCog />
        </span>
        <span className="icon">
          <BsBell />
        </span>
        <img
          src={userAvatar}
          alt="user_profile_img"
          className="img_fluid rounded-circle"
          width={30}
        />
      </nav>
    </header>
  );
};

export default Header;
