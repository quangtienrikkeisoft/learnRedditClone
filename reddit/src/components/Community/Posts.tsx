import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Community } from "../../atoms/communitiesAtom";
import { Post } from "../../atoms/postAtom";
import { firestore } from "../../firebase/clientApp";
import usePost from "../../hooks/usePosts";
import Loader from "./Loader";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { postStateValue, setPostStateValue } = usePost(communityData!);

  // Getting all post
  const getPosts = async () => {
    console.log(" WE ARE GETTING POSTS!!!");
    setLoading(true);
    try {
      // get ref with query
      // get all post with this communityId
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityID", "==", communityData?.id!),
        orderBy("createAt", "desc")
      );
      // spread data for using
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        postsCache: {
          ...prev.postsCache,
          [communityData?.id!]: posts as Post[],
        },
      }));
    } catch (error: any) {
      console.log(" getPosts error", error.message);
    }
    setLoading(false);
  };

  return <>{loading ? <Loader /> : <Stack>{}</Stack>}</>;
};
export default Posts;
