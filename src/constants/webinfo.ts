export const WEBSITE_URL = "https://linkedin-roccorusso.work";

export const WEBSITE_ROCCOME_URL = "https://rocco.me";

export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/roccorusso";

// /blog/2026-07-18-why-i-shut-down-linkedin — explains why the LinkedIn
// profile was shut down. Used in the sidebar "Public profile & URL" row
// and the footer LinkedIn link.
export const LINKEDIN_SHUTDOWN_BLOG_URL =
  "https://rocco.me/blog/2026-07-18-why-i-shut-down-linkedin";

export const SUBSTACK_PROFILE_URL = "https://xdemocle.substack.com";

export const CALENDLY_PROFILE_URL = "https://calendly.com/rocco-russo";

export const TELEGRAM_PROFILE_URL = "https://t.me/xdemocle";

export const WELLFOUNDED_PROFILE_URL = "https://wellfound.com/u/rocco-russo";

export const GITHUB_PROFILE_URL = "https://github.com/xdemocle";

export const X_PROFILE_URL = "https://x.com/xdemocle";

export const HUGGING_FACE_PROFILE_URL = "https://huggingface.co/xdemocle";

export const CV_REQUEST_URL =
  "mailto:hello@rocco.me?subject=New+CV+request+from+website";

export const EMAIL_ADDRESS = "hello@rocco.me";
export const LINKEDIN_LABEL = "LinkedIn";
export const SUBSTACK_LABEL = "Substack";
export const CALENDLY_LABEL = "Calendar";
export const TELEGRAM_LABEL = "Telegram";
export const WELLFOUNDED_LABEL = "Wellfound";
export const GITHUB_LABEL = "GitHub";
export const X_LABEL = "X";
export const HUGGING_FACE_LABEL = "Hugging Face";
export const CV_REQUEST_LABEL = "CV";
export const EMAIL_LABEL = "Email";

export const SOCIAL_LINKS: { href: string; label: string }[] = [
  // LinkedIn entry removed on 2026-07-18: the profile was shut down
  // (see https://rocco.me/blog/2026-07-18-why-i-shut-down-linkedin).
  // Re-add here only if/when a new LinkedIn profile exists.
  {
    href: SUBSTACK_PROFILE_URL,
    label: SUBSTACK_LABEL,
  },
  {
    href: CALENDLY_PROFILE_URL,
    label: CALENDLY_LABEL,
  },
  {
    href: TELEGRAM_PROFILE_URL,
    label: TELEGRAM_LABEL,
  },
  {
    href: WELLFOUNDED_PROFILE_URL,
    label: WELLFOUNDED_LABEL,
  },
  {
    href: GITHUB_PROFILE_URL,
    label: GITHUB_LABEL,
  },
  {
    href: X_PROFILE_URL,
    label: X_LABEL,
  },
  {
    href: HUGGING_FACE_PROFILE_URL,
    label: HUGGING_FACE_LABEL,
  },
];
