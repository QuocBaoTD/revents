import { Item, ItemGroup, Segment } from "semantic-ui-react";

function EventDetailSideBar() {
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
        2 people Going
      </Segment>
      <Segment attached>
        <ItemGroup>
          <Item style={{ position: "relative" }}>
            <Item.Image size="tiny" src="/user.png" />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <span>Tom</span>
              </Item.Header>
            </Item.Content>
          </Item>
          <Item style={{ position: "relative" }}>
            <Item.Image size="tiny" src="/user.png" />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <span>Bob</span>
              </Item.Header>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
    </>
  );
}

export default EventDetailSideBar;
