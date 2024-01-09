import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  Label,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../App/types/events";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../App/store/store";
import Spinner from "../../../App/layout/Spinner";
import { format } from "date-fns";

type Props = {
  event: AppEvent;
};

export default function EventListItem({ event }: Props) {
  const { status } = useAppSelector((state) => state.events);

  if (status === "loading") return <Spinner />;

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

              {event.isCancelled && (
                <Label
                  style={{ top: "-40px" }}
                  ribbon="right"
                  color="red"
                  content="This event has been cancelled"
                /> //announce event is cancelled
              )}
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" />
          {format(new Date(event.date), "dd/ MM/ yyyy, h:mm a")}
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
        <Button
          color="teal"
          floated="right"
          content="view"
          as={Link}
          to={`/events/${event.id}`}
        />
      </Segment>
    </SegmentGroup>
  );
}
