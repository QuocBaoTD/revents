import { Tab } from "semantic-ui-react";
import ProfileAbout from "./ProfileAbout";
import { Profile } from "../../App/types/profile";
import ProfilePhoto from "./ProfilePhoto";
import ProfileEvent from "./ProfileEvent";

type Props = {
  profile: Profile;
};

function ProfileContent({ profile }: Props) {
  const panes = [
    {
      menuItem: "About",
      render: () => <ProfileAbout profile={profile} />,
    },
    {
      menuItem: "Photos",
      render: () => <ProfilePhoto profile={profile} />,
    },
    {
      menuItem: "Events",
      render: () => <ProfileEvent profile={profile}/>,
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following</Tab.Pane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}

export default ProfileContent;
