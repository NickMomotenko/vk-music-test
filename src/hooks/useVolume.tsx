import { RefObject, useEffect, useState } from "react";

export const useVolume = (audioRef: RefObject<HTMLAudioElement>) => {
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  return { volume, setVolume };
};
