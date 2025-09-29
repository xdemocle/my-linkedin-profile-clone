import { ChatBubbleIcon, Cross2Icon, ImageIcon, Pencil2Icon, PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
}

// Sample chat data
const chats: Chat[] = [
  {
    id: '1',
    name: 'Marco Bianchi',
    avatar: 'https://github.com/shadcn.png',
    status: 'online',
    unread: 3,
    lastMessage: 'Hi, are you available for a quick call tomorrow?',
    lastMessageTime: '15m',
    messages: [
      {
        id: '1',
        sender: 'Marco Bianchi',
        content: 'Hi Rocco, how are you doing today?',
        timestamp: '10:15 AM',
        isSelf: false,
      },
      {
        id: '2',
        sender: 'You',
        content: "I'm doing great, thanks for asking! How about you?",
        timestamp: '10:17 AM',
        isSelf: true,
      },
      {
        id: '3',
        sender: 'Marco Bianchi',
        content: 'All good here. Working on that project I told you about last week.',
        timestamp: '10:20 AM',
        isSelf: false,
      },
      {
        id: '4',
        sender: 'Marco Bianchi',
        content: 'By the way, do you have time for a quick chat about the React component library?',
        timestamp: '10:21 AM',
        isSelf: false,
      },
      {
        id: '5',
        sender: 'Marco Bianchi',
        content: 'Hi, are you available for a quick call tomorrow?',
        timestamp: '10:45 AM',
        isSelf: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Giulia Ferrari',
    avatar: 'https://github.com/shadcn.png',
    status: 'offline',
    unread: 0,
    lastMessage: 'Thanks for the feedback on my portfolio!',
    lastMessageTime: '2h',
    messages: [
      {
        id: '1',
        sender: 'Giulia Ferrari',
        content: 'Hello Rocco! I just looked at your LinkedIn profile. Very impressive!',
        timestamp: 'Yesterday',
        isSelf: false,
      },
      {
        id: '2',
        sender: 'You',
        content:
          'Thank you, Giulia! I actually spent some time reviewing your portfolio as well. Great work on those UI designs!',
        timestamp: 'Yesterday',
        isSelf: true,
      },
      {
        id: '3',
        sender: 'Giulia Ferrari',
        content: 'Thanks for the feedback on my portfolio!',
        timestamp: 'Yesterday',
        isSelf: false,
      },
    ],
  },
];

export function MessagingPopup() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  return (
    <div className='fixed bottom-0 right-6'>
      {!isExpanded ? (
        <Button className='rounded-t-lg rounded-b-none gap-2 h-12 px-6 shadow-xs' onClick={() => setIsExpanded(true)}>
          <ChatBubbleIcon className='h-5 w-5' />
          Messaging
        </Button>
      ) : (
        <Card className='w-[360px] shadow-xs'>
          <CardHeader className='py-3 px-4 flex flex-row items-center justify-between'>
            <div className='flex items-center gap-2'>
              <CardTitle className='text-base'>Messaging</CardTitle>
              {!activeChat && (
                <Button variant='ghost' size='icon' className='h-7 w-7'>
                  <Pencil2Icon className='h-4 w-4' />
                </Button>
              )}
            </div>
            <div className='flex items-center gap-1'>
              {activeChat && (
                <Button variant='ghost' size='icon' className='h-7 w-7' onClick={() => setActiveChat(null)}>
                  <PlusIcon className='h-4 w-4 rotate-45' />
                </Button>
              )}
              <Button variant='ghost' size='icon' className='h-7 w-7' onClick={() => setIsExpanded(false)}>
                <Cross2Icon className='h-4 w-4' />
              </Button>
            </div>
          </CardHeader>

          {activeChat ? (
            <>
              <CardHeader className='py-2 px-4 border-t'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={activeChat.avatar} />
                      <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='text-sm font-medium'>{activeChat.name}</h3>
                      <p className='text-xs text-muted-foreground'>
                        {activeChat.status === 'online' ? (
                          <span className='flex items-center'>
                            <span className='h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5'></span>
                            Online
                          </span>
                        ) : (
                          'Offline'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <Button variant='ghost' size='icon' className='h-7 w-7'>
                      <ImageIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className='p-0 h-80 overflow-auto'>
                <div className='p-4 space-y-4'>
                  {activeChat.messages.map(message => (
                    <div key={message.id} className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`
                        max-w-[80%] p-3 rounded-lg 
                        ${
                          message.isSelf
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted rounded-bl-none'
                        }
                      `}
                      >
                        <p className='text-sm'>{message.content}</p>
                        <span className='text-xs opacity-70 block text-right mt-1'>{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className='p-2'>
                <div className='flex w-full items-center gap-2'>
                  <Input placeholder='Write a message...' className='h-9' />
                  <Button size='sm'>Send</Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <>
              <CardContent className='p-0 h-80 overflow-auto'>
                <div className='flex items-center p-3 border-b'>
                  <Input placeholder='Search messages' className='h-8' />
                </div>

                <div className='py-2'>
                  {chats.map(chat => (
                    <div
                      key={chat.id}
                      className='px-4 py-2 hover:bg-muted cursor-pointer'
                      onClick={() => setActiveChat(chat)}
                    >
                      <div className='flex items-start gap-3'>
                        <div className='relative'>
                          <Avatar className='h-10 w-10'>
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback>{chat.name[0]}</AvatarFallback>
                          </Avatar>
                          {chat.status === 'online' && (
                            <span className='absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background'></span>
                          )}
                        </div>

                        <div className='flex-1 min-w-0'>
                          <div className='flex justify-between items-baseline'>
                            <h3 className='font-medium text-sm'>{chat.name}</h3>
                            <span className='text-xs text-muted-foreground'>{chat.lastMessageTime}</span>
                          </div>
                          <p className='text-xs text-muted-foreground truncate'>{chat.lastMessage}</p>
                        </div>

                        {chat.unread > 0 && (
                          <div className='ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center'>
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
