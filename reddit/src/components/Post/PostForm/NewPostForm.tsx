import { Flex, Icon } from "@chakra-ui/react";
import { User } from "@firebase/auth";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
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
        </Flex>
      </Flex>
    );
  };
export default NewPostForm;
