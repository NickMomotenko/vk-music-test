import { forwardRef } from "react";

import Slider from "@mui/material/Slider";

import "./styles.scss";

type ProgressBarProps = {
  onChange: (event: any) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onClick: () => void;
  value: number;
  config: any;
  disabled?: boolean;
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { value, config, onChange, onMouseDown, onMouseUp, onClick, disabled },
    ref
  ) => {
    return (
      <>
        <Slider
          ref={ref}
          aria-label="Track bar"
          value={value}
          onChange={onChange}
          size="small"
          className="progress-bar"
          defaultValue={config.defaultValue}
          min={config.min}
          max={config.max}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onClick={onClick}
          disabled={disabled}
        />
      </>
    );
  }
);
