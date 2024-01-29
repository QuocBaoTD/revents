import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Profile } from "../types/profile";
import { CollectionOptions } from "../hooks/firestore/types";
import { getQuery } from "../hooks/firestore/getQuery";
import { Attendee } from "../types/events";

export async function batchFollowToggle(profile: Profile, follow: boolean) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw Error("Must be logged in to do this");

  const followRef = collection(db, `profiles/${profile.id}/followers`);
  const followingRef = collection(db, `profiles/${currentUser.uid}/following`);
  const followerProfileRef = doc(db, `profiles/${currentUser.uid}`);
  const followingProfileRef = doc(db, `profiles/${profile.id}`);

  const batch = writeBatch(db);

  if (follow) {
    batch.update(followerProfileRef, {
      followingCount: increment(1),
    });
    batch.update(followingProfileRef, {
      followerCount: increment(1),
    });
    batch.set(doc(followRef, currentUser.uid), {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    });
    batch.set(doc(followingRef, profile.id), {
      displayName: profile.displayName,
      photoURL: profile.photoURL,
    });
  } else {
    batch.update(followerProfileRef, { followingCount: increment(-1) });
    batch.update(followingProfileRef, { followerCount: increment(-1) });
    batch.delete(doc(followRef, currentUser.uid));
    batch.delete(doc(followingRef, profile.id));
  }
  await batch.commit();
}

export async function batchSetPhoto(photoURL: string) {
  const currentUser = auth.currentUser;
  const eventQueryOptions: CollectionOptions = {
    queries: [
      {
        attribute: "attendeeIds",
        operator: "array-contains",
        value: currentUser?.uid as string,
      },
      { attribute: "date", operator: ">=", value: new Date() },
    ],
  };
  const profileDocRef = doc(db, "profiles", currentUser?.uid as string);
  const eventDocQuery = getQuery("events", eventQueryOptions);
  const followingQuery = getQuery(`profiles/${currentUser?.uid}/following`) //get data following to update the avatar
  const batch = writeBatch(db);

  try {
    batch.update(profileDocRef, {
      photoURL: photoURL,
    });
    
    const eventQuerySnap = await getDocs(eventDocQuery);
    eventQuerySnap.docs.forEach((eventDoc) => {
      if (eventDoc.data().hostUid === currentUser?.uid) {
        batch.update(eventDoc.ref, {
          hostPhotoURL: photoURL,
        });
      }
      batch.update(eventDoc.ref, {
        attendees: eventDoc.data().attendees.filter((attendee: Attendee) => {
          if (attendee.id === currentUser?.uid) {
            attendee.photoURL = photoURL;
          }
          return attendee;
        }),
      });
    });
    //get query of following and update the avatar in follower
    const followingQuerySnap = await getDocs(followingQuery)
    followingQuerySnap.docs.forEach((followDoc) => {
      const currentFollowDocRef = doc(db,`profiles/${followDoc.id}/followers`, currentUser?.uid as string);
      batch.update(currentFollowDocRef, {
        photoURL
      });
    })

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}
