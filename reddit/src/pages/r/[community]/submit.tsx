import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import PageContent from "../../../components/layout/PageContent";
import NewPostForm from "../../../components/Post/PostForm/NewPostForm";
import { auth } from "../../../firebase/clientApp";

const submit: React.FC = () => {
  const communityStateValue = useRecoilValue(communityState);
  console.log(communityStateValue);
  // const visitredCommunities
  const [user, loadingUser, error] = useAuthState(auth);
  return (
    <PageContent maxWidth="1060px">
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={700}>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            communityImageURL={communityStateValue.currentCommunity.imageURL}
            communityID={communityStateValue.currentCommunity.id}
            user={user}
          />
        )}
      </>
      <>
        {/* About */}
        {/* <About communityData={communityStateValue[0]} />s */}
      </>
    </PageContent>
  );
};
export default submit;
