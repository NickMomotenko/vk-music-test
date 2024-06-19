import { useState } from "react";

import { Text } from "@vkontakte/vkui";

import "./styles.scss";

type AudioProps = {
  audioSrc?: string;
};

export const Audio: React.FC<AudioProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  return (
    <div className="audio">
      <div className="audio__container">
        <div className="audio__poster">
          <img src="" alt="" className="audio__poster-img" />
        </div>
        <div className="audio__info">
          <Text className="audio__title">Трек</Text>
          <Text className="audio__executor">Исполнитель</Text>
        </div>
        <div>
          <Text className="audio__timer">00:00</Text>
        </div>
        <audio className="audio__" src=""></audio>
      </div>
    </div>
  );
};
