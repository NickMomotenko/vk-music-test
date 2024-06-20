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

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const optiosRef = useRef<HTMLDivElement>(null);

  const audioClasses = isPlaying ? "audio audio--playing" : "audio";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
        audioRef.current.volume = 0.5;
        setVolume(0.5);

        let convertedDuration = convertSeconds(audioRef.current.duration);
        setDisplayedValue(convertedDuration);
      });

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentValue(audioRef.current.currentTime);
      });

      audioRef.current.addEventListener("ended", () => {
        setCurrentValue(0);
        setIsPlaying(false);

        setDisplayedValue(duration.toString());
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata");
        audioRef.current.removeEventListener("timeupdate");
        audioRef.current.removeEventListener("ended");
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

    if (progressBarRef.current) {
      if (currentValue === 0) {
        progressBarRef.current.style.width = 0;
      } else {
        let progressValue =
          (audioRef.current.currentTime * 100) / audioRef.current.duration;

        progressBarRef.current.style.width = `${progressValue.toFixed(2)}%`;
      }
    }
  }, [currentValue]);

  const handleAudioClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleOptionsClick = () => {
    setIsOptionsActive((prevState) => !prevState);
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
              ) : !isHovered && !isPlaying ? (
                <></>
              ) : isPlaying ? (
                <Icon28Pause fill="#fff" />
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
                data={["option 1", "option 2", "option 3"]}
                ref={optiosRef}
                onItemClick={handleOptionsClick}
              />
            )}
          </div>
        </div>
        <audio className="audio__player" src={audioSrc} ref={audioRef}></audio>
      </div>
      <div className="audio__progress">
        <ProgressBar ref={progressBarRef} />
      </div>
    </div>
  );
};
