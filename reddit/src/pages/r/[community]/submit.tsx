import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import PageContent from "../../../components/layout/PageContent";
import NewPostForm from "../../../components/Post/PostForm/NewPostForm";

const submit: React.FC = () => {
  const communityStateValue = useRecoilValue(communityState);
  return (
    <PageContent maxWidth="1060px">
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={700}>Create a post</Text>
        </Box>
        <NewPostForm />
      </>
      <>
        {/* About */}
        {/* <About communityData={communityStateValue[0]} />s */}
      </>
    </PageContent>
  );
};
export default submit;
