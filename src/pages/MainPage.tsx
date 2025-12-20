import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { AboutSection } from "../components/profile/AboutSection";
import { ExperienceSection } from "../components/profile/ExperienceSection";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileSidebar } from "../components/profile/ProfileSidebar";
import { ProjectsSection } from "../components/profile/ProjectsSection";
import { RecommendationsSection } from "../components/profile/RecommendationsSection";
import { SkillsSection } from "../components/profile/SkillsSection";

export function MainPage() {
  return (
    <PageLayout addToSidebar={<ProfileSidebar />}>
      <SEO type="profile" path="" />
      <StructuredData type="person" />
      <ProfileHeader />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <RecommendationsSection />
    </PageLayout>
  );
}
