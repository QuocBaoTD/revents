import { Image, List } from "semantic-ui-react";
import { Attendee } from "../../../App/types/events";

type Props = {
  attendee: Attendee;
};

export default function EventListAttendee({ attendee }: Props) {
  return (
    <List.Item>
      <Image size="mini" circular src={attendee.photoURL} alt={attendee.name} />
    </List.Item>
  );
}
