import { Header, Menu } from "semantic-ui-react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useRef, useState } from "react";
import { QueryOptions } from "../../../App/hooks/firestore/types";
import { useAppSelector } from "../../../App/store/store";

type Props = {
  // eslint-disable-next-line no-unused-vars
  setQuery: (query: QueryOptions[]) => void;
};

function EventFilter({ setQuery }: Props) {
  const startDate = useRef(new Date());
  const { currentUser } = useAppSelector((state) => state.auth);
  const [filter, setFilter] = useState("all");
  const { status } = useAppSelector((state) => state.events);

  function handleSetFilter(filter: string) {
    if (!currentUser?.uid) return;
    let q: QueryOptions[];
    switch (filter) {
      case "isGoing":
        q = [
          {
            attribute: "attendeeIds",
            operator: "array-contains",
            value: currentUser.uid,
          },
          {
            attribute: "date",
            operator: ">=",
            value: startDate.current,
          },
        ];
        break;
      case "isHost":
        q = [
          {
            attribute: "hostUid",
            operator: "==",
            value: currentUser.uid,
          },
          {
            attribute: "date",
            operator: ">=",
            value: startDate.current,
          },
        ];
        break;
      default:
        q = [
          {
            attribute: "date",
            operator: ">=",
            value: startDate.current,
          },
        ];
        break;
    }
    setFilter(filter);
    setQuery(q);
  }

  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          content="All events"
          onClick={() => handleSetFilter("all")}
          active={filter === "all"}
          disabled={status == "loading"}
        />
        <Menu.Item
          content="I'm going"
          onClick={() => handleSetFilter("isGoing")}
          active={filter === "isGoing"}
          disabled={status == "loading"}
        />
        <Menu.Item
          content="I'm hosting"
          onClick={() => handleSetFilter("isHost")}
          active={filter === "isHost"}
          disabled={status == "loading"}
        />
      </Menu>
      <Header icon="calendar" color="teal" attached content="Select Date" />
      <Calendar
        onChange={(date) => {
          startDate.current = date as Date; //handle calender filter not render
          handleSetFilter(filter);
        }}
        value={startDate.current}
      />
    </>
  );
}

export default EventFilter;
