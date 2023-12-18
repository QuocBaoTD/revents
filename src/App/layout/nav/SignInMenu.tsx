import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, Image, MenuItem } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { SignOut } from "../../../features/auth/authSlice";

function SignInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSignOut() {
    dispatch(SignOut());
    navigate("/");
  }

  return (
    <MenuItem position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text={currentUser?.email}>
        <Dropdown.Menu>
          <DropdownItem
            as={Link}
            to="/createEvent"
            text="Create event"
            icon="plus"
          />
          <DropdownItem text="My profile" icon="user" />
          <DropdownItem onClick={handleSignOut} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </MenuItem>
  );
}
export default SignInMenu;
