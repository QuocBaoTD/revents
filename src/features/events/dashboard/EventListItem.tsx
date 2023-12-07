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
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../App/store/store";
import { deleteEvent } from "../eventSlice";

type Props = {
  event: AppEvent;
};

export default function EventListItem({ event }: Props) {
  const dispatch = useAppDispatch();

  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={event.hostPhotoURL || "/user.png"}
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
        <Button color="teal" floated="right" content="view"  as={Link} to={`/events/${event.id}`}/>
        <Button color="red" floated="right" content="Delete" onClick={() => dispatch(deleteEvent(event.id))}/>
      </Segment>
    </SegmentGroup>
  );
}
