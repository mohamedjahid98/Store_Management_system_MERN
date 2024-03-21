import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";

function App() {
  const { pathname } = useLocation();
  const ID = localStorage.getItem('ID');


  return (
    <>
      {/* Conditionally render the Navbar */}
      {!(pathname === '/sign-in' || pathname === '/sign-up') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )}

      {/* Define routes */}
      <Routes>
        {/* Map over routes and render corresponding components */}
        {routes.map(({ path, element }, key) =>
          element && <Route key={key} exact path={path} element={element} />
        )}
        {/* Redirect to "/home" if no matching route is found */}
        <Route path="" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-up" element={<Navigate to="/sign-up" replace />} />
         </Routes>
    </>
  );
}

export default App;
