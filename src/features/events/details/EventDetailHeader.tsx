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

function EventDetailHeader() {
  const styledEventImage = {
    filter: "brightness(30%)"
  }

  const styledEventText ={
    position: 'absolute',
    bottom: "5%",
    left: '5%',
    width: '100%',
    height: "auto",
    color: "White"
  }

  return (
    <SegmentGroup>
      <Segment basic attached="top" styled={{ padding: "0" }}>
        <Image src={`/public/categoryImages/drinks.jpg`} fluid style={styledEventImage}/>
        <Segment basic style={styledEventText}>
          <ItemGroup>
            <Item>
              <ItemContent>
                <Header
                  size="huge"
                  content="Event Title"
                  style={{ color: "White" }}
                />
                <p>Event Date</p>
                <p>
                  Hosted by <strong>Bod</strong>
                </p>
              </ItemContent>
            </Item>
          </ItemGroup>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>
        <Button color="orange" floated="right" as={Link} to={`/manage/abc`}>
          Manage Event
        </Button>
      </Segment>
    </SegmentGroup>
  );
}

export default EventDetailHeader;
