// This file contains icon data and utility functions
// Separated from components for better fast refresh support

import type { IconKey } from "./iconUtils";

// Map of icon keys to their descriptive names
export const iconDescriptions: Record<string, string> = {
  "blue-circle": "Blue Circle",
  lightning: "Lightning Bolt",
  game: "Game Controller",
  building: "Building",
  home: "Home",
  mail: "Mail",
  github: "GitHub",
  code: "Code",
};

// Map of project types to recommended icons
export const projectTypeIcons: Record<string, IconKey> = {
  web: "code",
  mobile: "home",
  blockchain: "lightning",
  game: "game",
  api: "mail",
  opensource: "github",
};
