import { Link } from "react-router-dom";
import {
  Button,
  Header,
  Image,
  Item,
  ItemContent,
  ItemGroup,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { AppEvent } from "../../../App/types/events";

type Props = {
  event: AppEvent;
};

function EventDetailHeader({ event }: Props) {
  const styledEventImage = {
    filter: "brightness(30%)",
  };

  const styledEventText = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "White",
  };

  return (
    <SegmentGroup>
      <Segment basic attached="top" styled={{ padding: "0" }}>
        <Image
          src={`/categoryImages/${event.category}.jpg`}
          fluid
          style={styledEventImage}
        />
        <Segment basic style={styledEventText}>
          <ItemGroup>
            <Item>
              <ItemContent>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "White" }}
                />
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </ItemContent>
            </Item>
          </ItemGroup>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>
        <Button color="orange" floated="right" as={Link} to={`/manage/${event.id}`}>
          Manage Event
        </Button>
      </Segment>
    </SegmentGroup>
  );
}

export default EventDetailHeader;
