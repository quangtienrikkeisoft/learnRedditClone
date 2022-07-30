import { Flex, Icon } from "@chakra-ui/react";
import React from "react";

type PostItemProps = {};

const PostItem: React.FC<PostItemProps> = () => {
  return (
    <Flex border=>
      <Flex>
          <Icon />
      </Flex>
    </Flex>
  );
};
export default PostItem;
