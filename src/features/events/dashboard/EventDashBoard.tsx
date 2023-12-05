import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import { sampleData } from "../../../App/api/sampleDate";
import { useEffect, useState } from "react";
import { AppEvent } from "../../../App/types/events";


function EventDashBoard() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(function () {
    setEvents(sampleData);
  }, []);

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events}/>
      </GridColumn>
      <GridColumn width={6}>
        <h2>Filters</h2>
      </GridColumn>
    </Grid>
  );
}

export default EventDashBoard;
