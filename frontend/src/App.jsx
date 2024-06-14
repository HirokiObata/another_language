import { useState } from "react";

// import "./App.css";
import ScoreCard from "./component/ScoreCard";
import ScoreLog from "./component/Score_log";
import NewScore from "./component/NewScore";
import {
  BackgroundImage,
  Box,
  Center,
  Space,
  Text,
  Title,
} from "@mantine/core";

function App() {
  const [viewState, setViewState] = useState(true);

  return (
    <>
      <BackgroundImage src="../public/back.jpg">
        <Box h={"100vh"}>
          <Center>
            <Title order={1} ff={"Meiryo"}>
              GOLF_SCORE_MEMO
            </Title>
          </Center>
          <Space h="md" />
          {viewState ? (
            <ScoreLog setViewState={setViewState} />
          ) : (
            <NewScore setViewState={setViewState} />
          )}
        </Box>
      </BackgroundImage>
    </>
  );
}

export default App;
