import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppDispatch, useAppSelector } from "../../../App/store/store";
import { useCallback, useEffect, useState } from "react";

import { actions } from "../eventSlice";
import { useFirestore } from "../../../App/hooks/firestore/useFirestore";
import EventFilter from "./EventFilter";
import { QueryOptions } from "../../../App/hooks/firestore/types";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EmptyState from "../../../App/layout/nav/EmptyState";

function EventDashBoard() {
  const dispatch = useAppDispatch();
  const {
    data: events,
    status,
    loadedInitial,
  } = useAppSelector((state) => state.events);
  const { loadCollection, hasMore } = useFirestore("events");
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: "date", operator: ">=", value: new Date() }, //using useState to pass properties in QueryOptions
  ]);
  //handle the loadEvent by using useCallBack hook reason for that we do not want this fucntion in useEffect re-render unstoppable and get out of the free bite of firebase.
  const loadEvent = useCallback(
    (reset?: boolean) => {
      loadCollection(actions, {
        queries: query, //update the event is alway happen in the future
        limit: 2,
        sort: { attribute: "date", order: "asc" },
        pagination: true,
        reset,
        get: true, //using get property to activate the getting data of loadCollection
      });
    },
    [loadCollection, query]
  );
  //use useEffect hook to track the change of the function use call back hook
  useEffect(
    function () {
      loadEvent(true);
      //refresh the data by using reset.
      return () => {
        dispatch(actions.reset());
      };
    },
    [dispatch, loadEvent]
  );
  //implement the function to add into the button
  function loadMore() {
    loadEvent();
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {!loadedInitial ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <>
            {events.length === 0 ? (
              <EmptyState />
            ) : (
              <EventList
                events={events}
                hasMore={hasMore.current}
                loadMore={loadMore}
                loading={status === "loading"} //pass the boolean to check loading
              />
            )}
            {/* <Button
              disabled={!hasMore.current} //it is the ref so we use current
              content="Load more"
              color="green"
              onClick={loadMore} //adding the function in button
              loading={status === "loading"}
            /> */}
          </>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <div
          className="ui fixed top sticky" //adding stick for the filter event
          style={{ top: 98, width: 405, zIndex: 1 }}
        >
          <EventFilter setQuery={setQuery} />
        </div>
      </Grid.Column>
    </Grid>
  );
}

export default EventDashBoard;
