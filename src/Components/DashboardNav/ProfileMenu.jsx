import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { authContext } from "../../Contexts/AuthContext";

const ProfileMenu = () => {
  let { user, logOut } = useContext(authContext);

  let navigate = useNavigate();

  let handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
        toast.success(`Successfully Logged Out!!`, {
          style: {
            border: "2px solid green",
            padding: "8px",
            color: "#713200",
          },
          iconTheme: {
            primary: "green",
            secondary: "#FFFAEE",
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let goToProfile = () => {
    navigate("/dashboard/my-profile");
  };

  const profileMenuItems = [
    {
      label: "Profile",
      icon: <AiOutlineUser fontSize={"20px"} />,
      action: goToProfile,
    },
    {
      label: "Sign Out",
      icon: <AiOutlinePoweroff fontSize={"20px"} />,
      action: handleLogOut,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto outline-none"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={
                user?.photoURL
                  ? user?.photoURL
                  : "https://i.ibb.co/HN9NtYY/user.png"
              }
            />
            <BsChevronDown
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>

        <MenuList className="p-1 overflow-hidden">
          {profileMenuItems.map((item, index) => (
            <MenuItem key={index} onClick={item.action}>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  easings: ["easeInOut"],
                  delay: index * 0.2,
                }}
                className="flex items-center gap-4 text-[15px] font-bold"
              >
                <span>{item.icon}</span>
                {item.label}
              </motion.div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
