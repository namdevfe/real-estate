import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Modal from "~/components/Modal";
import PrivateRoute from "~/components/PrivateRoute";
import { ROLES } from "~/constants/general";
import AdminLayout from "~/layouts/AdminLayout";
import CreatePropertyTypePage from "~/pages/admin/CreatePropertyTypePage";
import DashBoardPage from "~/pages/admin/DashBoardPage";
import ManagePropertyTypePage from "~/pages/admin/ManagePropertyTypePage";
import AboutPage from "~/pages/public/AboutPage";
import BlogPage from "~/pages/public/BlogPage";
import ContactPage from "~/pages/public/ContactPage";
import GalleryPage from "~/pages/public/GalleryPage";
import NotFoundPage from "~/pages/public/NotFoundPage";
import OurAgentsPage from "~/pages/public/OurAgentsPage";
import PropertiesPage from "~/pages/public/PropertiesPage";
import SearchPage from "~/pages/public/SearchPage";
import ProfilePage from "~/pages/user/ProfilePage";
import useAppStore from "~/store/useAppStore";
import useAuthStore from "~/store/useAuthStore";
import { PATHS } from "./constants/path";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/public/HomePage";

function App() {
  const isShowModal = useAppStore((state) => state.isShowModal);
  const { getRoles, getProfile, token } = useAuthStore();

  useEffect(() => {
    if (token?.accessToken) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      {isShowModal && <Modal />}
      <Routes>
        {/* Public routes */}
        <Route path={PATHS.HOME} element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.ABOUT_US} element={<AboutPage />} />
          <Route path={PATHS.OUR_AGENTS} element={<OurAgentsPage />} />
          <Route path={PATHS.PROPERTIES} element={<PropertiesPage />} />
          <Route path={PATHS.GALLERY} element={<GalleryPage />} />
          <Route path={PATHS.BLOG} element={<BlogPage />} />
          <Route path={PATHS.CONTACT_US} element={<ContactPage />} />
          <Route path={PATHS.SEARCH} element={<SearchPage />} />

          {/* Public private routes */}
          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.PROFILE} element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route
          element={
            <PrivateRoute redirectPath={PATHS.HOME} roles={[ROLES.ADMIN]} />
          }
        >
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
        </Route>

        {/* Not found */}
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
