type AssetType = {
  url: string;
  type: string;
};

type PostAsset = {
  id: string;
  postId: string;
  type: string;
};

type Post = {
  id: string;
  caption: string;
  userId?: string;
  user?: User;
  assets: PostAsset[];
};

type User = {
  name: string;
  email: string;
  id: string;
  userName: string;
};

type ProfileDetails = {
  user: User;
  posts: Post[];
  followersCount: number;
  followingCount: number;
  postsCount: number;
};

type InitialDataState = {
  posts: Post[];
  suggestedUsers: User[];
  profileDetails: ProfileDetails | null;
};

type InitialAuthState = {
  user: User | null;
  isAuthenticated: boolean;
  token: null | string;
};
