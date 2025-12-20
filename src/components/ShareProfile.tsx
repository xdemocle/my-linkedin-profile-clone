import {
  CheckIcon,
  CopyIcon,
  LinkedInLogoIcon,
  Share1Icon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useTranslations } from "use-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ShareProfileProps {
  profileUrl: string;
  profileName?: string;
  children: React.ReactNode;
}

export function ShareProfile({
  profileUrl,
  profileName,
  children,
}: ShareProfileProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations();

  const defaultProfileName = t("Common.shareProfileName");
  const finalProfileName = profileName || defaultProfileName;

  const shareText = t("ShareProfile.shareText", {
    profileName: finalProfileName,
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      console.log("Profile link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("Failed to copy link");
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(
      profileUrl,
    )}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: finalProfileName,
          text: shareText,
          url: profileUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? (
            <CheckIcon className="h-4 w-4 mr-2 text-green-600" />
          ) : (
            <CopyIcon className="h-4 w-4 mr-2" />
          )}
          {t(copied ? "ShareProfile.copied" : "ShareProfile.copyLink")}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLinkedInShare}>
          <LinkedInLogoIcon className="h-4 w-4 mr-2" />
          {t("ShareProfile.shareOnLinkedIn")}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleTwitterShare}>
          <TwitterLogoIcon className="h-4 w-4 mr-2" />
          {t("ShareProfile.shareOnTwitter")}
        </DropdownMenuItem>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNativeShare}>
              <Share1Icon className="h-4 w-4 mr-2" />
              {t("ShareProfile.moreOptions")}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
