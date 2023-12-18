import { Grid, GridColumn } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfor from "./EventDetailInfor";
import EventDetailChat from "./EventDetailChat";
import EventDetailSideBar from "./EventDetailSideBar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../App/store/store";
import { useEffect } from "react";
import { actions } from "../eventSlice";
import Spinner from "../../../App/layout/Spinner";
import { useFirestore } from "../../../App/hooks/firestore/useFirestore";

export default function EventDetailPage() {
  const { id } = useParams();
  const { loadDocument } = useFirestore("events");
  const { status } = useAppSelector((state) => state.events);
  const event = useAppSelector((state) =>
    state.events.data.find((event) => event.id === id)
  );

  useEffect(
    function () {
      if (!id) return;
      loadDocument(id, actions);
    },

    [id, loadDocument]
  ); 

  if (!event) return <h2>Event Not Found</h2>;
  if (status === "loading") return <Spinner />;

  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfor event={event} />
        <EventDetailChat />
      </GridColumn>
      <GridColumn width={6}>
        <EventDetailSideBar />
      </GridColumn>
    </Grid>
  );
}
