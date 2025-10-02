// Message for AI Assistant: THIS PAGE IS NOT USED FOR NOW
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { PostFeed } from '../components/feed/PostFeed';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { LinkTranslated } from '../components/ui/link-translated';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const activityStats = {
  posts: 24,
  comments: 156,
  reactions: 892,
  followers: 1247,
};

const recentActivity = [
  {
    type: 'post',
    content: 'Just finished implementing a new design system for our React components...',
    date: '2 days ago',
    engagement: { likes: 45, comments: 12, shares: 8 },
  },
  {
    type: 'comment',
    content: 'Great insights on modern frontend architecture!',
    originalPost: 'The Future of Web Development',
    date: '4 days ago',
    engagement: { likes: 23, replies: 5 },
  },
  {
    type: 'share',
    content: 'Sharing this excellent article about TypeScript best practices',
    originalPost: 'TypeScript in 2024: Advanced Patterns',
    date: '1 week ago',
    engagement: { likes: 67, comments: 15, shares: 23 },
  },
];

export function ActivityPage() {
  const t = useTranslations('Activity');
  const tProfileHeader = useTranslations('ProfileHeader');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <LinkTranslated href="/">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              {t('backToProfile')}
            </LinkTranslated>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{t('title')}</h1>
              <p className="text-muted-foreground mt-1">Rocco Russo • 1,247 {t('followers')}</p>
            </div>
            {/* Create post button removed - read-only mode */}
          </div>
        </div>

        {/* Activity Stats */}
        <Card className="mb-6 shadow-xs">
          <CardHeader>
            <CardTitle>{t('activityOverview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{activityStats.posts}</div>
                <div className="text-sm text-muted-foreground">{t('posts')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{activityStats.comments}</div>
                <div className="text-sm text-muted-foreground">{t('comments')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{activityStats.reactions}</div>
                <div className="text-sm text-muted-foreground">{t('reactions')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{activityStats.followers}</div>
                <div className="text-sm text-muted-foreground">{tProfileHeader('followers')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Tabs */}
        <Card className="shadow-xs">
          <Tabs defaultValue="all" className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">{t('all')}</TabsTrigger>
                <TabsTrigger value="posts">{t('posts')}</TabsTrigger>
                <TabsTrigger value="comments">{t('comments')}</TabsTrigger>
                <TabsTrigger value="images">{t('images')}</TabsTrigger>
                <TabsTrigger value="articles">{t('articles')}</TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="p-6">
              <TabsContent value="all" className="mt-0">
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>RR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Rocco Russo</span>
                            <span className="text-sm text-muted-foreground">
                              {activity.type === 'post' && t('posted')}
                              {activity.type === 'comment' && t('commentedOn')}
                              {activity.type === 'share' && t('shared')}
                            </span>
                            <span className="text-sm text-muted-foreground">• {activity.date}</span>
                          </div>
                          <p className="text-sm mb-2">{activity.content}</p>
                          {activity.originalPost && (
                            <p className="text-sm text-muted-foreground italic mb-2">"{activity.originalPost}"</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              {activity.engagement.likes} {t('likes')}
                            </span>
                            <span>
                              {activity.engagement.comments || activity.engagement.replies || 0} {t('comments')}
                            </span>
                            {activity.engagement.shares && (
                              <span>
                                {activity.engagement.shares} {t('shares')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="posts" className="mt-0">
                <PostFeed />
              </TabsContent>

              <TabsContent value="comments" className="mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">{t('yourCommentsWillAppear')}</p>
                  <Button variant="outline">{t('startEngagingWithPosts')}</Button>
                </div>
              </TabsContent>

              <TabsContent value="images" className="mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">{t('imagesFromPostsWillAppear')}</p>
                  <Button variant="outline">{t('createPostWithImages')}</Button>
                </div>
              </TabsContent>

              <TabsContent value="articles" className="mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">{t('yourArticlesWillAppear')}</p>
                  <Button variant="outline">{t('writeAnArticle')}</Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
