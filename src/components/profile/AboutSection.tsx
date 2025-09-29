import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function AboutSection() {
  return (
    <Card className='mt-4 shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>About</CardTitle>
        <Button variant='ghost' size='sm'>
          <Pencil1Icon className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent>
        <p className='text-foreground leading-relaxed'>
          Full stack developer with experience in JavaScript, TypeScript, and React. Passionate about creating intuitive
          user experiences and optimizing web performance. Specialized in modern frontend frameworks and design systems.
        </p>
        <p className='mt-2 text-foreground leading-relaxed'>
          Currently working as a freelance developer helping businesses build responsive and accessible web
          applications. Skilled in UI/UX design principles and implementing complex interactive interfaces.
        </p>
      </CardContent>
    </Card>
  );
}
