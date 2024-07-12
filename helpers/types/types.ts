export interface CommentsObject {
  comment: string;
  email: string;
  id: string;
  time: number;
  name: string;
}

export interface ReplyObject {
  content: string;
  email: string;
  id: string;
  time: number;
  name: string;
  commentId: string;
}

export interface BlogPost {
  author: string;
  blogData: string;
  category: string;
  id: string;
  status: string;
  thumbnail: string;
  timestamp: any;
  title: string;
  views: number;
  likes: any;
  comments: Array<CommentsObject>;
  reply: Array<ReplyObject>;
}

export interface TopTrendingTypes {
  loading: boolean;
  trendingBlogs: any;
}
