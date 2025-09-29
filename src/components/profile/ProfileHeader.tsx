// import { Pencil1Icon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export function ProfileHeader() {
  return (
    <div className='bg-card rounded-md overflow-hidden shadow-xs border'>
      {/* Cover Photo */}
      <div className='h-32 md:h-48 bg-muted relative'>
        <img
          src='https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop'
          alt='Cover'
          className='w-full h-full object-cover'
        />
        {/* <Button
          variant='ghost'
          size='icon'
          className='absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90'
        >
          <Pencil1Icon className='h-4 w-4' />
        </Button> */}
      </div>

      {/* Profile Info */}
      <div className='p-6 relative'>
        {/* Avatar - positioned to overlap the cover photo */}
        <Avatar className='w-24 h-24 border-4 border-background absolute -top-12 left-6'>
          <AvatarImage src='https://github.com/shadcn.png' alt='Rocco Russo' />
          <AvatarFallback>RR</AvatarFallback>
        </Avatar>

        <div className='ml-32 pt-2'>
          <div className='flex justify-between items-start'>
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl font-bold'>Rocco Russo</h1>
                <div className='flex items-center gap-1'>
                  <span className='text-muted-foreground'>🟢</span>
                  <span className='text-xs text-muted-foreground'>EMEA</span>
                </div>
              </div>
              <p className='text-muted-foreground leading-tight mt-1'>
                Full-stack Engineer specializing in frontend architecture and blockchain integrations | Tech Leadership | Web3 | React, React-Router, Preact, Next.js, Typescript, Tailwind, IPFS, Ether, EVM, Wagmi, Viem | I fix vibe code
              </p>
              <div className='flex items-center gap-2 mt-2 text-sm'>
                <span className='text-muted-foreground'>Málaga, Andalusia, Spain</span>
                <span className='text-muted-foreground'>•</span>
                <a href='#' className='text-primary hover:underline font-medium'>
                  Contact info
                </a>
              </div>
              <div className='mt-2'>
                <a href='#' className='text-primary hover:underline text-sm font-medium flex items-center gap-1'>
                  My website
                  <svg className='w-3 h-3' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='m7 7 10 10-5 0 0-5'/>
                    <path d='m17 7-5 0 0 5'/>
                  </svg>
                </a>
              </div>
              <div className='flex items-center gap-4 mt-2 text-sm'>
                <span className='text-primary font-medium'>5,984 followers</span>
                <span className='text-muted-foreground'>•</span>
                <a href='#' className='text-primary hover:underline font-medium'>
                  500+ connections
                </a>
              </div>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <div className='flex items-center gap-2 text-sm'>
                <div className='w-6 h-6 bg-black rounded-full flex items-center justify-center'>
                  <span className='text-white text-xs'>⚡</span>
                </div>
                <span className='font-medium'>Stealth AI Startup</span>
              </div>
            </div>
          </div>

          <div className='flex gap-2 mt-6'>
            <Button className='bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6'>
              Open to
            </Button>
            <Button variant='outline' className='rounded-full px-6'>
              Add profile section
            </Button>
            <Button variant='outline' className='rounded-full px-6'>
              Enhance profile
            </Button>
            <Button variant='outline' className='rounded-full px-4'>
              Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
