import { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../App/store/store";
import { createId } from "@paralleldrive/cuid2";
import { createEvent, updateEvent } from "../eventSlice";

export default function EventForm() {
  let { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((event) => event.id === id)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = event ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

  function onSubmit() {
    id = id ?? createId();

    event
      ? dispatch(updateEvent({ ...event, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id,
            hostedBy: "bod",
            attendees: [],
            hostPhotoURL: "",
          })
        );
    navigate(`/events/${id}`);
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
      <Header content={event ? "Update Event" : "Create Event"} />
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
