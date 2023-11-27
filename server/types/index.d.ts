export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string | null;
  isLogin: boolean;
}

export interface Asset {
  id: string;
  type: $Enums.AssetType;
  updateAt: Date;
  createdAt: Date;
  postId: string | null;
  userId: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
}

export interface Context {
  currentUser: null | User;
}

enum AssetType {
  image,
  mp4,
}

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}
