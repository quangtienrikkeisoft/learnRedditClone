import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {
  // user:
};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex flexGrow={1}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon mb={1} color="gray.300" />}
        />
        <Input
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          placeholder="Search reddit"
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
