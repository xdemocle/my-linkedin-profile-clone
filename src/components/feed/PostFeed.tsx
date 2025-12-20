import { useTranslations } from "use-intl";
import { Post } from "./Post";

const postData = [
  {
    id: 1,
    key: "post1",
    timePosted: "2d",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 124,
    comments: 35,
    shares: 7,
  },
  {
    id: 2,
    key: "post2",
    timePosted: "3d",
    likes: 88,
    comments: 14,
    shares: 3,
  },
  {
    id: 3,
    key: "post3",
    timePosted: "1w",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 212,
    comments: 47,
    shares: 25,
  },
];

export function PostFeed() {
  const tCommon = useTranslations("Common");
  const tData = useTranslations("SampleData.posts");

  const posts = postData.map((post) => ({
    id: post.id,
    author: {
      name:
        post.key === "post1"
          ? tCommon("profileName")
          : tData(`${post.key}.author`),
      role: tData(`${post.key}.role`),
      avatar: "https://github.com/shadcn.png",
      timePosted: post.timePosted,
    },
    content: tData(`${post.key}.content`),
    imageUrl: post.imageUrl,
    likes: post.likes,
    comments: post.comments,
    shares: post.shares,
  }));

  return (
    <div className="space-y-4">
      {/* Post creation UI removed - read-only mode */}

      {/* Posts list */}
      <div>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
