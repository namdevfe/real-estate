import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/public/HomePage";
import { PATHS } from "./constants/path";
import NotFoundPage from "~/pages/public/NotFoundPage";
import AboutPage from "~/pages/public/AboutPage";
import OurAgentsPage from "~/pages/public/OurAgentsPage";
import PropertiesPage from "~/pages/public/PropertiesPage";
import GalleryPage from "~/pages/public/GalleryPage";
import BlogPage from "~/pages/public/BlogPage";
import ContactPage from "~/pages/public/ContactPage";
import SearchPage from "~/pages/public/SearchPage";
import Modal from "~/components/Modal";
import useAppStore from "~/store/useAppStore";
import useAuthStore from "~/store/useAuthStore";
import { useEffect } from "react";
import AdminLayout from "~/layouts/AdminLayout";
import DashBoardPage from "~/pages/admin/DashBoardPage";
import CreatePropertyTypePage from "~/pages/admin/CreatePropertyTypePage";
import ManagePropertyTypePage from "~/pages/admin/ManagePropertyTypePage";

function App() {
  const isShowModal = useAppStore((state) => state.isShowModal);
  const getRoles = useAuthStore((state) => state.getRoles);

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      {isShowModal && <Modal />}
      <Routes>
        {/* Public */}
        <Route path={PATHS.HOME} element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.ABOUT_US} element={<AboutPage />} />
          <Route path={PATHS.OUR_AGENTS} element={<OurAgentsPage />} />
          <Route path={PATHS.PROPERTIES} element={<PropertiesPage />} />
          <Route path={PATHS.GALLERY} element={<GalleryPage />} />
          <Route path={PATHS.BLOG} element={<BlogPage />} />
          <Route path={PATHS.CONTACT_US} element={<ContactPage />} />
          <Route path={PATHS.SEARCH} element={<SearchPage />} />
          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        </Route>

        {/* Admin */}
        <Route path={PATHS.DASHBOARD} element={<AdminLayout />}>
          <Route index element={<DashBoardPage />} />
          <Route
            path={PATHS.CREATE_PROPERTY_TYPE}
            element={<CreatePropertyTypePage />}
          />
          <Route
            path={PATHS.MANAGE_PROPERTY_TYPE}
            element={<ManagePropertyTypePage />}
          />

          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
