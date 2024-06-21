import { Audio } from "./components/Audio";

import testAudio from "./assets/test.mp3";

const App = () => {
  return (
    <div className="app">
      <div className="app__content">
        <Audio audioSrc={testAudio} />
      </div>
    </div>
  );
};

export default App;
