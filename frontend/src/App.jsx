import { useState } from "react";

// import "./App.css";
import ScoreCard from "./component/ScoreCard";
import ScoreLog from "./component/Score_log";
import NewScore from "./component/NewScore";
import { Center, Space, Text, Title } from "@mantine/core";

function App() {
  const [viewState, setViewState] = useState(true);

  return (
    <>
      <Center>
        <Title order={1}>GOLF_SCORE_MEMO</Title>
      </Center>
      <Space h="md" />
      {viewState ? (
        <ScoreLog setViewState={setViewState} />
      ) : (
        <NewScore setViewState={setViewState} />
      )}
    </>
  );
}

export default App;
