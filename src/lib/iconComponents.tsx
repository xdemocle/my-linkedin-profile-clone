import {
  BoxIcon,
  CircleIcon,
  CodeIcon,
  Component1Icon,
  DotFilledIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  HomeIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import type { IconKey } from "./iconUtils";

interface ProjectIconProps {
  iconKey: IconKey;
  className?: string;
}

// ProjectIcon component that renders the appropriate icon based on the key
export function ProjectIcon({
  iconKey,
  className = "h-8 w-8",
}: ProjectIconProps) {
  // Return the mapped icon if it exists
  switch (iconKey) {
    case "blue-circle":
      return (
        <div className={className}>
          <CircleIcon className="text-blue-500 h-full w-full" />
        </div>
      );
    case "lightning":
      return (
        <div className={className}>
          <LightningBoltIcon className="text-yellow-500 h-full w-full" />
        </div>
      );
    case "game":
      return (
        <div className={className}>
          <CodeIcon className="text-purple-500 h-full w-full" />
        </div>
      );
    case "building":
      return (
        <div className={className}>
          <BoxIcon className="text-cyan-500 h-full w-full" />
        </div>
      );
    case "home":
      return (
        <div className={className}>
          <HomeIcon className="text-green-500 h-full w-full" />
        </div>
      );
    case "mail":
      return (
        <div className={className}>
          <EnvelopeClosedIcon className="text-blue-400 h-full w-full" />
        </div>
      );
    case "github":
      return (
        <div className={className}>
          <GitHubLogoIcon className="text-gray-700 h-full w-full" />
        </div>
      );
    case "code":
      return (
        <div className={className}>
          <CodeIcon className="text-indigo-500 h-full w-full" />
        </div>
      );
    default:
      return (
        <div className={className}>
          <Component1Icon className="h-full w-full" />
        </div>
      );
  }
}

// Component wrapper for project icon
export function ProjectIconWrapper({
  iconKey,
  className = "h-8 w-8",
}: {
  iconKey: string;
  className?: string;
}) {
  return <ProjectIcon iconKey={iconKey} className={className} />;
}

// Status indicator icons
export function OnlineStatusIcon({
  className = "h-3 w-3 text-green-500",
}: {
  className?: string;
}) {
  return <DotFilledIcon className={className} />;
}

export function StealthStartupIcon({
  className = "h-4 w-4 text-white",
}: {
  className?: string;
}) {
  return <LightningBoltIcon className={className} />;
}
