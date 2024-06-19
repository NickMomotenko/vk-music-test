import { Audio } from "./components/Audio";

import testAudio from "./assets/test.mp3";

const App = () => {
  return (
    <div className="app">
      <Audio audioSrc={testAudio} />
    </div>
  );
};

export default App;
