import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Input } from "@/components/ui/input";
import { VideoPlayer } from "./components/feature/video-player";
import { CaptionEditor } from "./components/feature/caption-editor";

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

  // Function to track current video time
  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  // Check if a caption should be displayed
  const currentCaption = captions.find(
    (cap) => currentTime >= cap.startTime && currentTime <= cap.endTime
  );

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold">
        Welcome! Please Input the Link Of Your Video
      </h2>
      {/* Video URL Input */}
      <div className="flex gap-2 w-full max-w-md">
        <Input
          type="text"
          placeholder="Enter video URL..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
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
