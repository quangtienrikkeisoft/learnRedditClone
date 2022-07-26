import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import { Community, communityState } from "../../../atoms/communitiesAtom";
import About from "../../../components/Community/About";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Header from "../../../components/Community/Header";
import Posts from "../../../components/Community/Posts";
import PageContent from "../../../components/layout/PageContent";
import { auth, firestore } from "../../../firebase/clientApp";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log("here is data", communityData);
  const [user, loadingUser] = useAuthState(auth);
  const setCommunity = useSetRecoilState(communityState);
  setCommunity((prev) => ({
    ...prev,
    currentCommunity: communityData,
  }));

  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        {/* left content  */}
        <>
          <CreatePostLink communityData={communityData} />
          <Posts
            communityData={communityData}
            userId={user?.uid}
            loadingUser={loadingUser}
          />
        </>
        {/* right content */}
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};
export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("GET SERVER SIDE PROPS RUNNING");
  try {
    // doc Ref
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.community as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error - [community]", error);
  }
}
