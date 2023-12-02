import { Container } from "semantic-ui-react";
import EventDashBoard from "../../features/events/dashboard/EventDashBoard.tsx";
import NavBar from "./NavBar.tsx";
import { useState } from "react";
import { AppEvent } from "../types/events.tsx";



function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null); //liftup the hook 

  function handleSelectedEvent(event: AppEvent | null) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen}  />
      <Container className="main">
        <EventDashBoard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedEvent={selectedEvent}
          handleSelectedEvent={handleSelectedEvent}
        />
      </Container>
    </>
  );
}

export default App;
