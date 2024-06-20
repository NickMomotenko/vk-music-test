import "./styles.scss";

type EqualizerProps = {
  lineCounter?: number;
};

export const Equalizer: React.FC<EqualizerProps> = () => {
  let defaultCounterValue = 5;
  let defaultAnimationDuration = 433;

  return (
    <div className="equalizer">
      {[...new Array(defaultCounterValue)].map((_, index) => {
        let stepPercent = 100 / (defaultCounterValue - 1);
        let animationDuration = defaultAnimationDuration - index * 20;

        return (
          <div
            className="equalizer__line"
            key={index}
            style={{
              left: `${index * stepPercent}%`,
              transform: `translateX(-${index * stepPercent}%)`,
              animationDuration: `${animationDuration}ms`,
            }}
          ></div>
        );
      })}
    </div>
  );
};
