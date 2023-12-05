import { Grid, GridColumn } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfor from "./EventDetailInfor";
import EventDetailChat from "./EventDetailChat";
import EventDetailSideBar from "./EventDetailSideBar";

export default function EventDetailPage() {
  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailHeader />
        <EventDetailInfor />
        <EventDetailChat />
      </GridColumn>
      <GridColumn width={6}>
        <EventDetailSideBar />
      </GridColumn>
    </Grid>
  );
}
