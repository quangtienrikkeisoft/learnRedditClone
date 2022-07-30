import {
  Flex,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChat } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Post } from "../../atoms/postAtom";

type PostItemProps = {
  post: Post;
  userIscreator: boolean;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIscreator }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius="4px 4px 0px 0px"
      cursor="pointer"
      _hover={{}}
      onClick={() => {}}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.200"
        p={2}
        width="40px"
        borderRadius="3px 0px 0px 3px"
      >
        <Icon
          as={IoArrowUpCircleOutline}
          color=""
          fontSize={22}
          cursor="pointer"
          onClick={() => {}}
        />
        <Text fontSize="9pt" fontWeight={800}>
          {post.voteStatus}
        </Text>
        <Icon
          as={IoArrowDownCircleOutline}
          color="gray.400"
          fontSize={22}
          cursor="pointer"
          onClick={() => {}}
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px 10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            {post.communityImageURL ? (
              <Image
                borderRadius="full"
                boxSize="18px"
                src={post.communityImageURL}
                mr={2}
              />
            ) : (
              <Icon as={FaReddit} fontSize={18} mr={1} color="blue.500" />
            )}

            <Link></Link>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="12pt" fontWeight={600}>
            {post.body}
          </Text>
          {post.imageURL && (
            <Flex justify="center" align="center">
              {true && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                width="80%"
                maxWidth="500px"
                maxHeight="460px"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => {}}
                alt="Post Image"
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text>Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text>Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text>Share</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
