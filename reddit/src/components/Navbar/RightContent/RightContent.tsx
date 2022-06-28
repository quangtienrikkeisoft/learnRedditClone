import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { auth } from "../../../firebase/clientApp";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButton from "./AuthButton";
import Icons from "./Icons";

type RightContentProps = {
  user: User;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <Flex justifyContent="space-between" align="center">
        {user ? <Icons /> : <AuthButton />}
      </Flex>
      <AuthModal />
      <Button
        onClick={() => {
          signOut(auth);
        }}
      />
    </>
  );
};
export default RightContent;
