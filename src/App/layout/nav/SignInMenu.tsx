import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, Image, MenuItem } from "semantic-ui-react";

type Props = {
  setAuth: (value: boolean) => void;
};

function SignInMenu({ setAuth }: Props) {
  const navigate = useNavigate();

  function handleSignOut() {
    setAuth(false);
    navigate("/");
  }

  return (
    <MenuItem position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text="Bod">
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
