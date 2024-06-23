import { useEffect, useState } from "react";

export const useAudioTime = (audioRef: any) => {
  const [duration, setDuration] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentValue(audioRef.current.currentTime);
    };

    const handleEnded = () => {
      setCurrentValue(0);
    };

    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [audioRef]);

  return { duration, currentValue, setCurrentValue };
};
