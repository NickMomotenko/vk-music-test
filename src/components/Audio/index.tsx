import { useEffect, useRef, useState } from "react";

import { IconButton, Text } from "@vkontakte/vkui";
import { Icon16MoreVertical, Icon28Pause, Icon28Play } from "@vkontakte/icons";

import { Equalizer } from "../Equalizer";
import { ProgressBar } from "../ProgressBar";
import { Options } from "../Options";

import { useClickOutside } from "../../hooks/useClickOutside";

import { convertSeconds } from "../../helpers/helpers";

import defaultPosterIcon from "../../assets/icons/audio-poster.svg";

import "./styles.scss";
import { useRangeInput } from "../../hooks/useRangeInput";

type AudioProps = {
  audioSrc: string;
};

export const Audio: React.FC<AudioProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [displayedValue, setDisplayedValue] = useState<string>("");
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const [isProgressBarDisabled, setIsProgressBarDisabled] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const optiosRef = useRef<HTMLDivElement>(null);

  const audioClasses = isPlaying ? "audio audio--playing" : "audio";

  const [config, setConfig] = useRangeInput();

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = 0.5;
      setVolume(0.5);
      setConfig((prevState) => ({
        ...prevState,
        max: audioRef.current.duration,
      }));
      let convertedDuration = convertSeconds(audioRef.current.duration);
      setDisplayedValue(convertedDuration);
    };

    const handleTimeUpdate = () => {
      setCurrentValue(audioRef.current.currentTime);
      setProgressBarValue(audioRef.current.currentTime);
    };

    const handleEnded = () => {
      setCurrentValue(0);
      setIsPlaying(false);
      setProgressBarValue(0);
      setDisplayedValue(duration.toString());
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
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      let convertedCurrentTime = convertSeconds(audioRef.current.currentTime);

      setDisplayedValue(convertedCurrentTime);
    }
  }, [currentValue]);

  useEffect(() => {
    const handleMouseOutside = () => {
      handleMouseUp();
    };

    if (isSeeking) {
      let convertedCurrentTime = convertSeconds(progressBarValue);

      document.addEventListener("mouseup", handleMouseOutside);

      setDisplayedValue(convertedCurrentTime);
    }

    return () => document.removeEventListener("mouseup", handleMouseOutside);
  }, [isSeeking, progressBarValue]);

  const handleAudioClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleOptionsClick = () => {
    setIsOptionsActive((prevState) => !prevState);
  };

  const handleChangeProgressBarValue = (event: any) => {
    setCurrentValue(event.target.value);
    setProgressBarValue(event.target.value);
  };

  const handleMouseDown = () => {
    setIsPlaying(false);
    setIsSeeking(true);
    setIsHovered(true);
  };

  const handleMouseUp = () => {
    audioRef.current.currentTime = progressBarValue;

    setIsPlaying(true);
    setIsSeeking(false);
    setIsHovered(false);
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
          <div className="audio__poster" onClick={handleAudioClick}>
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
              <Icon16MoreVertical width={20} height={20} fill="#2688EB" />
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
        <audio className="audio__player" src={audioSrc} ref={audioRef}></audio>
      </div>
      <div className="audio__progress">
        <ProgressBar
          ref={progressBarRef}
          value={progressBarValue}
          config={config}
          onChange={handleChangeProgressBarValue}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleMouseUp}
          disabled={isProgressBarDisabled}
        />
      </div>
    </div>
  );
};
