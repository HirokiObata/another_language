import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  Select,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Score_table from "./Score_table";
import { IconPlus } from "@tabler/icons-react";

const ScoreLog = () => {
  const [nameList, setNameList] = useState([]);
  const [selectedName, setSelectedName] = useState();
  const [scoreCard, setScoreCard] = useState([]);

  useEffect(() => {
    (async () => {
      const names = await axios("/api/player").then((res) => res.data);
      const chengKey = names.map((obj) => {
        return { value: `${obj.id}`, label: obj.name };
        // return obj.name;
      });
      setNameList(chengKey);
      const scores = await axios("/api/score_card").then((res) => res.data);
      console.log("scores: ", scores);
      setScoreCard(scores);
    })();
  }, []);
  return (
    <>
      <div>
        <Group justify="space-between">
          <Select
            ml={"30"}
            w={"30%"}
            data={nameList}
            onChange={async (value) => {
              try {
                setSelectedName(value);
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
          <ActionIcon variant="light" aria-label="Settings" mr={"6%"}>
            <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
        <Container>
          <Score_table scoreCard={scoreCard} />
        </Container>
      </div>
    </>
  );
};

export default ScoreLog;
