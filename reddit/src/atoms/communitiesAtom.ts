import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
    id:string,
    creatorId: string,
    numberOfMembers: number,
    privacyType: "public" | "restricted" | "private",
    createAt?: Timestamp,
    imageURL?: string,
}
export interface CommunitySnippet {
    communityId: string,
    isModerator?: string,
    imageURL?:string
}
export interface CommunityState {
    mySnippets : CommunitySnippet[];
    currentCommunity: Community
}
export const defaultCommunity: Community = {
    id: "",
    creatorId: "" ,
    numberOfMembers: 0,
    privacyType: "public"
}
const defaultCommunityState: CommunityState = {
    mySnippets : [],
    currentCommunity:  defaultCommunity
}
export const communityState = atom<CommunityState>({
    key: "communtities",
    default: defaultCommunityState
})
