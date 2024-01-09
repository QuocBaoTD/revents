import { Item, ItemGroup, Label, Segment } from "semantic-ui-react";
import { AppEvent } from "../../../App/types/events";
import { Link } from "react-router-dom";

type Props = {
  event: AppEvent;
};

function EventDetailSideBar({ event }: Props) {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      > 
      {event?.attendees?.length} People Going
      </Segment>
      <Segment attached>
        <ItemGroup relaxed divided>
          {event.attendees.map((attendee) => ( // check how many user attent the event.
            <Item style={{ position: "relative" }} key={attendee.id}>
              {event.hostUid === attendee.id && ( // check who is the host
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >Host</Label>
              )}

              <Item.Image size="tiny" src={attendee.photoURL || "/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as={Link} to={`/profiles/${attendee.id}`}>
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </ItemGroup>
      </Segment>
    </>
  );
}

export default EventDetailSideBar;
