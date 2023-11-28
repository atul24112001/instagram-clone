import { useState } from "react";
import Avatar from "./Avatar";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { API_URL } from "../../apolloClient";
import Image from "./Image";
import { useNavigate } from "react-router-dom";

type Props = {
  caption: string;
  user: User;
  assets: PostAsset[];
};

function Post({ caption, user, assets }: Props) {
  const [showCaption, setShowCaption] = useState(false);
  const navigate = useNavigate();
  const viewProfile = () => {
    navigate(user.userName);
  };

  return (
    <div className="max-w-md  mb-4 w-full">
      <div className="flex p-1 md:px-0 items-center gap-2">
        <Avatar onClick={viewProfile} size="small" />
        <div
          onClick={viewProfile}
          className="text-sm font-bold flex-1 cursor-pointer"
        >
          {user.userName}
        </div>
        <MoreHorizontal className="cursor-pointer" />
      </div>
      <div className="min-h-[150px]">
        <Image
          // alt={}
          src={`${API_URL}/asset/${assets[0].id}`}
        />
      </div>
      <div className="flex p-2 md:px-0">
        <div className="flex gap-2 flex-1">
          <Heart className="cursor-pointer hover:opacity-50" />
          <MessageCircle className="cursor-pointer hover:opacity-50" />
          <Send className="cursor-pointer hover:opacity-50" />
        </div>
        <Bookmark className="cursor-pointer hover:opacity-50" />
      </div>
      <div className="text-sm font-bold p-2 md:p-0">
        <div>0 Likes</div>
        <div>
          {user.name}{" "}
          <span className="font-normal">
            {caption.length > 50 && !showCaption
              ? `${caption.substring(0, 50)}`
              : caption}
          </span>
        </div>
        {caption.length > 50 ? (
          <div
            onClick={() => setShowCaption((prev: boolean) => !prev)}
            className="text-secondary-text cursor-pointer"
          >
            {showCaption ? "less" : "more"}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Post;

{
  /*
server {
    listen 80;
    server_name api-instagram.atulmorchhlay.com;

    location / {
        proxy_pass http://instagram;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
*/
}
