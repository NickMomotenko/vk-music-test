import { useState, useCallback } from "react";

export const useProgressBar = (audioRef: React.RefObject<HTMLAudioElement>) => {
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const handleChangeOnProgressBarValue = (value: number) => {
    setProgressBarValue(value);

    if (audioRef.current) audioRef.current.currentTime = value;
  };

  const handleMouseDownOnProgressBar = useCallback(() => {
    setIsSeeking(true);
  }, []);

  const handleMouseUpOnProgressBar = () => {
    if (audioRef.current) audioRef.current.currentTime = progressBarValue;
    setIsSeeking(false);
  };

  return {
    progressBarValue,
    isSeeking,
    setProgressBarValue,
    handleChangeOnProgressBarValue,
    handleMouseDownOnProgressBar,
    handleMouseUpOnProgressBar,
  };
};
