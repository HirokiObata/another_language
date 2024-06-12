import { Button, Center, Group, Select, Space, Stack } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DateInput, DatePicker } from "@mantine/dates";
import CreateScoreInput from "./CreatScoreInput";
const NewScore = () => {
  const [courses, setCourses] = useState([]);
  const [value, setValue] = useState(new Date());
  const [names, setNames] = useState([]);
  const [indexKey, setIndexKey] = useState("1");

  const buttonRef = React.useRef();
  const handleClick = () => buttonRef.current.click();

  useEffect(() => {
    (async () => {
      const course = await axios("/api/golf_course").then((res) => res.data);
      console.log("course: ", course);
      const changeKey = course.map((obj) => {
        return { value: `${obj.id}`, label: obj.course_name };
      });
      setCourses(changeKey);
      const names = await axios("/api/player").then((res) => res.data);
      const changeNames = names.map((obj) => {
        return { value: `${obj.id}`, label: obj.name };
      });
      setNames(changeNames);
    })();
  }, []);

  return (
    <>
      <Group justify="space-between">
        <DateInput
          valueFormat="YYYY/MM/DD"
          ml={"10%"}
          value={value}
          onChange={setValue}
          label="日付入力"
          placeholder="日付選択"
        />
        <Select mr={"10%"} data={courses} label="コースを選択" />
      </Group>
      <Space h="xl" />
      <Space h="xl" />
      <Stack>
        <>
          {indexKey.split("").map((i) => (
            <CreateScoreInput
              names={names}
              key={i}
              indexKey={i}
              value={value}
              buttonRef={buttonRef}
            />
          ))}
        </>
      </Stack>
      <Space h={"md"} />

      <Group ml={"7%"} justify="space-between">
        <Group>
          <Button
            onClick={() => {
              indexKey.length <= 3
                ? setIndexKey(indexKey + `${indexKey.length + 1}`)
                : "";
            }}
          >
            +
          </Button>
          <Button
            onClick={() => {
              indexKey.length >= 2
                ? setIndexKey(indexKey.substring(0, indexKey.length - 1))
                : "";
            }}
          >
            -
          </Button>
        </Group>
        <Button mr={"10%"} onClick={handleClick}>
          Submit
        </Button>
      </Group>
    </>
  );
};

export default NewScore;
