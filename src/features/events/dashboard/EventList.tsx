import { AppEvent } from "../../../App/types/events";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
};

export default function EventList({ events }: Props) {
  return (
    <>
      {events.map((event) => (
        <EventListItem event={event} key={event.id} />
      ))}
    </>
  );
}
