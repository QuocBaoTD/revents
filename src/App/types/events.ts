export type AppEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  city: string;
  category: string;
  venue: string;
  hostUid: string; //update
  hostedBy: string;
  hostPhotoURL: string;
  isCancelled: boolean;
  attendees: Attendee[];
  attendeeIds: string[]; //update
  isHost?: boolean; //update to check host
  isGoing?: boolean; //update to check attendee
};

export type Attendee = {
  id: string;
  displayName: string;
  photoURL: string;
};

export type ChatComment = {
  id: string;
  displayName: string;
  photoURL: string;
  uid: string;
  text: string;
  date: number;
  parentId: string | null; //update
  childNodes: ChatComment[];//update
};
