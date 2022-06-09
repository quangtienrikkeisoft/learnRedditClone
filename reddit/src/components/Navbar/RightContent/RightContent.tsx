import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButton from "./AuthButton";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <Flex justify="center" align="center">
        <AuthButton />
      </Flex>
      <AuthModal />
    </>
  );
};
export default RightContent;
