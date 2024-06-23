import { RefObject, useEffect, useState } from "react";

export const useAudioTime = (audioRef: RefObject<HTMLAudioElement>) => {
  const [duration, setDuration] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (audioRef.current) setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) setCurrentValue(audioRef.current.currentTime);
    };

    const handleEnded = () => {
      setCurrentValue(0);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioRef]);

  return { duration, currentValue, setCurrentValue };
};
