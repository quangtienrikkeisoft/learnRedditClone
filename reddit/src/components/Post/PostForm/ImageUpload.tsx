import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React from "react";

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  setSelectedTab: (value: string) => void;
  selectFileRef: React.RefObject<HTMLInputElement>;
  onSelectedImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedFile,
  setSelectedTab,
  selectFileRef,
  onSelectedImage,
}) => {
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile as string}
            maxWidth="400px"
            maxHeight="400px"
          />
          <Stack>
            <Button height="28px" onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              variant="outline"
              height="28px"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
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
          <Button
            variant="outline"
            height="28px"
            onClick={() => selectFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectFileRef}
            type="file"
            hidden
            accept="image/x-png,image/gif,image/jpeg"
            onChange={onSelectedImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
