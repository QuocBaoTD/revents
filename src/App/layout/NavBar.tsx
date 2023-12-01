import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

type Props = {
  setFormOpen: (value: boolean) => void;

};

export default function NavBar({ setFormOpen }: Props) {
  return (
    <div>
      <Menu fixed="top">
        <Container>
          <MenuItem header={true} style={{ color: "white" }}>
            <img src="logo.png" alt="logo" />
            Revents
          </MenuItem>
          <MenuItem name="re-events">
            <Button
              floated="right"
              positive={true}
              inverted={true}
              content="Create event"
              onClick={() => setFormOpen(true)}
            />
          </MenuItem>
          <MenuItem position="right">
            <Button basic inverted content="Login" />
            <Button
              basic
              inverted
              content="Register"
              style={{ marginLeft: "0.5em" }}
            />
          </MenuItem>
        </Container>
      </Menu>
    </div>
  );
}
