import { Caption } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { formatTimeWithMS } from "@/lib/utils";
import { SetStateAction } from "react";
import ReactPlayer from "react-player";

interface Props {
  captions: Caption[];
  setCaptions: React.Dispatch<SetStateAction<Caption[]>>;
  currentTime: number;
  playerRef: React.RefObject<ReactPlayer | null>;
}

export const CaptionEditor = (props: Props) => {
  const { captions, currentTime, setCaptions, playerRef } = props;
  // Function to add a caption at the current video time
  const handleAdd = () => {
    const newCaption: Caption = {
      id: captions.length + 1,
      text: "",
      startTime: 0,
      endTime: 5,
    };

    setCaptions((prev) => [...prev, newCaption]);
    return newCaption.id;
  };

  const handleUpdate = (id: number, data: Partial<Caption>) => {
    setCaptions((prev) =>
      prev.map((caption) =>
        caption.id === id ? { ...caption, ...data } : caption
      )
    );
  };

  const handleAddAtCurrentTime = () => {
    const id = handleAdd();
    handleUpdate(id, {
      startTime: currentTime,
      endTime: currentTime + 5, // Default 5 seconds duration
    });
  };

  const handleTimeChange = (
    id: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    try {
      let timeInSeconds = 0;

      if (value.includes(":") || value.includes(",")) {
        const parts = value.split(/[:,]/).map(Number);
        console.log(parts, "partsCheck");
        let hours = 0,
          minutes = 0,
          seconds = 0,
          milliseconds = 0;

        if (parts.length === 4) {
          [hours, minutes, seconds, milliseconds] = parts;
        } else if (parts.length === 3) {
          [minutes, seconds, milliseconds] = parts;
        } else if (parts.length === 2) {
          [seconds, milliseconds] = parts;
        } else if (parts.length === 1) {
          [seconds] = parts;
        }

        timeInSeconds =
          hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
      } else {
        const rawMilliseconds = parseInt(value, 10);
        if (!isNaN(rawMilliseconds)) {
          const formattedMs = rawMilliseconds
            .toString()
            .padStart(3, "0")
            .slice(-3);
          timeInSeconds = parseFloat(`0.${formattedMs}`);
        }
      }

      if (!isNaN(timeInSeconds)) {
        handleUpdate(id, { [field]: timeInSeconds });
      }
    } catch (e) {
      console.error("Invalid time format", e);
    }
  };

  const handleDelete = (id: number) => {
    setCaptions((prev) => prev.filter((caption) => caption.id !== id));
  };

  const handlePreview = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 min-h-96">
      <div className="flex justify-between items-center mb-4 gap-6">
        <h2 className="text-lg font-semibold">Caption Editor</h2>
        <Button onClick={handleAddAtCurrentTime}>
          Add Caption at Current Time
        </Button>
      </div>

      {captions.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No captions yet. Add a caption to get started.
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {captions
            .sort((a, b) => a.startTime - b.startTime)
            .map((caption) => (
              <div key={caption.id} className="border p-4 rounded-md">
                <div className="flex gap-4 mb-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">
                      Start Time
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={formatTimeWithMS(caption.startTime)}
                        onChange={(e) =>
                          handleTimeChange(
                            caption.id,
                            "startTime",
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleUpdate(caption.id, {
                            startTime: currentTime,
                          })
                        }
                      >
                        Set Current
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">
                      End Time
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={formatTimeWithMS(caption.endTime)}
                        onChange={(e) =>
                          handleTimeChange(
                            caption.id,
                            "endTime",
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleUpdate(caption.id, {
                            endTime: currentTime,
                          })
                        }
                      >
                        Set Current
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Caption Text
                  </label>
                  <textarea
                    value={caption.text}
                    onChange={(e) =>
                      handleUpdate(caption.id, { text: e.target.value })
                    }
                    rows={2}
                    className="w-full p-2 border rounded resize-y"
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(caption.startTime)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(caption.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
