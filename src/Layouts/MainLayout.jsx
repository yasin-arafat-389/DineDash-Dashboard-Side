import { Outlet } from "react-router-dom";
import ScrollToTop from "../Utilities/ScrollToTop/ScrollToTop";
import { NavbarMain } from "../Components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <NavbarMain />
      <ScrollToTop />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
