import { useEffect, useRef, useState } from "react";

import { Text } from "@vkontakte/vkui";

import defaultPoster from "../../assets/icons/audio-poster.png";

import "./styles.scss";
import { converSeconds } from "../../helpers/helpers";

type AudioProps = {
  audioSrc?: string;
};

export const Audio: React.FC<AudioProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(0);

  const [displayedValue, setDisplayedValue] = useState<string>("");

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        let convertedDuration = converSeconds(audioRef.current.duration);
        setDuration(convertedDuration);

        setDisplayedValue(convertedDuration);
      });

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentValue(audioRef.current.currentTime);
      });
    }
  }, []);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      let convertedCurrentTime = converSeconds(audioRef.current.currentTime);

      setDisplayedValue(convertedCurrentTime);
    }
  }, [currentValue]);

  return (
    <div className="audio">
      <div className="audio__container">
        <div className="audio__col">
          <div
            className="audio__poster"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <img
              src={defaultPoster}
              alt="poster image"
              className="audio__poster-img"
            />
            <div className="audio__poster-effect"></div>
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
    </div>
  );
};
