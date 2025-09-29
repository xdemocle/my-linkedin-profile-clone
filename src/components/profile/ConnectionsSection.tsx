import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Connection {
  id: string;
  name: string;
  role: string;
  avatar: string;
  mutualConnections: number;
  status: 'connected' | 'pending';
}

const connections: Connection[] = [
  {
    id: '1',
    name: 'Alessandro Rossi',
    role: 'Senior Software Engineer at Amazon',
    avatar: 'https://github.com/shadcn.png',
    mutualConnections: 12,
    status: 'connected'
  },
  {
    id: '2',
    name: 'Marco Bianchi',
    role: 'UI Designer at Apple',
    avatar: 'https://github.com/shadcn.png',
    mutualConnections: 8,
    status: 'connected'
  },
  {
    id: '3',
    name: 'Giulia Ferrari',
    role: 'Product Manager at Google',
    avatar: 'https://github.com/shadcn.png',
    mutualConnections: 15,
    status: 'connected'
  },
  {
    id: '4',
    name: 'Luca Romano',
    role: 'Frontend Developer at Meta',
    avatar: 'https://github.com/shadcn.png',
    mutualConnections: 5,
    status: 'pending'
  },
  {
    id: '5',
    name: 'Elena Marino',
    role: 'UX Researcher at Microsoft',
    avatar: 'https://github.com/shadcn.png',
    mutualConnections: 3,
    status: 'pending'
  }
];

export function ConnectionsSection() {
  return (
    <Card className="shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Connections</CardTitle>
        {/* <Button variant="outline" size="sm">See all (500+)</Button> */
      </CardHeader>

      <Tabs defaultValue="all" className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Connections</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <span className="ml-1.5 rounded-full bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center text-xs">
                2
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {connections
                  .filter(conn => conn.status === 'connected')
                  .map(connection => (
                    <div key={connection.id} className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={connection.avatar} alt={connection.name} />
                        <AvatarFallback>{connection.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{connection.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{connection.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">{connection.mutualConnections} mutual connections</p>
                      </div>
                      {/* <Button variant="ghost" size="sm" className="text-xs">
                        Message
                      </Button> */
                    </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {connections
                  .filter(conn => conn.status === 'pending')
                  .map(connection => (
                    <div key={connection.id} className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={connection.avatar} alt={connection.name} />
                        <AvatarFallback>{connection.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{connection.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{connection.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">{connection.mutualConnections} mutual connections</p>
                      </div>
                      {/* <div className="flex flex-col gap-2">
                        <Button variant="default" size="sm" className="text-xs">
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Ignore
                        </Button>
                      </div> */}
                    </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
