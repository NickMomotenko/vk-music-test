import { useState, useCallback, useEffect } from "react";

export const useProgressBar = (audioRef: any) => {
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const handleChangeOnProgressBarValue = (value: number) => {
    setProgressBarValue(value);

    audioRef.current.currentTime = value;
  };

  const handleMouseDownOnProgressBar = useCallback(() => {
    setIsSeeking(true);
  }, []);

  const handleMouseUpOnProgressBar = () => {
    audioRef.current.currentTime = progressBarValue;
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
