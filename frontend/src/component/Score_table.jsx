import { ActionIcon, Table } from "@mantine/core";
import { IconAdjustments, IconAlignJustified } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

const Score_table = ({ scoreCard }) => {
  //   const [scoreCard, setScoreCard] = useState([]);

  //   useEffect(() => {
  //     (async () => {
  //       const scores = await axios("/api/score_card").then((res) => res.data);
  //       console.log("scores: ", scores);
  //       setScoreCard(scores);
  //     })();
  //   }, []);

  const rows = scoreCard.map((element) => {
    const outScore =
      element.hole1 +
      element.hole2 +
      element.hole3 +
      element.hole4 +
      element.hole5 +
      element.hole6 +
      element.hole7 +
      element.hole8 +
      element.hole9;
    const inScore =
      element.hole11 +
      element.hole12 +
      element.hole13 +
      element.hole14 +
      element.hole15 +
      element.hole16 +
      element.hole17 +
      element.hole18 +
      element.hole10;

    return (
      <Table.Tr key={element.id}>
        <Table.Td>{element.playerid}</Table.Td>
        <Table.Td>{element.courseid}</Table.Td>
        <Table.Td>{outScore}</Table.Td>
        <Table.Td>{inScore}</Table.Td>
        <Table.Td>{outScore + inScore}</Table.Td>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>
          <ActionIcon variant="light" aria-label="Settings">
            <IconAlignJustified
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>playerName</Table.Th>
          <Table.Th>courseName</Table.Th>
          <Table.Th>OUT-Score</Table.Th>
          <Table.Th>IN-Score</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th>date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
export default Score_table;
