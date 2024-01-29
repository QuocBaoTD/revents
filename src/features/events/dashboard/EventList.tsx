import InfiniteScroll from "react-infinite-scroller";
import { AppEvent } from "../../../App/types/events";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
};

export default function EventList({
  events,
  hasMore,
  loadMore,
  loading,
}: Props) {
  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && hasMore}
          initialLoad={false}
        >
          {events.map((event) => (
            <EventListItem event={event} key={event.id} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
