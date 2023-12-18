import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormField, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../App/store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOption";
import { AppEvent } from "../../../App/types/events";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFirestore } from "../../../App/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "../eventSlice";
import Spinner from "../../../App/layout/Spinner";

import "react-datepicker/dist/react-datepicker.min.css";
import DatePicker from "react-datepicker";

export default function EventForm() {
  const { loadDocument, create, update } = useFirestore("events");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    //Tell react form upload the data event.
    defaultValues: async () => {
      if (event) return { ...event, date: new Date(event.date) };
    },
  });

  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.data.find((event) => event.id === id)
  );
  const { status } = useAppSelector((state) => state.events);

  const navigate = useNavigate();

  //using loadDocument to read the change of signle document.
  useEffect(
    function () {
      if (!id) return;
      loadDocument(id, actions);
    },
    [id, loadDocument]
  );
  //using update function in useFireStore hook
  async function updateEvent(data: AppEvent) {
    if (!event) return;
    await update(data.id, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
  }
  //using create function in useFireStore hook
  async function createEvent(data: FieldValues) {
    const ref = await create({
      ...data,
      hostedBy: "bod",
      attendees: [],
      hostPhotoURL: "",
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
    return ref;
  }
  //create function cancelEvent
  async function handleCancelToggle(event: AppEvent) {
    await update(event.id, {
      isCancelled: !event.isCancelled,
    });
    toast.success(
      `Event has been ${event.isCancelled ? "uncancelled" : "cancelled"}`
    );
  }

  async function onSubmit(data: FieldValues) {
    try {
      if (event) {
        await updateEvent({ ...event, ...data });
        navigate(`/events/${event.id}`);
      } else {
        const ref = await createEvent(data);
        navigate(`/events/${ref?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  }

  if (status === "loading") return <Spinner />;

  return (
    <Segment clearing>
      <Header content="Event details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          placeholder="Event Title"
          defaultValue={event?.title || ""}
          {...register("title", { required: true })}
          error={errors.title && "Title is required"}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          defaultValue={event?.category}
          render={({ field }) => (
            <Form.Select
              options={categoryOptions}
              placeholder="Category"
              clearable
              {...field}
              onChange={(_, d) =>
                setValue("category", d.value, { shouldValidate: true })
              }
              error={errors.category && errors.category.message}
            />
          )}
        />

        <Form.TextArea
          placeholder="Description"
          defaultValue={event?.description || ""}
          {...register("description", { required: "Description is required" })}
          error={errors.description && errors.description.message}
        />

        <Header sub content="location detail" color="teal" />

        <Form.Input
          placeholder="City"
          defaultValue={event?.city || ""}
          {...register("city", { required: "City is required" })}
          error={errors.city && errors.city.message}
        />

        <Form.Input
          placeholder="Venue"
          defaultValue={event?.venue || ""}
          {...register("venue", { required: "Venue is required" })}
          error={errors.venue && errors.venue.message}
        />

        <FormField>
          <Controller
            name="date" // Datepicker
            control={control}
            rules={{ required: "Date is required" }}
            defaultValue={(event && new Date(event.date)) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue("date", value, { shouldValidate: true })
                }
                showTimeSelect
                timeCaption="time"
                dateFormat="MM. dd. yyyy. hh:mm aa"
                placeholderText="Event date and time"
              />
            )}
          />
        </FormField>

        {event && (
          <Button
            type="button"
            floated="left"
            color={event.isCancelled ? "green" : "red"}
            onClick={() => handleCancelToggle(event)}
            content={event.isCancelled ? "Reactivate event" : "Cancel event"}
          />
        )}

        <Button
          type="submit"
          floated="right"
          positive
          content="Submit"
          disabled={!isValid}
          loading={isSubmitting}
        />
        <Button
          loading={isSubmitting}
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
