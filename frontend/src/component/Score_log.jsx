import { Select } from "@yamada-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ScoreLog = () => {
  const [nameList, setNameList] = useState([]);
  //   console.log(nameList);

  useEffect(() => {
    (async () => {
      const names = await axios("/player").then((res) => res.data);
      console.log({ names });
      const chengKey = names.map((obj) => {
        console.log(obj);
        return { value: obj.id, label: obj.name };
      });
      setNameList(chengKey);
    })();
  }, []);
  return (
    <>
      <div>
        hogehoge
        <Select items={nameList} placeholder="プレイヤーを選択" size="lg" />
      </div>
    </>
  );
};

export default ScoreLog;
