import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PostFeed } from '../feed/PostFeed';

export function ActivitySection() {
  return (
    <Card className="activity-section">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Activity</CardTitle>
        <Button variant="outline" size="sm">Create a post</Button>
      </CardHeader>
      
      <Tabs defaultValue="posts" className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent>
          <TabsContent value="posts" className="mt-0 pt-4">
            <PostFeed />
          </TabsContent>
          
          <TabsContent value="comments" className="mt-0 pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No comments to show</p>
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="mt-0 pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No images to show</p>
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="mt-0 pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No articles to show</p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
