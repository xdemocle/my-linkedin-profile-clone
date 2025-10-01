import { CheckIcon, CopyIcon, LinkedInLogoIcon, Share1Icon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
// Using simple console.log instead of toast for now

interface ShareProfileProps {
  profileUrl?: string;
  profileName?: string;
  className?: string;
}

export function ShareProfile({ profileUrl, profileName = "Rocco Russo's Profile", className }: ShareProfileProps) {
  if (!profileUrl && typeof window !== 'undefined') {
    profileUrl = window.location.href;
  } else {
    profileUrl = 'https://rocco.me';
  }

  const t = useTranslations('Common');
  const [copied, setCopied] = useState(false);

  const shareText = `Check out ${profileName} - Full-stack Engineer specializing in frontend architecture and blockchain integrations`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      console.log('Profile link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      alert('Failed to copy link');
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(
      profileUrl
    )}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profileName,
          text: shareText,
          url: profileUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share1Icon className="h-4 w-4 mr-2" />
          {t('share')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? <CheckIcon className="h-4 w-4 mr-2 text-green-600" /> : <CopyIcon className="h-4 w-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy link'}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLinkedInShare}>
          <LinkedInLogoIcon className="h-4 w-4 mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleTwitterShare}>
          <TwitterLogoIcon className="h-4 w-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>

        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNativeShare}>
              <Share1Icon className="h-4 w-4 mr-2" />
              More options
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
