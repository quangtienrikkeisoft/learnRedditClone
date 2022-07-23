import { Flex, Icon } from "@chakra-ui/react";
import { User } from "@firebase/auth";
import React, { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import ImageUpLoad from "./ImageUpLoad";
import TabItem from "./TabItem";
import TextInput from "./TextInput";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];
export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

type NewPostFormProps = {
  communityId: string;
  communityImageURL?: string;
  user: User;
};

const NewPostForm: React.FC = () =>
  //     {
  //   communityId,
  //   communityImageURL,
  //   user,
  // }
  {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({
      title: "",
      body: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState<string>();
    const selectFileRef = useRef<HTMLInputElement>(null);

    const onTextChange = ({
      target: { name, value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTextInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    const handleCreatePost = async () => {
      setLoading(true);
      const { title, body } = textInputs;
      setLoading(false);
    };
    const onSelectImage = () => {};
    return (
      <Flex direction="column" bg="white" borderRadius={4} mt={2}>
        <Flex width="100%">
          {formTabs.map((item, index) => (
            <TabItem
              key={index}
              selected={item.title === selectedTab}
              item={item}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </Flex>
        <Flex p={4}>
          {selectedTab === "Post" && (
            <TextInput
              textInputs={textInputs}
              onChange={onTextChange}
              handleCreatePost={handleCreatePost}
              loading={loading}
            />
          )}
          {selectedTab == "Images & Video" && (
            <ImageUpLoad
              selectedFile={selectedFile} // file url
              setSelectedFile={setSelectedFile} // function
              setSelectedTab={setSelectedTab} // set tab
              selectFileRef={selectFileRef} //
              onSelectImage={onSelectImage} //
            />
          )}
        </Flex>
      </Flex>
    );
  };
export default NewPostForm;
