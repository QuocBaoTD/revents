import { Container } from "semantic-ui-react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import ModalManager from "../common/modal/ModalManager.tsx";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <ModalManager />
          <NavBar />
          <Container className="main">
            {location.pathname === "/" ? <HomePage /> : <Outlet />}
          </Container>
        </>
      )}
    </>
  );
}

export default App;
