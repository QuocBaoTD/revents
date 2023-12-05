import {
  Button,
  Grid,
  GridColumn,
  Icon,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";

function EventDetailInfor() {
  return (
    <SegmentGroup>
      <Segment attached="top">
        <Grid>
          <GridColumn width={1}>
            <Icon color="teal" name="info" size="large" />
          </GridColumn>
          <GridColumn width={15}>
            <p>Event Description</p>
          </GridColumn>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>Event Date</span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Event Venue</span>
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
