import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

type AuthButtonProps = {};

const AuthButton: React.FC<AuthButtonProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", sm: "110px" }}
        onClick={() => {
          setAuthModalState({
            open: true,
            view: "login",
          });
        }}
        mr={2}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", sm: "110px" }}
        onClick={() => {
          setAuthModalState({
            open: true,
            view: "signup",
          });
        }}
        mr={2}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButton;
