import React from "react";
import { Community } from "../../atoms/communitiesAtom";

type PostsProps = {
  communityData?: Community;
  userId?: string;
  loadingUser: boolean;
};

const Posts: React.FC<PostsProps> = ({
  communityData,
  userId,
  loadingUser,
}) => {
  return <div>Have a good coding</div>;
};
export default Posts;
