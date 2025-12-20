import { ProfileInterests } from "./ProfileInterests";
import { ProfileLanguages } from "./ProfileLanguages";

export function ProfileSidebar() {
  return (
    <>
      {/* Languages */}
      <ProfileLanguages />

      {/* Interests */}
      <ProfileInterests />
    </>
  );
}
