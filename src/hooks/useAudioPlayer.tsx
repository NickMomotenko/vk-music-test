import { useEffect, useState } from "react";

export const useAudioPlayer = (audioRef: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return { isPlaying, togglePlay , setIsPlaying };
};
