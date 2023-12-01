import { Container } from "semantic-ui-react";
import EventDashBoard from "../../features/events/dashboard/EventDashBoard.tsx";
import NavBar from "./NavBar.tsx";
import { useState } from "react";

function App() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <NavBar setFormOpen={setFormOpen}/>
      <Container className="main">
        <EventDashBoard formOpen={formOpen} setFormOpen={setFormOpen}/>
      </Container>
    </>
  );
}

export default App;
