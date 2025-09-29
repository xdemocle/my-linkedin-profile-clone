import { useTranslations } from 'use-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern React Applications with TypeScript',
    description: 'A comprehensive guide to setting up and developing scalable React applications using TypeScript, focusing on best practices and modern development patterns.',
    content: 'In this post, we explore the benefits of using TypeScript with React and how to set up a robust development environment...',
    author: {
      name: 'Rocco Russo',
      avatar: 'https://github.com/shadcn.png',
    },
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['React', 'TypeScript', 'Frontend'],
    slug: 'building-modern-react-applications-typescript',
  },
  {
    id: '2',
    title: 'The Future of Web3 and Frontend Development',
    description: 'Exploring how blockchain technology is reshaping frontend development and what developers need to know about Web3 integration.',
    content: 'Web3 represents a paradigm shift in how we think about applications and user interactions...',
    author: {
      name: 'Rocco Russo',
      avatar: 'https://github.com/shadcn.png',
    },
    publishedAt: '2024-01-10',
    readTime: 12,
    tags: ['Web3', 'Blockchain', 'Frontend', 'Ethereum'],
    slug: 'future-web3-frontend-development',
  },
  {
    id: '3',
    title: 'Optimizing Performance in Large React Applications',
    description: 'Learn advanced techniques for optimizing React application performance, including code splitting, memoization, and efficient state management.',
    content: 'Performance optimization is crucial for maintaining a good user experience in large applications...',
    author: {
      name: 'Rocco Russo',
      avatar: 'https://github.com/shadcn.png',
    },
    publishedAt: '2024-01-05',
    readTime: 15,
    tags: ['React', 'Performance', 'Optimization'],
    slug: 'optimizing-performance-large-react-applications',
  },
];

export function BlogPage() {
  const t = useTranslations('Blog');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Blog Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{t('featured')}</Badge>
            </div>
            <CardTitle className="text-2xl mb-2">{blogPosts[0].title}</CardTitle>
            <CardDescription className="text-base">
              {blogPosts[0].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={blogPosts[0].author.avatar} />
                  <AvatarFallback>
                    <UserIcon className="w-3 h-3" />
                  </AvatarFallback>
                </Avatar>
                <span>{blogPosts[0].author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDate(blogPosts[0].publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>{blogPosts[0].readTime} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {blogPosts[0].tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button size="lg" className="w-full sm:w-auto">
              Read Full Article
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        <UserIcon className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <Card className="bg-muted/50">
        <CardHeader className="text-center">
          <CardTitle>Stay Updated</CardTitle>
          <CardDescription>
            Subscribe to get notified about new posts on frontend development, Web3, and tech insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}