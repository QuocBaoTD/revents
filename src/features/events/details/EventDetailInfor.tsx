import {
  Button,
  Grid,
  GridColumn,
  Icon,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { AppEvent } from "../../../App/types/events";
import { format } from "date-fns";

type Props = {
  event: AppEvent;
};

function EventDetailInfor({ event }: Props) {
  return (
    <SegmentGroup>
      <Segment attached="top">
        <Grid>
          <GridColumn width={1}>
            <Icon color="teal" name="info" size="large" />
          </GridColumn>
          <GridColumn width={15}>
            <p>{event.description}</p>
          </GridColumn>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(new Date(event.date), "dd/ MM/ yyyy, h:mm a")}</span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color="teal" size="tiny" content="Show Map" />
          </Grid.Column>
        </Grid>
      </Segment>
    </SegmentGroup>
  );
}

export default EventDetailInfor;
