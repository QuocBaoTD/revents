import { Tab } from "semantic-ui-react";
import ProfileAbout from "./ProfileAbout";
import { Profile } from "../../App/types/profile";
import ProfilePhoto from "./ProfilePhoto";
import ProfileEvent from "./ProfileEvent";
import FollowTab from "./follow/FollowTab";
import { useState } from "react";

type Props = {
  profile: Profile;
};

function ProfileContent({ profile }: Props) {
    const [activeTab, setActiveTab] = useState(0);

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
      render: () => <ProfileEvent profile={profile} />,
    },
    {
      menuItem: "Followers",
      render: () => <FollowTab profileId={profile.id} activeTab={activeTab}/>,
    },
    {
      menuItem: "Following",
      render: () => <FollowTab profileId={profile.id} activeTab={activeTab}/>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(_e, data) => setActiveTab(data.activeIndex as number)}
    />
  );
}

export default ProfileContent;
