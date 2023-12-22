import { Form, Label } from "semantic-ui-react";
import ModalWrapper from "../../App/common/modal/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../App/store/store";
import { closeModal } from "../../App/common/modal/modalSlice";
import { Button, FormInput } from "semantic-ui-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../App/config/firebase";
import { useFirestore } from "../../App/hooks/firestore/useFirestore";
import { Timestamp } from "firebase/firestore";

//https://regexlib.com/Search.aspx?k=email to take validation email

function RegisterForm() {
  const { set } = useFirestore("profiles");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCreds.user, {
        displayName: data.displayName,
      });
      //Adding new user in database.
      await set(userCreds.user.uid, {
        displayName: data.displayName,
        email: data.email,
        createdAt: Timestamp.now(),
      });
      dispatch(closeModal());
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      });
    }
  }

  return (
    <ModalWrapper header="Register to re-revents">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          defaultValue=""
          placeholder="Display Name"
          {...register("displayName", { required: true })}
          error={errors.displayName && "displayName is required"}
        />

        <FormInput
          defaultValue=""
          placeholder="Email address"
          {...register("email", {
            required: true,
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          })}
          error={
            (errors.email?.type === "required" && "Email is required") ||
            (errors.email?.type === "pattern" && "Email is invalid")
          }
        />

        <FormInput
          type="password"
          defaultValue=""
          placeholder="Password"
          {...register("password", { required: true })}
          error={errors.password && "Password is required"}
        />

        {errors.root && (
          <Label
            basic
            color="red"
            style={{ display: "block", marginBottom: 10 }}
            content={errors.root.serverError.message}
          />
        )}
        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Register"
        />
      </Form>
    </ModalWrapper>
  );
}

export default RegisterForm;
