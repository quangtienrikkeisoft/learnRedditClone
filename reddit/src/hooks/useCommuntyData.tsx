import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
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
  const setAuthModalState = useSetRecoilState(authModalState);

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user sign in?
    // if not => open auth modal
    console.log("ON JOIN LEAVE", communityData.id);
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

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

  const joinCommunity = async (communityData: Community) => {
    // create a new community snippet
    // update the number of nmenber on the community
    // update recoild state - community
    console.log("ComunityData: ", communityData);
    try {
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });
      // commit batch write
      await batch.commit();

      // update commutnityData state
      setCommunityStatevalue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const leaveCommunity = async (communityId: string) => {
    // deleteting communtiy snippet from user
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      );
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });
      // commit to db
      await batch.commit();
      // update community value state
      setCommunityStatevalue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommuntyData;
