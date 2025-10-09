import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useTranslations } from 'use-intl';
import type { NavigationalProps } from 'wouter';
import { LinkTranslated } from './LinkTranslated';

interface MobileDrawerProps {
  children: React.ReactNode;
  onOpenChangeHandler: (open: boolean) => void;
  navLinks: ({ href: string; label: string } & NavigationalProps)[];
}

export function MobileDrawer({ children, onOpenChangeHandler, navLinks }: MobileDrawerProps) {
  const t = useTranslations('Navigation');

  return (
    <Drawer onOpenChange={onOpenChangeHandler}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-3 px-4">
          {navLinks.map(link => (
            <Button
              key={link.href}
              onClick={() => onOpenChangeHandler(false)}
              asChild
              variant="outline"
              className="hover:bg-primary!"
            >
              <LinkTranslated href={link.href}>{link.label}</LinkTranslated>
            </Button>
          ))}
        </div>

        <DrawerFooter>
          <hr />
          <DrawerClose>
            <Button variant="outline" asChild>
              <span>{t('close')}</span>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
