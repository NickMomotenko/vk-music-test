import { useEffect, useState } from "react";

export const useVolume = (audioRef: any) => {
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume, audioRef]);

  return { volume, setVolume };
};
