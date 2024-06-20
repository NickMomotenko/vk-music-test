import { useEffect, useRef, useState } from "react";

import { Text } from "@vkontakte/vkui";

import defaultPoster from "../../assets/icons/audio-poster.png";

import "./styles.scss";
import { convertSeconds } from "../../helpers/helpers";
import { Equalizer } from "../Equalizer";
import { ProgressBar } from "../ProgressBar";

type AudioProps = {
  audioSrc?: string;
};

export const Audio: React.FC<AudioProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(0);

  const [displayedValue, setDisplayedValue] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const audioClasses = isPlaying ? "audio audio--playing" : "audio";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);

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
        let value =
          (audioRef.current.currentTime * 100) / audioRef.current.duration;

        progressBarRef.current.style.width = `${value.toFixed(2)}%`;
      }
    }
  }, [currentValue]);

  return (
    <div className={audioClasses} onClick={() => setIsPlaying(!isPlaying)}>
      <div className="audio__container">
        <div className="audio__col">
          <div className="audio__poster">
            <img
              src={defaultPoster}
              alt="poster image"
              className="audio__poster-img"
            />
            <div className="audio__poster-effect">
              <Equalizer />
            </div>
          </div>
          <div className="audio__info">
            <Text className="audio__title">Трек</Text>
            <Text className="audio__executor">Исполнитель</Text>
          </div>
        </div>
        <div className="audio__col">
          <Text className="audio__timer">{displayedValue}</Text>
        </div>
        <audio className="audio__player" src={audioSrc} ref={audioRef}></audio>
      </div>
      <div className="audio__progress">
        <ProgressBar ref={progressBarRef} />
      </div>
    </div>
  );
};
