import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../../form/EventForm";
import { sampleData } from "../../../App/api/sampleDate";
import { useEffect, useState } from "react";
import { AppEvent } from "../../../App/types/events";

type Props = {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
};

function EventDashBoard({ formOpen, setFormOpen }: Props) {
  const[events, setEvents] = useState<AppEvent[]>([])

  useEffect(function(){
    setEvents(sampleData)
  },[])


  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} />
      </GridColumn>
      <GridColumn width={6}>
        {formOpen && <EventForm setFormOpen={setFormOpen} />}
      </GridColumn>
    </Grid>
  );
}

export default EventDashBoard;
