import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PageContent from "../../../components/layout/PageContent";

type sunmitProps = {};

const sunmit: React.FC<sunmitProps> = () => {
  return (
    <PageContent maxWidth="1060px">
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a Post</Text>
        </Box>
      </>
    </PageContent>
  );
};
export default sunmit;
