import { useEffect, useRef, useState } from "react";

import { IconButton, Text } from "@vkontakte/vkui";
import { Icon16MoreVertical, Icon28Pause, Icon28Play } from "@vkontakte/icons";

import { Equalizer } from "../Equalizer";
import { ProgressBar } from "../ProgressBar";
import { Options } from "../Options";

import { useClickOutside } from "../../hooks/useClickOutside";
import { useRangeInput } from "../../hooks/useRangeInput";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { useAudioTime } from "../../hooks/useAudioTime";
import { useProgressBar } from "../../hooks/useProgressBar";

import { convertSeconds } from "../../helpers/helpers";

import defaultPosterIcon from "../../assets/icons/audio-poster.svg";

import "./styles.scss";

type AudioProps = {
  audioSrc: string;
};

export const Audio: React.FC<AudioProps> = ({ audioSrc }) => {
  const [displayedValue, setDisplayedValue] = useState<string>("");
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isProgressBarDisabled, setIsProgressBarDisabled] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const optiosRef = useRef<HTMLDivElement>(null);

  const { isPlaying, togglePlay, setIsPlaying } = useAudioPlayer(audioRef);
  const { duration, currentValue, setCurrentValue } = useAudioTime(audioRef);
  const {
    progressBarValue,
    isSeeking,
    setProgressBarValue,
    handleChangeOnProgressBarValue,
    handleMouseDownOnProgressBar,
    handleMouseUpOnProgressBar,
  } = useProgressBar(audioRef);

  const { config, setConfig } = useRangeInput();

  const audioClasses = isPlaying ? "audio audio--playing" : "audio";

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setConfig((prevState: any) => ({
        ...prevState,
        max: Number(audioRef.current.duration),
      }));

      let convertedDuration = convertSeconds(audioRef.current.duration);
      setDisplayedValue(convertedDuration);
    };

    const handleEnded = () => {
      setIsPlaying(false);

      handleChangeOnProgressBarValue(0);

      setDisplayedValue(duration.toString());
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      let convertedCurrentTime = convertSeconds(audioRef.current.currentTime);

      setDisplayedValue(convertedCurrentTime);
    }
  }, [currentValue, progressBarValue]);

  useEffect(() => {
    const handleMouseOutside = () => {
      handleMouseUp();
    };

    if (isSeeking) {
      let convertedCurrentTime = convertSeconds(progressBarValue);
      setDisplayedValue(convertedCurrentTime);

      document.addEventListener("mouseup", handleMouseOutside);
    }

    return () => document.removeEventListener("mouseup", handleMouseOutside);
  }, [isSeeking, progressBarValue]);

  const handleOptionsClick = () => {
    setIsOptionsActive((prevState) => !prevState);
  };

  const handleChangeProgressBarValue = (target: any) => {
    setCurrentValue(Number(target.value));

    handleChangeOnProgressBarValue(Number(target.value));
  };

  const handleMouseDown = () => {
    setIsPlaying(false);

    handleMouseDownOnProgressBar();

    setIsHovered(true);
  };

  const handleMouseUp = () => {
    handleMouseUpOnProgressBar();

    setIsPlaying(true);
    setIsHovered(false);
  };

  const onTimeUpdate = () => {
    setProgressBarValue(Number(audioRef.current.currentTime));
  };

  useClickOutside(optiosRef, () => setIsOptionsActive(false));

  return (
    <div className={audioClasses}>
      <div className="audio__container">
        <div
          className="audio__col audio__col--info"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="audio__poster" onClick={togglePlay}>
            <img
              src={defaultPosterIcon}
              alt="poster image"
              className="audio__poster-img"
            />
            <div className="audio__poster-effect">
              {!isHovered && isPlaying ? (
                <Equalizer />
              ) : isSeeking ? (
                <Icon28Pause fill="#fff" />
              ) : isPlaying && isHovered ? (
                <Icon28Pause fill="#fff" />
              ) : !isPlaying && !isHovered ? (
                <></>
              ) : (
                <Icon28Play fill="#fff" />
              )}
            </div>
          </div>
          <div className="audio__info">
            <Text className="audio__title">Трек</Text>
            <Text className="audio__executor">Исполнитель</Text>
          </div>
          <Text className="audio__timer">{displayedValue}</Text>
        </div>
        <div className="audio__col">
          <div className="audio__options">
            <IconButton label="Опции" onClick={handleOptionsClick}>
              <Icon16MoreVertical width={20} height={17} fill="#2688EB" />
            </IconButton>
            {isOptionsActive && (
              <Options
                data={[
                  {
                    text: `${
                      isProgressBarDisabled ? "Разблокировать" : "Заблокировать"
                    } прогрес бар`,
                    func: () =>
                      setIsProgressBarDisabled(!isProgressBarDisabled),
                  },
                ]}
                ref={optiosRef}
                onItemClick={handleOptionsClick}
              />
            )}
          </div>
        </div>
        <audio
          className="audio__player"
          src={audioSrc}
          ref={audioRef}
          onTimeUpdate={onTimeUpdate}
        ></audio>
      </div>
      <div className="audio__progress">
        <ProgressBar
          value={progressBarValue}
          config={config}
          onChange={handleChangeProgressBarValue}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          disabled={isProgressBarDisabled}
        />
      </div>
    </div>
  );
};
