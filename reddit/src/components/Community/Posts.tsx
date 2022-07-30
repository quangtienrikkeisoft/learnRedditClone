import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Community } from "../../atoms/communitiesAtom";
import { Post } from "../../atoms/postAtom";
import { firestore } from "../../firebase/clientApp";
import usePost from "../../hooks/usePosts";
import Loader from "./Loader";
import PostItem from "./PostItem";

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
      console.log("passing communityData: ", communityData?.id);
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityID", "==", communityData?.id!),
        orderBy("createdAt", "desc")
      );
      // spread data for using
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("all posts : ", posts);
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        postsCache: {
          ...prev.postsCache,
          [communityData?.id!]: posts as Post[],
        },
        postUpdateRequired: false,
      }));
    } catch (error: any) {
      console.log(" getPosts error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post: Post, index) => (
            <PostItem
              post={post}
              userIscreator={userId === post.creatorId}
              key={post.id}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
