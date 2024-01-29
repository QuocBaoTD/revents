import { useEffect, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Photo, Profile } from "../../App/types/profile";
import { auth, storage } from "../../App/config/firebase";
import PhotoUpload from "./PhotoUpload";
import { useAppSelector } from "../../App/store/store";
import { useFirestore } from "../../App/hooks/firestore/useFirestore";
import { actions } from "./photoSlice";
import { updateProfile } from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { batchSetPhoto } from "../../App/actions/firestoreAction";

type Props = {
  profile: Profile;
};

function ProfilePhoto({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === profile.id;
  const { data: photos, status } = useAppSelector((state) => state.photos);
  const { loadCollection, remove } = useFirestore(
    `profiles/${profile.id}/photos`
  );

  // read real time  update photo
  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  async function handleSelecMain(photo: Photo) {
    await batchSetPhoto(photo.url) //use batchSetPhoto to make the image photo in profile config with image in event
  
    await updateProfile(auth.currentUser!, {
      photoURL: photo.url,
    });
  }

  async function hanleDelete(photo: Photo) {
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`);
      await deleteObject(storageRef);
      await remove(photo.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Tab.Pane loading={status === "loading"}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="photo" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add photo"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUpload profile={profile} setEditMode={setEditMode} /> //add the photo upload
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map(
                (
                  photo //already pass the photo data after read real time  update photo
                ) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group>
                        <Button
                          basic
                          color="green"
                          onClick={() => handleSelecMain(photo)}
                          disabled={photo.url === profile.photoURL}
                        >
                          Main
                        </Button>
                        <Button
                          basic
                          color="red"
                          icon="trash"
                          disabled={photo.url === profile.photoURL}
                          onClick={() => hanleDelete(photo)}
                        />
                      </Button.Group>
                    )}
                  </Card>
                )
              )}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default ProfilePhoto;
