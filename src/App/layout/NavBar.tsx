import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignOutButton from "./nav/SignOutButton";
import SignInMenu from "./nav/SignInMenu";
import { useState } from "react";

export default function NavBar() {
  const [auth, setAuth] = useState(false);

  return (
    <div>
      <Menu fixed="top">
        <Container>
          <MenuItem
            header={true}
            style={{ color: "white" }}
            as={NavLink}
            to="/"
          >
            <img src="/logo.png" alt="logo" />
            Revents
          </MenuItem>

          <MenuItem
            style={{ color: "white" }}
            name="Events"
            as={NavLink}
            to="/events"
          />
          <MenuItem
            name="Scratch"
            as={NavLink}
            to="/scratch"
            style={{ color: "white" }}
          />
          <MenuItem name="re-events">
            <Button
              as={NavLink}
              to="/createEvent"
              floated="right"
              positive={true}
              inverted={true}
              content="Create event"
            />
          </MenuItem>
          {auth ? (
            <SignInMenu setAuth={setAuth} />
          ) : (
            <SignOutButton setAuth={setAuth} />
          )}
        </Container>
      </Menu>
    </div>
  );
}
