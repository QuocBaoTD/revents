import { Container } from "semantic-ui-react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import ModalManager from "../common/modal/ModalManager.tsx";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.ts";
import { useAppDispatch } from "../store/store.ts";
import { SignIn, logOut } from "../../features/auth/authSlice.ts";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      onAuthStateChanged(auth, {
        next: (user) => {
          if (user) {
            dispatch(SignIn(user));
          } else {
            dispatch(logOut());
          }
        },
        error: (error) => console.log(error),
        complete: () => {},
      });
    },
    [dispatch]
  );

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
