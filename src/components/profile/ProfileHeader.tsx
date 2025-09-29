import { Pencil1Icon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export function ProfileHeader() {
  return (
    <div className='bg-card rounded-md overflow-hidden shadow-sm'>
      {/* Cover Photo */}
      <div className='h-32 md:h-48 bg-muted relative'>
        <img
          src='https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop'
          alt='Cover'
          className='w-full h-full object-cover'
        />
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90'
        >
          <Pencil1Icon className='h-4 w-4' />
        </Button>
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
            <div>
              <h1 className='text-2xl font-bold'>Rocco Russo</h1>
              <p className='text-muted-foreground'>Full Stack Frontend Web Developer</p>
              <div className='flex items-center gap-2 mt-1 text-sm'>
                <span>Milano, Italia</span>
                <span className='text-muted-foreground'>•</span>
                <a href='#' className='text-primary hover:underline'>
                  500+ connections
                </a>
                <span className='text-muted-foreground'>•</span>
                <a href='#' className='text-primary hover:underline'>
                  Contact info
                </a>
              </div>
            </div>
            <Button variant='ghost' size='sm'>
              <Pencil1Icon className='h-4 w-4 mr-2' />
              Edit profile
            </Button>
          </div>

          <div className='flex gap-2 mt-4'>
            <Button className='bg-primary text-primary-foreground hover:bg-primary/90'>Connect</Button>
            <Button variant='outline'>Message</Button>
            <Button variant='outline'>More</Button>
          </div>

          <div className='mt-4 bg-muted/50 rounded-lg p-3'>
            <h3 className='font-medium'>Open to work</h3>
            <p className='text-sm text-muted-foreground'>Frontend Developer, UI Designer, and Web Developer roles</p>
            <a href='#' className='text-sm text-primary hover:underline'>
              See all details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
