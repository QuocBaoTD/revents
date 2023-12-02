import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../../form/EventForm";
import { sampleData } from "../../../App/api/sampleDate";
import { useEffect, useState } from "react";
import { AppEvent } from "../../../App/types/events";

type Props = {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  handleSelectedEvent: (event: AppEvent | null) => void;
  selectedEvent: AppEvent | null;
};

function EventDashBoard({
  formOpen,
  setFormOpen,
  handleSelectedEvent,
  selectedEvent,
}: Props) {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(function () {
    setEvents(sampleData);
  }, []);

  function handleAddnewEvent(event: AppEvent) {
    setEvents((events) => [...events, event]);
  }

  function handleUpdateEvent(updateEvent: AppEvent) {
    //function handleUpdateEvent
    setEvents((events) =>
      events.map((evt) => (evt.id === updateEvent.id ? updateEvent : evt))
    );
    handleSelectedEvent(null);
    setFormOpen(false);
  }

  function handleDeleteEvent(eventId: string) {
    //function delete event
    setEvents((events) => events.filter((evt) => evt.id !== eventId));
  }

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} onSelectedEvent={handleSelectedEvent} onDeleteEvent={handleDeleteEvent}/>
      </GridColumn>
      <GridColumn width={6}>
        {formOpen && (
          <EventForm
            onUpdateEvent={handleUpdateEvent}
            setFormOpen={setFormOpen}
            onAddNewEvent={handleAddnewEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : "create"} //adding key to
          />
        )}
      </GridColumn>
    </Grid>
  );
}

export default EventDashBoard;
