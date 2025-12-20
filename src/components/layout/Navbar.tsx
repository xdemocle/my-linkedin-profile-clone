import { useApp } from "@/hooks";
import { cn } from "@/lib";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import { LinkTranslated } from "../LinkTranslated";
import { Logo } from "../Logo";
import { MobileDrawer } from "../MobileDrawer";
import { Button } from "../ui/button";
import { LanguageSwitcher } from "../ui/language-switcher";
import { ScrollProgress } from "../ui/scroll-progress";
import { ThemeToggle } from "../ui/theme-toggle";
import { Search } from "./Search";

export function Navbar() {
  const { isSearchOpen, isMobile, isMenuOpen, setIsMenuOpen, navLinks } =
    useApp();
  // const { personal } = useProfileData();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b bg-card/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center z-0 my-1.5 md:my-0">
        {/* Logo */}
        <LinkTranslated href="/">
          <Logo />
        </LinkTranslated>

        {/* Search */}
        <Search />

        {/* Navigation */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navLinks.map((link) => (
            <Button
              variant="ghost"
              size="icon"
              key={`${link.href}-${link.label}`}
              className="rounded-none size-12 w-20 py-7 hidden md:flex flex-col gap-1 group"
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
              isMobile && isSearchOpen ? "hidden" : "",
            )}
          >
            <Separator
              orientation="vertical"
              className="w-[1px] h-4 mx-2 bg-foreground hidden md:block"
            />

            <ThemeToggle />

            <LanguageSwitcher />

            <MobileDrawer
              onOpenChangeHandler={handleMenuClick}
              navLinks={navLinks}
            >
              <Button
                variant="ghost"
                size="icon"
                className="flex md:hidden"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <Cross1Icon className="size-5.5" />
                ) : (
                  <HamburgerMenuIcon className="size-5.5" />
                )}
              </Button>
            </MobileDrawer>

            {/* <Button variant="ghost" size="icon" aria-label="User menu">
              <Avatar className="size-5.5">
                <AvatarImage src={personal.avatar} alt="User" />
                <AvatarFallback>RR</AvatarFallback>
              </Avatar>
            </Button> */}
          </div>
        </nav>
      </div>

      {/* Scroll progress indicator */}
      <ScrollProgress
        color="var(--ring)"
        height={2}
        className="z-1 top-full absolute"
      />
    </header>
  );
}
