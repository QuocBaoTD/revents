import { Grid, GridColumn } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../App/store/store";
import { useFirestore } from "../../App/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "./profileSlice";
import Spinner from "../../App/layout/Spinner";

function ProfilePage() {
  const { id } = useParams();
  const { status, data } = useAppSelector((state) => state.profiles);
  const { loadDocument } = useFirestore("profiles");
  const profile = data.find((x) => x.id === id);

  useEffect(
    function () {
      if (id) loadDocument(id, actions);
    },
    [id, loadDocument]
  );

  if (status === "loading") return <Spinner content="Loading profile..." />;

  if (!profile) return <h2>Not found</h2>;

  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </GridColumn>
    </Grid>
  );
}

export default ProfilePage;
