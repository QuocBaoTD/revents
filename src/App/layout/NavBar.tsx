import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignOutButton from "./nav/SignOutButton";
import SignInMenu from "./nav/SignInMenu";
import { useAppSelector } from "../store/store";

export default function NavBar() {
  const { authenticated } = useAppSelector((state) => state.auth);
  /*
  function seedData() {
    sampleData.forEach(async (event) => {
      const { id, ...rest } = event;
      await setDoc(doc(db, "events", id), {
        ...rest,
      });
    });
  }
  */
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
          {/* {import.meta.env.DEV && (<MenuItem>
           <Button 
            inverted={true}
            color="teal"
            content='Seed Data'
            onClick={seedData}
           />
          </MenuItem>)} */}
          {authenticated ? <SignInMenu /> : <SignOutButton />}
        </Container>
      </Menu>
    </div>
  );
}
