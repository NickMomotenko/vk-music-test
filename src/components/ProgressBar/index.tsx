import { forwardRef } from "react";

import Slider from "@mui/material/Slider";

import "./styles.scss";

type ProgressBarProps = {
  onChange: (event: any) => void;
  onMouseDown: (event: any) => void;
  onMouseUp: () => void;
  value: number;
  config: any;
  disabled?: boolean;
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, config, onChange, onMouseDown, onMouseUp, disabled }, ref) => {
    return (
      <>
        <Slider
          size="small"
          ref={ref}
          value={value}
          onChange={(event: any) => onChange(event.target)}
          className="progress-bar"
          min={config.min}
          max={config.max}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          disabled={disabled}
        />
      </>
    );
  }
);
