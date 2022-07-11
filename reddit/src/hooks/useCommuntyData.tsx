import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";
const useCommuntyData = () => {
  // declaire state value
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStatevalue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user sign in?
    // if not => open auth modal
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };
  const getMySnippet = async () => {
    setLoading(true);
    try {
      // gte user snippet
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({
        ...doc.data(),
      }));
      setCommunityStatevalue((prev) => ({
        ...prev,
        mySnippets: snippets as Array<CommunitySnippet>,
      }));
      console.log("this is snippets ", snippets);
    } catch (error: any) {
      console.log("Error getting user snippets", error);
      setError(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!user) return;
    getMySnippet();
  }, [user]);

  const joinCommunity = (communityData: Community) => {
    // create a new cimmunity snippet
    // pdate the number of nmenber on the community
    // updatye recoild state - community
    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const leaveCommunity = (communityData: string) => {
    // deleteting communtiy snippet from user
    // update the number
    // update recoild state
  };
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommuntyData;
