import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from './card';
import { Avatar } from './avatar';
import { Button } from './button';

interface PostCardProps {
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

export function PostCard({ user, content, timestamp, likes, comments, image }: PostCardProps) {
  return (
    <Card className="w-full bg-black border-zinc-800">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-10 w-10">
          <Avatar.Image src={user.avatarUrl} alt={user.name} />
          <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-100">{user.name}</span>
            <span className="text-sm text-zinc-500">@{user.username}</span>
          </div>
          <span className="text-xs text-zinc-500">{timestamp}</span>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="text-zinc-300">
        <p>{content}</p>
        {image && (
          <img 
            src={image} 
            alt="Post content" 
            className="mt-4 rounded-lg w-full object-cover max-h-96"
          />
        )}
      </CardContent>
      
      <CardFooter className="border-t border-zinc-800 pt-4">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-red-500">
            <Heart className="h-5 w-5 mr-1" />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-blue-500">
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-green-500">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 