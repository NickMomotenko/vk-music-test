import { Text } from "@vkontakte/vkui";
import "./styles.scss";
import { forwardRef } from "react";

type OptionsProps = {
  data: string[];
};

export const Options = forwardRef<HTMLDivElement, OptionsProps>(
  ({ data }, ref) => {
    return (
      <div className="options" ref={ref}>
        <ul className="options__list">
          {data?.map((text, index) => (
            <li className="options__item" key={index}>
              <Text>{text}</Text>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
