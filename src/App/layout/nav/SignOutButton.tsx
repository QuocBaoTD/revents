import { Button, MenuItem } from "semantic-ui-react";

type Props = {
  setAuth: (value: boolean) => void;
};

function SignOutButton({ setAuth }: Props) {
  return (
    <MenuItem position="right">
      <Button basic inverted content="Login" onClick={() => setAuth(true)} />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </MenuItem>
  );
}

export default SignOutButton;
