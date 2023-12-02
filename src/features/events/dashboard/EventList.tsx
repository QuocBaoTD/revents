import { AppEvent } from "../../../App/types/events";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
  onSelectedEvent: (event: AppEvent) => void;
  onDeleteEvent: (eventId: string) => void;
};

export default function EventList({
  events,
  onSelectedEvent,
  onDeleteEvent,
}: Props) {
  return (
    <>
      {events.map((event) => (
        <EventListItem
          event={event}
          key={event.id}
          onSelectedEvent={onSelectedEvent}
          onDeleteEvent={onDeleteEvent}
        />
      ))}
    </>
  );
}
