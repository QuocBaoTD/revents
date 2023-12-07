import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../App/store/store";

function EventDashBoard() {
  const { events } = useAppSelector((state) => state.events);

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Filters</h2>
      </GridColumn>
    </Grid>
  );
}

export default EventDashBoard;
