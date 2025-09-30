import { ChatBubbleIcon, HeartIcon, ReloadIcon, Share1Icon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';

interface PostAuthor {
  name: string;
  role: string;
  avatar: string;
  timePosted: string;
}

interface PostProps {
  author: PostAuthor;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

export function Post({ author, content, imageUrl, likes, comments, shares }: PostProps) {
  return (
    <Card className="mb-4 overflow-hidden shadow-xs">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">{author.name}</h3>
            <p className="text-xs text-muted-foreground">{author.role}</p>
            <p className="text-xs text-muted-foreground">{author.timePosted}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-sm mb-4 whitespace-pre-wrap">{content}</p>

        {imageUrl && (
          <div className="mt-6 -mx-4">
            <img src={imageUrl} alt="Post content" className="w-full max-h-[400px] object-cover" />
          </div>
        )}
      </CardContent>

      {/* Engagement stats */}
      <div className="px-4 pb-1">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <span className="flex items-center gap-1">
              <HeartIcon className="h-3 w-3 text-primary" />
              {likes}
            </span>
          </div>
          <div className="flex gap-3">
            <span>{comments} comments</span>
            <span>{shares} shares</span>
          </div>
        </div>
      </div>

      <Separator className="my-1" />

      <CardFooter className="p-1 px-2 flex justify-between">
        <div className="flex-1 text-xs gap-2 text-muted-foreground flex items-center justify-center">
          <HeartIcon className="h-4 w-4 mr-1" />
          Like
        </div>
        <div className="flex-1 text-xs gap-2 text-muted-foreground flex items-center justify-center">
          <ChatBubbleIcon className="h-4 w-4 mr-1" />
          Comment
        </div>
        <div className="flex-1 text-xs gap-2 text-muted-foreground flex items-center justify-center">
          <ReloadIcon className="h-4 w-4 mr-1" />
          Repost
        </div>
        <div className="flex-1 text-xs gap-2 text-muted-foreground flex items-center justify-center">
          <Share1Icon className="h-4 w-4 mr-1" />
          Send
        </div>
      </CardFooter>
    </Card>
  );
}
