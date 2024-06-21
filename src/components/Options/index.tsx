import { forwardRef } from "react";

import { Text } from "@vkontakte/vkui";

import "./styles.scss";

type OptionsProps = {
  data: {
    text: string;
    func: () => void;
  }[];
  onItemClick: () => void;
};

export const Options = forwardRef<HTMLDivElement, OptionsProps>(
  ({ data, onItemClick }, ref) => {
    return (
      <div className="options" ref={ref}>
        <ul className="options__list">
          {data?.map(({ text, func }, index) => (
            <li
              className="options__item"
              key={index}
              onClick={() => {
                func();
                onItemClick();
              }}
            >
              <Text>{text}</Text>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
