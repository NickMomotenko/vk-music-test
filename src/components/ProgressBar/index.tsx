import { forwardRef } from "react";

import "./styles.scss";

type ProgressBarProps = {};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({}, ref) => {
    return <div className="progress-bar" ref={ref}></div>;
  }
);
