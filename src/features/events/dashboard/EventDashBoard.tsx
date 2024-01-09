import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../App/store/store";
import { useEffect, useRef, useState } from "react";

import { actions } from "../eventSlice";
import { useFirestore } from "../../../App/hooks/firestore/useFirestore";
import EventFilter from "./EventFilter";
import { QueryOptions } from "../../../App/hooks/firestore/types";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

function EventDashBoard() {
  const contextRef = useRef(null);
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFirestore("events");
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: "date", operator: ">=", value: new Date() }, //using useState to pass properties in QueryOptions
  ]);

  useEffect(
    function () {
      loadCollection(actions, {
        queries: query, //update the event is alway happen in the future
      });
    },
    [loadCollection, query]
  );

  return (
    <Grid>
      <GridColumn width={10} ref={contextRef}>
        {status === "loading" ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <EventList events={events} />
        )}
      </GridColumn>
      <GridColumn width={6}>
        <div
          className="ui fixed top sticky" //adding stick for the filter event
          style={{ top: 98, width: 405, zIndex: 1 }}
        >
          <EventFilter setQuery={setQuery} />
        </div>
      </GridColumn>
    </Grid>
  );
}

export default EventDashBoard;
