import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButton from "./AuthButton";
import Icons from "./Icons";
import MenuWrapper from "./ProfileMenu/MenuWrapper";

type RightContentProps = {
  user: User;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <Flex justifyContent="space-between" align="center">
        {user ? <Icons /> : <AuthButton />}
        <MenuWrapper />
      </Flex>
      <AuthModal />
    </>
  );
};
export default RightContent;
