import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useAppSelector } from "../../../App/store/store";
import { useState } from "react";
import { useFirestore } from "../../../App/hooks/firestore/useFirestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { format } from "date-fns";

type Props = {
  event: AppEvent;
};

function EventDetailHeader({ event }: Props) {
  const styledEventImage = {
    filter: "brightness(30%)",
  };

  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { update } = useFirestore("events");
  const navigate = useNavigate();
  const location = useLocation()

  const styledEventText = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "White",
  };
  //adding join and remove attendance
  async function toggleAttendance() {
    if (!currentUser) return navigate("/unauthorised", {state: {from: location.pathname}}) //leading the user to unauthorizaed page
    setLoading(true);

    if (event.isGoing) {
      const attendee = event.attendees.find((x) => x.id === currentUser.uid);
      await update(event.id, {
        attendees: arrayRemove(attendee),
        attendeeIds: arrayRemove(currentUser.uid),
      });
      setLoading(false);
    } else {
      await update(event.id, {
        attendees: arrayUnion({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        attendeeIds: arrayUnion(currentUser.uid),
      });
      setLoading(false);
    }
  }

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
                <p>{format(new Date(event.date), "dd/ MM/ yyyy, h:mm a")}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </ItemContent>
            </Item>
          </ItemGroup>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {event.isHost ? ( //check the host is host so render the button
          <Button
            color="orange"
            floated="right"
            as={Link}
            to={`/manage/${event.id}`}
          >
            Manage Event
          </Button>
        ) : (
          <Button //if not so it is attendee we can use isGoing
            content={event.isGoing ? "Cancel my place" : "JOIN THIS EVENT"}
            color={event.isGoing ? "grey" : "teal"}
            onClick={toggleAttendance} //adding feature attendence
            loading={loading}
          />
        )}
      </Segment>
    </SegmentGroup>
  );
}

export default EventDetailHeader;
