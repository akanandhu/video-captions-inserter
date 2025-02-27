import { Caption } from "@/types";
import ReactPlayer from "react-player";

interface Props {
  videoUrl: string;
  handleProgress: (state: { playedSeconds: number }) => void;
  playerRef: React.RefObject<ReactPlayer | null>;
  currentCaption: Caption | undefined;
}

export const VideoPlayer = (props: Props) => {
  const { currentCaption, handleProgress,  videoUrl, playerRef } =
    props;
  return (
    <div className="relative w-full">
      {videoUrl ? (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          controls
          width="100%"
          height="100%"
          onProgress={handleProgress}
        />
      ) : (
        <div className="bg-gray-600 h-full w-full"> </div>
      )}

      {currentCaption && currentCaption.text !== "" && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2  text-white  text-lg inline-block ">
          <span className="bg-black/60 text-white py-0.5 px-1">
            {currentCaption.text}
          </span>
        </div>
      )}
    </div>
  );
};
