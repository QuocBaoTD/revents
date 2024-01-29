import { Divider, Form, Label } from "semantic-ui-react";
import ModalWrapper from "../../App/common/modal/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../App/store/store";
import { closeModal } from "../../App/common/modal/modalSlice";
import { Button, FormInput } from "semantic-ui-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App/config/firebase";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";

//https://regexlib.com/Search.aspx?k=email to take validation email

function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const { data: location } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(closeModal());
      navigate(location.from); //to get to the page which previous access for the user not login before.
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message, //handle error
      });
    }
  }

  return (
    <ModalWrapper header="Sign into re-revents" size="tiny">
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
          content="Login"
        />

        <Divider horizontal>Or</Divider>
        <SocialLogin />
      </Form>
    </ModalWrapper>
  );
}

export default LoginForm;
