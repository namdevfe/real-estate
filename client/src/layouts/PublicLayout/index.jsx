import { Outlet } from "react-router-dom";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
