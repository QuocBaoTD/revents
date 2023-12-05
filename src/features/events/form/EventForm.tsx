import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
// import { createId } from "@paralleldrive/cuid2";

export default function EventForm() {
  const initialValues = {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

  function onSubmit() {
    console.log(values);
    /*
    selectedEvent
      ? onUpdateEvent({ ...selectedEvent, ...values }) // check selectedEvent if have event so we can update if not we need to create new event.
      : // crypto.randomUUID() use to create random id
        onAddNewEvent({
          ...values,
          id: createId(),
          hostedBy: "bod",
          attendees: [],
          hostPhotoURL: "",
        });
    setValues(initialValues);
    setFormOpen(false);
    */
  }

  function handleInPutChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <Segment clearing>
      <Header content={"Create Event"} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event Title"
            name="title"
            value={values.title}
            onChange={(e) => handleInPutChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={values.category}
            onChange={(e) => handleInPutChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={(e) => handleInPutChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={values.city}
            onChange={(e) => handleInPutChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            name="venue"
            value={values.venue}
            onChange={(e) => handleInPutChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={values.date}
            onChange={(e) => handleInPutChange(e)}
          />
        </Form.Field>

        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="button"
          floated="right"
          content="Cancel"
          as={Link}
          to="/events"
        />
      </Form>
    </Segment>
  );
}
