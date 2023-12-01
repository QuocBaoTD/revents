import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../App/types/events";

type Props = {
  event: AppEvent;
};

export default function EventListItem({ event }: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={event.hostPhotoURL}
              alt={event.hostedBy}
            />
            <ItemContent>
              <Item.Header>{event.title}</Item.Header>
              <ItemDescription>Hosted by {event.hostedBy}</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" />
          {event.date}
          <Icon name="marker" />
          {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee attendee={attendee} key={attendee.id} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{event.description}</span>
        <Button color="teal" floated="right" content="view" />
      </Segment>
    </SegmentGroup>
  );
}
