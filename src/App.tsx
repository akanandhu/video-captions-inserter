import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Input } from "@/components/ui/input";
import { VideoPlayer } from "./components/feature/video-player";
import { CaptionEditor } from "./components/feature/caption-editor";
import { isValidUrl } from "./lib/utils";

interface Caption {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

const App: React.FC = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [error, setError] = useState("");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVideoUrl(value);

    if (isValidUrl(value)) {
      setError("");
    } else {
      setError("Please enter a valid URL");
    }
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const currentCaption = captions.find(
    (cap) => currentTime >= cap.startTime && currentTime <= cap.endTime
  );

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold">
        Welcome! Please Input the Link Of Your Video
      </h2>
      {/* Video Input */}
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Input
          type="text"
          placeholder="Enter video URL..."
          value={videoUrl}
          onChange={handleUrlChange}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      {/* Video Player */}
      <div className="grid grid-cols-2 gap-5 w-full h-full min-h-96">
        <VideoPlayer
          currentCaption={currentCaption}
          handleProgress={handleProgress}
          playerRef={playerRef}
          videoUrl={videoUrl}
        />

        {/* Caption Input */}
        <CaptionEditor
          captions={captions}
          currentTime={currentTime}
          setCaptions={setCaptions}
          playerRef={playerRef}
        />
      </div>
    </div>
  );
};

export default App;
