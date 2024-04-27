import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/public/HomePage";
import { PATHS } from "./constants/path";
import NotFoundPage from "./pages/public/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path={PATHS.HOME} element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
