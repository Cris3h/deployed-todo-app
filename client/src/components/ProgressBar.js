import { colors } from "../helpers";

const ProgressBar = ({ progress }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
