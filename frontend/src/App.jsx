import { useState } from "react";

import "./App.css";
import ScoreCard from "./component/ScoreCrad";
import ScoreLog from "./component/SCORE_log";
import NewScore from "./component/NewScore";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>GOLF_SCORE_MEMO</div>
      <ScoreCard />
      <ScoreLog />
      <NewScore />
    </>
  );
}

export default App;
