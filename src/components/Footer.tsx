import { LINKEDIN_PROFILE_URL, WEBSITE_ROCCOME_URL } from "@/constants";
import { useApp } from "@/hooks";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import React from "react";
import { useTranslations } from "use-intl";
import { LinkTranslated } from "./LinkTranslated";
import { Card, CardContent } from "./ui/card";

export function Footer() {
  const tFooter = useTranslations("Footer");
  const { navLinks } = useApp();

  return (
    <Card className="shadow-xs mt-10">
      <CardContent>
        <div className="flex lg:flex-row flex-col justify-center lg:justify-between space-y-5 lg:space-y-0 text-muted-foreground text-xs">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center lg:justify-between gap-2 text-center">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <span>•</span>}
                <LinkTranslated href={link.href} className="hover:text-primary">
                  {link.label}
                </LinkTranslated>
              </React.Fragment>
            ))}
          </div>

          {/* External Links */}
          <div className="flex flex-wrap justify-center lg:justify-between gap-2 pt-2 md:pt-0 border-t md:border-t-0">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary"
            >
              {tFooter("linkedinProfile")}
              <ExternalLinkIcon className="size-3" />
            </a>
            <span>•</span>
            <a
              href={WEBSITE_ROCCOME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary"
            >
              {tFooter("personalWebsite")}
              <ExternalLinkIcon className="size-3" />
            </a>
            <span>•</span>
            {/* Copyright */}
            <p>{tFooter("copyright", { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
