import { useApp } from "@/hooks";
import { cn } from "@/lib";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import { LinkTranslated } from "../LinkTranslated";
import { Logo } from "../Logo";
import { MobileDrawer } from "../MobileDrawer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LanguageSwitcher } from "../ui/language-switcher";
import { ScrollProgress } from "../ui/scroll-progress";
import { ThemeToggle } from "../ui/theme-toggle";
import { Search } from "./Search";

export function Navbar() {
  const {
    isLayoutLarge,
    isMenuOpen,
    isMobile,
    isSearchOpen,
    navLinks,
    setIsLayoutLarge,
    setIsMenuOpen,
  } = useApp();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEnlargeLayoutClick = () => {
    setIsLayoutLarge(!isLayoutLarge);
  };

  return (
    <header className="top-0 right-0 left-0 z-50 fixed bg-card/95 shadow-xs backdrop-blur-sm border-b">
      <div className="z-0 flex items-center mx-auto my-1.5 md:my-0 px-2 sm:px-4 max-w-7xl">
        {/* Logo */}
        <LinkTranslated href="/">
          <Logo />
        </LinkTranslated>

        {/* Search */}
        <Search />

        {/* Navigation */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navLinks.map(link => (
            <Button
              variant="ghost"
              size="icon"
              key={`${link.href}-${link.label}`}
              className="group hidden md:flex flex-col gap-1 py-2 rounded-none w-20 h-auto"
              aria-label={link.label}
              asChild
            >
              <LinkTranslated href={link.href}>
                <link.icon className="size-5.5 group-hover:text-primary" />
                <span className="text-[11px] group-hover:text-primary">
                  {link.label}
                </span>
              </LinkTranslated>
            </Button>
          ))}

          <div
            className={cn(
              "flex items-center gap-1",
              isMobile && isSearchOpen ? "hidden" : ""
            )}
          >
            <Separator
              orientation="vertical"
              className="hidden md:block bg-foreground mx-2 w-px h-4"
            />

            <Button
              variant="ghost"
              size="icon"
              aria-label="Enlarge/Stretch screen"
              onClick={handleEnlargeLayoutClick}
              className="hidden lg:flex"
            >
              <Avatar className="rounded-none size-5.5">
                <AvatarImage
                  src="/assets/ui/logo-linkedin-xl.png"
                  alt="Browser Extension: Linkedin XL"
                />
                <AvatarFallback>XL</AvatarFallback>
              </Avatar>
            </Button>

            <ThemeToggle />

            <LanguageSwitcher />

            <MobileDrawer
              onOpenChangeHandler={handleMenuClick}
              navLinks={navLinks}
            >
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden flex"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <Cross1Icon className="size-5.5" />
                ) : (
                  <HamburgerMenuIcon className="size-5.5" />
                )}
              </Button>
            </MobileDrawer>
          </div>
        </nav>
      </div>

      {/* Scroll progress indicator */}
      <ScrollProgress
        color="var(--ring)"
        height={2}
        className="top-full z-1 absolute"
      />
    </header>
  );
}
