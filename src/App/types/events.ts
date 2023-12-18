export type AppEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  city: string;
  category: string;
  venue: string;
  hostedBy: string;
  hostPhotoURL: string;
  isCancelled: boolean;
  attendees: Attendee[];
};

export type Attendee = {
  id: string;
  name: string;
  photoURL: string;
};
