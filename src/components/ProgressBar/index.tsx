import { forwardRef } from "react";

import "./styles.scss";

export const ProgressBar = forwardRef((props, ref) => {
  return <div className="progress-bar" ref={ref}></div>;
});
