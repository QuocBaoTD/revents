import { FieldValues, useForm } from "react-hook-form";
import { useFirestore } from "../../App/hooks/firestore/useFirestore";
import { Profile } from "../../App/types/profile";
import { updateProfile } from "firebase/auth";
import { Button, Form } from "semantic-ui-react";
import { auth } from "../../App/config/firebase";

type Props = {
  profile: Profile;
  // eslint-disable-next-line no-unused-vars
  setEditMode: (value: boolean) => void;
};

function ProfileForm({ profile, setEditMode }: Props) {
  const { update } = useFirestore("profiles");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      displayName: profile.displayName,
      description: profile.description,
    },
  });

  async function onSubmit(data: FieldValues) {
    await update(profile.id, data);

    if (profile.displayName !== data.displayName) {
      await updateProfile(auth.currentUser!, {
        displayName: data.displayName,
      });
    }
    setEditMode(false);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        placeholder="Display name"
        {...register("displayName", { required: true })}
        error={errors.displayName && "Display name is required"}
      />

      <Form.TextArea
        placeholder="Tell us about yourself"
        {...register("description")}
      />
      <Button
        loading={isSubmitting}
        disabled={isSubmitting || !isValid || !isDirty}
        floated="right"
        type="submit"
        size="large"
        positive
        content="Update profile"
      />
    </Form>
  );
}

export default ProfileForm;
