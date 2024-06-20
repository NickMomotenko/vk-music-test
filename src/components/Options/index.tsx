import { forwardRef } from "react";

import { Text } from "@vkontakte/vkui";

import "./styles.scss";

type OptionsProps = {
  data: string[];
  onItemClick: (event: any) => void;
};

export const Options = forwardRef<HTMLDivElement, OptionsProps>(
  ({ data, onItemClick }, ref) => {
    return (
      <div className="options" ref={ref}>
        <ul className="options__list">
          {data?.map((text, index) => (
            <li className="options__item" key={index} onClick={onItemClick}>
              <Text>{text}</Text>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
