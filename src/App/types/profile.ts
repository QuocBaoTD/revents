export type Profile = {
  id: string;
  photoURL: string | null;
  displayName: string | null;
  createdAt: string;
  description: string;
  followerCount?: number; //update
  followingCount?: number; //update
  isFollowing: boolean; //update
};

export type Photo = {
  id: string;
  name: string;
  url: string;
};

export type Follow = {
  id: string;
  displayName:string;
  photoURL: string;
}