import { forwardRef } from "react";

import Slider from "@mui/material/Slider";

import "./styles.scss";

type ProgressBarProps = {
  onChange: (event: any) => void;
  onMouseDown: (event: any) => void;
  onMouseUp: (event: any) => void;
  value: number;
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, onChange, onMouseDown, onMouseUp }, ref) => {
    return (
      <>
        <Slider
          ref={ref}
          aria-label="Volume"
          value={value}
          onChange={onChange}
          size="small"
          className="test"
          defaultValue={70}
          min={0}
          max={218.35}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </>
    );
  }
);
