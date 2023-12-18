import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../App/store/store";
import { useEffect } from "react";

import { actions } from "../eventSlice";
import Spinner from "../../../App/layout/Spinner";
import { useFirestore } from "../../../App/hooks/firestore/useFirestore";

function EventDashBoard() {
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFirestore("events");
  useEffect(
    function () {
      loadCollection(actions);
    },
    [loadCollection]
  );

  if (status === "loading") return <Spinner />;

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
