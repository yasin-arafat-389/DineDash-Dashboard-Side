import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import SideDrawer from "../Components/DashboardNav/SideDrawer";
import SideBar from "../Components/DashboardNav/SideBar";
import { Outlet } from "react-router-dom";
import ProfileMenu from "../Components/DashboardNav/ProfileMenu";

const DashboardLayout = () => {
  let { user } = useContext(authContext);

  return (
    <div className=" pt-4">
      <div className=" w-[90%] mx-auto  ">
        {/* Top Banner */}
        <div
          className="flex items-center justify-center bg-green-400 text-white px-6 py-3.5 rounded 
          font-[sans-serif] mb-4 pt gap-12"
        >
          <p className="text-base">
            Welcome to your Dashboard{" "}
            <span className="font-bold ml-1">{user?.displayName}</span>
          </p>

          <ProfileMenu />

          <div className="block md:block lg:hidden cursor-pointer">
            <SideDrawer />
          </div>
        </div>

        <div className="flex gap-5 ">
          <SideBar />
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
