import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, Image, MenuItem } from "semantic-ui-react";
import { useAppSelector } from "../../store/store";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

function SignInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <MenuItem position="right">
      <Image avatar spaced="right" src={currentUser?.photoURL || "/user.png"} />
      <Dropdown pointing="top left" text={currentUser?.displayName as string}>
        <Dropdown.Menu>
          <DropdownItem
            as={Link}
            to="/createEvent"
            text="Create event"
            icon="plus"
          />
          <DropdownItem
            as={Link}
            to={`profiles/${currentUser?.uid}`}
            text="My profile"
            icon="user"
          />
          <DropdownItem
            as={Link}
            to="/account"
            text="My account"
            icon="setting"
          />

          <DropdownItem onClick={handleSignOut} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </MenuItem>
  );
}
export default SignInMenu;
