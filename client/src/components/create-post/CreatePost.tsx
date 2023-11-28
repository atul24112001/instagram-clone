import { ChangeEvent, useRef, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import Button from "../helper/Button";
import { base64 } from "../helper/func";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/authenticated";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/data/dataSlice";

type Props = {
  onDone: () => void;
};

export default function CreatePost({ onDone }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<AssetType[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [caption, setCaption] = useState("");

  const [createPost, createPostState] = useMutation(CREATE_POST);

  const dispatch = useDispatch();

  const chooseFileHandler = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const selectedFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoadingImages(true);
    try {
      const selectedFiles: AssetType[] = [];
      for (const file of e.target.files ?? []) {
        const url = await base64(file);
        if (typeof url == "string") {
          selectedFiles.push({
            type: file.type,
            url,
          });
        }
      }

      setSelectedImages(selectedFiles);
    } catch (error) {
      console.log(error);
    }
    setLoadingImages(false);
  };

  const captionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value ?? "");
  };

  const postHandler = async () => {
    try {
      const response = await createPost({
        variables: {
          caption,
          assets: JSON.stringify(selectedImages),
        },
      });
      dispatch(addPost(response.data.createPost.post));
      onDone();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className="border-b-[1px] p-2 border-solid border-primary-border flex justify-between items-center">
        {selectedImages ? (
          <>
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => {
                setSelectedImages([]);
              }}
            />
            <Button
              loading={createPostState.loading}
              variant="text"
              onClick={postHandler}
            >
              Post
            </Button>
          </>
        ) : (
          <div className="font-bold text-xl text-center flex-1">
            Create new post
          </div>
        )}
      </div>
      <div className="p-4 flex justify-center flex-col gap-4 items-center">
        {selectedImages.length > 0 ? (
          <div className="relative">
            {selectedImageIndex > 0 && (
              <ChevronLeft
                onClick={() => {
                  setSelectedImageIndex((prev) => prev - 1);
                }}
                className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer bg-secondary-background rounded-full"
              />
            )}
            {selectedImages.map((image: AssetType, index: number) => {
              return (
                <img
                  className={
                    selectedImageIndex == index
                      ? `block h-1/4 lg:h-1/3`
                      : "hidden"
                  }
                  src={image.url}
                  key={`${image.type}-${index}`}
                />
              );
            })}
            {selectedImages.length - 1 > selectedImageIndex && (
              <ChevronRight
                onClick={() => {
                  setSelectedImageIndex((prev) => prev + 1);
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer bg-secondary-background rounded-full"
              />
            )}
            <textarea
              className="bg-secondary-background w-full focus:outline-0 py-2"
              placeholder="Caption.."
              onChange={captionChangeHandler}
            />
          </div>
        ) : (
          <>
            <Upload />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              ref={inputRef}
              onChange={selectedFileHandler}
            />
            <Button loading={loadingImages} onClick={chooseFileHandler}>
              Choose File
            </Button>
          </>
        )}
      </div>
    </>
  );
}
