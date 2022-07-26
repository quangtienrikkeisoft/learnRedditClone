import { Alert, AlertIcon, AlertTitle, Flex, Icon } from "@chakra-ui/react";
import { User } from "@firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { PostState } from "../../../atoms/postAtom";
import { firestore, storage } from "../../../firebase/clientApp";
import ImageUpload from "./ImageUpload";
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

const NewPostForm: React.FC<NewPostFormProps> = ({
  communityId,
  communityImageURL,
  user,
}) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setPostItems = useSetRecoilState(PostState);

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // handle select input file
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };
  // post funtion firebase
  const handleCreatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId,
        communityImageURL: communityImageURL || "",
        creatorId: user.uid,
        userDisplayText: user.email!.split("@")[0],
        title,
        body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp(),
        editAt: serverTimestamp(),
      });
      console.log("doc ref: ", postDocRef.id);
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
        console.log("this is download URL image , ", downloadURL);
      }
    } catch (error: any) {
      console.log("createPost error: ", error);
      setError("Error create post");
    }
    // clear the cache to cause refetch of the post
    setPostItems((prev) => ({
      ...prev,
      postUpdateRequired: true,
    }));
    // back to Post tab
    router.back();
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
        {selectedTab === "Images & Video" && (
          <ImageUpload
            onSelectedImage={onSelectImage}
            selectFileRef={selectFileRef}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error creating post! </AlertTitle>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
