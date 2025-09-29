// No edit icons needed - read-only mode
import { useTranslations } from 'use-intl';
import { OnlineStatusIcon, StealthStartupIcon } from '../../utils/iconComponents';
import { ShareProfile } from '../ShareProfile';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export function ProfileHeader() {
  const t = useTranslations('ProfileHeader');

  return (
    <div className='bg-card rounded-md overflow-hidden shadow-xs border'>
      {/* Cover Photo */}
      <div className='h-32 md:h-48 bg-muted relative'>
        <img
          src='https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop'
          alt='Cover'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Profile Info */}
      <div className='p-6 relative'>
        {/* Avatar - positioned to overlap the cover photo */}
        <Avatar className='w-44 h-44 border-4 border-background absolute -top-24 left-6 shadow-xl'>
          <AvatarImage src='/assets/png/rocco-me-nft.png' alt='Rocco Russo' />
          <AvatarFallback>RR</AvatarFallback>
        </Avatar>

        <div className='ml-48 pt-2'>
          <div className='flex justify-between items-start'>
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl font-bold'>Rocco Russo</h1>
                <div className='flex items-center gap-1'>
                  <OnlineStatusIcon className='text-green-500 h-3 w-3' />
                  <span className='text-xs text-muted-foreground'>EMEA</span>
                </div>
              </div>
              <p className='text-muted-foreground leading-tight mt-1'>{t('fullStackEngineer')}</p>
              <div className='flex items-center gap-2 mt-2 text-sm'>
                <span className='text-muted-foreground'>{t('location')}</span>
                <span className='text-muted-foreground'>•</span>
                <a href='#' className='text-primary hover:underline font-medium'>
                  {t('contactInfo')}
                </a>
              </div>
              <div className='mt-2'>
                <a href='#' className='text-primary hover:underline text-sm font-medium flex items-center gap-1'>
                  {t('myWebsite')}
                  <svg
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='m7 7 10 10-5 0 0-5' />
                    <path d='m17 7-5 0 0 5' />
                  </svg>
                </a>
              </div>
              <div className='flex items-center gap-4 mt-2 text-sm'>
                <span className='text-primary font-medium'>5,984 {t('followers')}</span>
                <span className='text-muted-foreground'>•</span>
                <a href='#' className='text-primary hover:underline font-medium'>
                  500+ {t('connections')}
                </a>
              </div>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <div className='flex items-center gap-2 text-sm'>
                <div className='w-6 h-6 bg-black rounded-full flex items-center justify-center'>
                  <StealthStartupIcon />
                </div>
                <span className='font-medium'>{t('stealthStartup')}</span>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap gap-2 mt-6'>
            <Button className='bg-primary text-white hover:bg-blue-700 rounded-full px-6'>{t('openToWork')}</Button>

            <Button variant='outline' className='rounded-full px-4'>
              {t('resources')}
            </Button>

            <ShareProfile className='rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
}
