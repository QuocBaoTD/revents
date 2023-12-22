import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useFirestore } from "../../App/hooks/firestore/useFirestore";
import { useAppDispatch } from "../../App/store/store";
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../App/config/firebase";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { closeModal } from "../../App/common/modal/modalSlice";

function SocialLogin() {
  //create useState include data and loading set null and false.
  const [status, setStatus] = useState<any>({
    loading: false,
    provider: null,
  });
  const { set } = useFirestore("profiles");
  const dispatch = useAppDispatch();
  //create function loginthirdside pass a parameter.
  async function handleSocialLogin(selectedProvider: string) {
    setStatus({
      loading: true,
      provider: selectedProvider,
    });
    let provider: AuthProvider;
    //check which one third side to sign-in
    if (selectedProvider === "github") {
      provider = new GithubAuthProvider();
    } else if (selectedProvider === "google") {
      provider = new GoogleAuthProvider();
    } else return;
    //checked => result => pop up result
    try {
      if (provider) {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        //check the user is new or old and implement data of that user.
        if (
          result.user.metadata.creationTime ===
          result.user.metadata.lastSignInTime
        ) {
          await set(result.user.uid, {
            displayName: result.user.displayName,
            email: result.user.email,
            createdAt: Timestamp.now(),
            photoURL: result.user.photoURL,
          });
        }
        dispatch(closeModal());
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStatus({ loading: false, provider: null });
    }
  }

  return (
    <>
      <Button
        type="button"
        fluid
        color="black"
        style={{ marginBottom: 10 }}
        loading={status.loading && status.provider === "github"}
        onClick={() => handleSocialLogin("github")}
      >
        <Icon name="github" />
        Login with Github
      </Button>

      <Button
        type="button"
        fluid
        color="google plus"
        style={{ marginBottom: 10 }}
        loading={status.loading && status.provider === "google"}
        onClick={() => handleSocialLogin("google")}
      >
        <Icon name="google" />
        Login with Google
      </Button>
    </>
  );
}

export default SocialLogin;
