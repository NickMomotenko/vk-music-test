import { RefObject, useEffect, useState } from "react";

export const useAudioPlayer = (audioRef: RefObject<HTMLAudioElement>) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioRef]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return { isPlaying, togglePlay, setIsPlaying };
};
