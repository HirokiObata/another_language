import { ActionIcon, Container, Group, Select } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Score_table from "./Score_table";

const ScoreLog = ({ setViewState }) => {
  const [nameList, setNameList] = useState([]);
  const [scoreCard, setScoreCard] = useState([]);

  useEffect(() => {
    (async () => {
      const names = await axios.get("/api/player").then((res) => res.data);
      const chengKey = names.map((obj) => {
        return { value: `${obj.id}`, label: obj.name };
        // return obj.name;
      });
      setNameList(chengKey);
      const scores = await axios.get("/api/score_card").then((res) => res.data);
      console.log("scores: ", scores);
      setScoreCard(scores);
    })();
  }, []);
  return (
    <>
      <div>
        <Group justify="space-between">
          <Select
            ml={"7%"}
            w={"300"}
            data={nameList}
            onChange={async (value) => {
              try {
                const scores = await axios(`/api/score_card/${value}`).then(
                  (res) => res.data
                );
                console.log("scores: ", scores);
                setScoreCard(scores);
              } catch (e) {
                setScoreCard([]);
              }
            }}
          />
          <ActionIcon
            variant="light"
            aria-label="Settings"
            mr={"6%"}
            onClick={() => {
              setViewState(false);
            }}
          >
            <IconPlus
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#DCE4F5",
              }}
              stroke={1.5}
              color="#000"
            />
          </ActionIcon>
        </Group>
        <Container>
          <Score_table scoreCard={scoreCard} setScoreCard={setScoreCard} />
        </Container>
      </div>
    </>
  );
};

export default ScoreLog;
