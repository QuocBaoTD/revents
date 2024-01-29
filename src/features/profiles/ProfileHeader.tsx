import {
  Button,
  Divider,
  Grid,
  GridColumn,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../App/types/profile";
// import { useFirestore } from "../../App/hooks/firestore/useFirestore";
import { auth, db } from "../../App/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/store/store";
import { actions } from "./profileSlice";
import { toast } from "react-toastify";
import { batchFollowToggle } from "../../App/actions/firestoreAction";

type Props = {
  profile: Profile;
};

function ProfileHeader({ profile }: Props) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  // const { update } = useFirestore("profiles");
  // const { set: setFollower, remove: removeFollwer } = useFirestore(
  //   `profiles/${profile.id}/followers`
  // );
  // const { set: setFollowing, remove: removeFollwing } = useFirestore(
  //   `profiles/${auth.currentUser?.uid}/following`
  // );

  useEffect(
    function () {
      const docRef = doc(
        db,
        `profiles/${profile.id}/followers/${auth.currentUser?.uid}`
      );
      getDoc(docRef).then((docSnap) => {
        dispatch(
          actions.setFollowing({
            id: profile.id,
            isFollowing: docSnap.exists(),
          })
        );
      });
    },
    [dispatch, profile.id]
  );

  async function handleFollowToggle(follow: boolean) {
    if (!profile.id || !auth.currentUser?.uid) return;
    setLoading(true);
    try {
      await batchFollowToggle(profile, follow);
      dispatch(
        //upload action to check follow
        actions.setFollowing({
          id: profile.id,
          isFollowing: follow,
        })
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    // if (follow) {
    //   await update(auth.currentUser.uid, {
    //     followingCount: increment(1),
    //   });
    //   await update(profile.id, {
    //     followerCount: increment(1),
    //   });
    //   await setFollower(auth.currentUser.uid, {
    //     displayName: auth.currentUser.displayName,
    //     photoURL: auth.currentUser.photoURL,
    //   });
    //   await setFollowing(profile.id, {
    //     displayName: profile.displayName,
    //     photoURL: profile.photoURL,
    //   });
    // } else {
    //   await update(auth.currentUser.uid, {
    //     followingCount: increment(-1),
    //   });
    //   await update(profile.id, {
    //     followerCount: increment(-1),
    //   });
    //   await removeFollwer(auth.currentUser.uid);
    //   await removeFollwing(profile.id);
    // }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.photoURL || "/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>

        <GridColumn width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={profile.followerCount || 0} />
            <Statistic label="Following" value={profile.followingCount || 0} />
          </Statistic.Group>
        
          {currentUser?.uid !== profile.id && ( //check if the current user can not see the following to follow themselves
            <>
              <Divider />

              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color="teal"
                    content={
                      profile.isFollowing ? "Following" : "Not Following"
                    }
                  />
                </Reveal.Content>

                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    basic
                    fluid
                    color={profile.isFollowing ? "red" : "green"}
                    content={profile.isFollowing ? "Unfollow" : "Follow"}
                    loading={loading}
                    onClick={() => handleFollowToggle(!profile.isFollowing)}
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </GridColumn>
      </Grid>
    </Segment>
  );
}

export default ProfileHeader;
