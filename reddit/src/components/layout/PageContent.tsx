import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  maxWidth?: string;
};

const PageContent: React.FC<PageContentProps> = ({ children, maxWidth }) => {
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
        <Flex
          direction="column"
          width={{
            base: "100%",
            md: "65%",
          }}
          mr={{
            base: 0,
            md: 6,
          }}
        >
          {/* children1  */}
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* children2  */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Box>
      </Flex>
    </Flex>
  );
};
export default PageContent;
