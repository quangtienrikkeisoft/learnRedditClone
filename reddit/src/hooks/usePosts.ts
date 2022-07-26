import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { Community } from "../atoms/communitiesAtom";
import { PostState } from "../atoms/postAtom";
import { auth } from "../firebase/clientApp";

const usePost = (communityData?: Community) => {
    const [user, loadingUser] = useAuthState(auth);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("");
    const router = useRouter()
    const [postStateValue, setPostStateValue] = useRecoilState(PostState)

    return {
        postStateValue, setPostStateValue
    }
}
export default usePost
