import { AboutSection } from './AboutSection';
import { ExperienceSection } from './ExperienceSection';
import { ProfileHeader } from './ProfileHeader';
import { ProjectsSection } from './ProjectsSection';
import { RecommendationsSection } from './RecommendationsSection';
import { SkillsSection } from './SkillsSection';

export function ProfileMainContent() {
  return (
    <div className='space-y-4'>
      <ProfileHeader />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <RecommendationsSection />
    </div>
  );
}
