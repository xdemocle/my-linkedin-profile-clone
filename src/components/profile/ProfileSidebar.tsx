import { ProfileFooter } from './ProfileFooter';
import { ProfileInterests } from './ProfileInterests';
import { ProfileLanguages } from './ProfileLanguages';
import { ProfileLanguageUrl } from './ProfileLanguageUrl';

export function ProfileSidebar() {
  return (
    <div className="space-y-5 md:space-y-10">
      {/* Profile Language & URL */}
      <ProfileLanguageUrl />

      {/* Languages */}
      <ProfileLanguages />

      {/* Interests */}
      <ProfileInterests />

      {/* Footer Links */}
      <ProfileFooter />
    </div>
  );
}
