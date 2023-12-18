import { Form } from "semantic-ui-react";
import ModalWrapper from "../../App/common/modal/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../App/store/store";
import { closeModal } from "../../App/common/modal/modalSlice";
import { Button, FormInput } from "semantic-ui-react";
import { SignIn } from "./authSlice";

//https://regexlib.com/Search.aspx?k=email to take validation email

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useAppDispatch();

  function onSubmit(data: FieldValues) {
    dispatch(SignIn(data));
    dispatch(closeModal());
  }

  return (
    <ModalWrapper header="Sign into re-revents">
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Login"
        />
      </Form>
    </ModalWrapper>
  );
}

export default LoginForm;
