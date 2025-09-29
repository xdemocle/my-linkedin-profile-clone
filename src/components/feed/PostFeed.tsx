import { Post } from './Post';

// Sample post data
const posts = [
  {
    id: 1,
    author: {
      name: 'Rocco Russo',
      role: 'Full Stack Frontend Web Developer',
      avatar: 'https://github.com/shadcn.png',
      timePosted: '2d'
    },
    content: 'Excited to share that I\'ve completed my latest project - a LinkedIn profile clone built with React, TypeScript, and TailwindCSS! 🚀\n\nCheck it out and let me know what you think!',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 124,
    comments: 35,
    shares: 7
  },
  {
    id: 2,
    author: {
      name: 'Sarah Johnson',
      role: 'UX Designer at Google',
      avatar: 'https://github.com/shadcn.png',
      timePosted: '3d'
    },
    content: 'Just published my new article on design systems and how they can transform your product development process.\n\nA good design system can save hundreds of development hours and bring consistency to your user experience.',
    likes: 88,
    comments: 14,
    shares: 3
  },
  {
    id: 3,
    author: {
      name: 'Michael Chen',
      role: 'Tech Lead at Microsoft',
      avatar: 'https://github.com/shadcn.png',
      timePosted: '1w'
    },
    content: 'We\'re hiring! Looking for talented frontend developers to join our team. If you have experience with React, TypeScript, and a passion for building great user experiences, send me a message.',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 212,
    comments: 47,
    shares: 25
  }
];

export function PostFeed() {
  return (
    <div className="space-y-4">
      {/* Post creation UI removed - read-only mode */}
      
      {/* Posts list */}
      <div>
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
