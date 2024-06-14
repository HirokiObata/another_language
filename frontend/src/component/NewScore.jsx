import {
  ActionIcon,
  Button,
  Center,
  Group,
  Select,
  Space,
  Stack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateScoreInput from "./CreatScoreInput";
import { IconHome } from "@tabler/icons-react";

const NewScore = ({ setViewState }) => {
  const [courses, setCourses] = useState([]);
  const [value, setValue] = useState(new Date());
  const [names, setNames] = useState([]);
  const [indexKey, setIndexKey] = useState("1");
  const [selectedCourse, setSelectedCourse] = useState();

  const buttonRef = React.useRef();
  const handleClick = () => buttonRef.current.click();
  console.log({ selectedCourse });

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
          valueFormat="YYYY-MM-DD"
          ml={"10%"}
          value={value}
          onChange={setValue}
          label="日付入力"
          placeholder="日付選択"
        />
        <Select
          mr={"10%"}
          data={courses}
          label="コースを選択"
          value={selectedCourse}
          onChange={setSelectedCourse}
        />
        <ActionIcon
          mr={"7%"}
          variant="light"
          aria-label="Settings"
          onClick={() => {
            setViewState(true);
          }}
        >
          <IconHome style={{ width: "100%", height: "100%" }} stroke={1.5} />
        </ActionIcon>
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
              selectedCourse={selectedCourse}
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
