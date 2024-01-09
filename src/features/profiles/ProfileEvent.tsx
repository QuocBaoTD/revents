import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../App/types/profile";
import { useFirestore } from "../../App/hooks/firestore/useFirestore";
import { useAppSelector } from "../../App/store/store";
import { CollectionOptions } from "../../App/hooks/firestore/types";
import { actions } from "../events/eventSlice";
import { format } from "date-fns";

type Props = {
  profile: Profile;
};

function ProfileEvent({ profile }: Props) {
  const { loadCollection } = useFirestore("events");
  const { data: events, status } = useAppSelector((state) => state.events);

  const intialOption: CollectionOptions = {
    queries: [
      {
        attribute: "attendeeIds",
        operator: "array-contains",
        value: profile.id,
      },
      { attribute: "date", operator: ">=", value: new Date() },
    ],
    sort: { attribute: "date", order: "asc" },
  };

  const [options, setOptions] = useState<CollectionOptions>(intialOption);

  function handleSetQueries(tab: number) {
    let options: CollectionOptions = {} as CollectionOptions;

    switch (tab) {
      case 1: //past events
        options.queries = [
          {
            attribute: "attendeeIds",
            operator: "array-contains",
            value: profile.id,
          },
          { attribute: "date", operator: "<", value: new Date() },
        ];
        options.sort = { attribute: "date", order: "desc" };
        break;
      case 2: // hosted
        options.queries = [
          {
            attribute: "hostUid",
            operator: "==",
            value: profile.id,
          },
        ];
        options.sort = { attribute: "date", order: "asc" };
        break;
      default:
        options = intialOption;
        break;
    }
    setOptions(options);
  }

  useEffect(
    function () {
      loadCollection(actions, options);
    },
    [loadCollection, options]
  );

  const panes = [
    {
      menuItem: "Future events",
      pane: { key: "future" },
    },
    {
      menuItem: "Past events",
      pane: { key: "past" },
    },
    {
      menuItem: "Hosting",
      pane: { key: "hosting" },
    },
  ];


  return (
    <Tab.Pane loading={status === "loading"}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="events" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(_e, data) => handleSetQueries(data.activeIndex as number)} // add the function hanlde event for button
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={4} style={{ marginTop: 10 }}>
            {events.map((event) => (
              <Card as={Link} to="/" key={event.id}>
                <Image
                  src={`/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign="center" />
                  <Card.Meta textAlign="center">
                    <span>{format(new Date(event.date), "dd/ MM/ yyyy, h:mm a")}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default ProfileEvent;
