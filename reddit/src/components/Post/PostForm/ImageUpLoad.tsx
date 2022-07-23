import { Button, Flex } from "@chakra-ui/react";
import React from "react";

type ImageUpLoadProps = {
  selectedFile?: string;
  setSelectedFile?: (value: string) => void;
  setSelectedTab?: (value: string) => void;
  selectFileRef?: React.RefObject<HTMLInputElement>;
  onSelectImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpLoad: React.FC<ImageUpLoadProps> = ({
  selectedFile,
  setSelectedFile,
  setSelectedTab,
  selectFileRef,
  onSelectImage,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      border="1px dashed"
      borderColor="gray.200"
      borderRadius={4}
      width="100%"
      p={20}
    >
      <Button variant="outline" height="28px" onClick={() => {}}>
        Upload
      </Button>
      <input
        id="file-upload"
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
        ref={selectFileRef}
        onChange={onSelectImage}
      />
    </Flex>
  );
};
export default ImageUpLoad;
