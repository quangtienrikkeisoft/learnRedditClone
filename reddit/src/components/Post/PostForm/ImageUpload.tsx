import { Button, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {};

const ImageUpload: React.FC<ImageUploadProps> = () => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={20}
      border="1px dashed"
      borderColor="gray.200"
      borderRadius={4}
      width="100%"
    >
      <Button variant="outline" height="28px" onClick={() => {}}>
        Upload
      </Button>
      <input ref={selectedFileRef} type="file" hidden />
    </Flex>
  );
};
export default ImageUpload;
