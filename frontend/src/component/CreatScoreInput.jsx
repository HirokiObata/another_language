import { Button, Group, NumberInput, Select, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import axios from "axios";

const CreateScoreInput = ({
  names,
  indexKey,
  value,
  buttonRef,
  selectedCourse,
}) => {
  const holeIndex = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  const form = useForm({
    mode: "controlled",
    initialValues: {
      hole1: "",
      hole2: "",
      hole3: "",
      hole4: "",
      hole5: "",
      hole6: "",
      hole7: "",
      hole8: "",
      hole9: "",
      hole10: "",
      hole11: "",
      hole12: "",
      hole13: "",
      hole14: "",
      hole15: "",
      hole16: "",
      hole17: "",
      hole18: "",
      date: "",
      playerid: "",
      courseid: "",
      cardid: 111,
    },
  });

  useEffect(() => {
    console.log("Value: ", value);
    console.log("indexkey: ", indexKey);
    console.log("selectedCourseEffect: ", selectedCourse);
    form.setFieldValue("courseid", selectedCourse);
    form.setFieldValue("date", value);
  }, [value, selectedCourse]);

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        console.log({ values });
        const res = await axios
          .post("/api/score_card", values)
          .then((res) => res.data);
        console.log({ res });
      })}
    >
      <Group>
        <Text ml={"5%"}>{indexKey}</Text>
        <Select
          mr={"5"}
          data={names}
          w={120}
          placeholder="名前を選択"
          label={"名前入力"}
          key={form.key("playerid")}
          {...form.getInputProps("playerid")}
        />
        {holeIndex.map((i) => (
          <NumberInput
            // hideControls
            w={65}
            m={1}
            min={1}
            key={form.key(`hole${i}`)}
            {...form.getInputProps(`hole${i}`)}
            label={`${i}H`}
          />
        ))}

        <Button type="submit" ref={buttonRef}>
          submit
        </Button>
      </Group>
    </form>
  );
};
export default CreateScoreInput;
