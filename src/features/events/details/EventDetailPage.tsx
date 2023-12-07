import { Grid, GridColumn } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfor from "./EventDetailInfor";
import EventDetailChat from "./EventDetailChat";
import EventDetailSideBar from "./EventDetailSideBar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../App/store/store";

export default function EventDetailPage() {
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((event) => event.id === id)
  );

  if(!event) return <h2>Event Not Found</h2>

  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailHeader event={event}/>
        <EventDetailInfor event={event}/>
        <EventDetailChat />
      </GridColumn>
      <GridColumn width={6}>
        <EventDetailSideBar />
      </GridColumn>
    </Grid>
  );
}
