import { useState } from "react";
import { MeterData } from "@/types";
import {Tr, Td, Button, Input} from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  data: MeterData;
  handleNewSave: (data: MeterData) => Promise<any>
  defaultMode: "new" | "view"
}

const CELL_WIDTH = "60px";

export const EditableTr = ({ data, handleNewSave, defaultMode }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(defaultMode === "new");
  const [editData, setEditData] = useState<MeterData>(data);

  return isEditing ? (
    <Tr>
      <Td>
        <Input
          size="sm"
          minWidth={CELL_WIDTH}
          value={editData.year}
          onChange={(e) => setEditData({ ...editData, year: Number(e.target.value) })}
        />
      </Td>
      <Td>
        <Input
          size="sm"
          minWidth={CELL_WIDTH}
          value={editData.month}
          onChange={(e) => setEditData({ ...editData, month: Number(e.target.value) })}
        />
      </Td>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <Td key={index}>
            <Input
              size="sm"
              minWidth={CELL_WIDTH}
              value={editData[`value${index + 1}`]}
              onChange={(e) => {
                setEditData({ ...editData, [`value${index + 1}`]: Number(e.target.value) });
              }}
            />
          </Td>
        ))}
      <Td>
        <Button size="sm" colorScheme="green" onClick={async () => {
          setIsEditing(false);
          await handleNewSave(editData);
        }}>
          保存
        </Button>
        <Button size="sm" colorScheme="gray" ml={2} onClick={() => setIsEditing(false)}>
          キャンセル
        </Button>
      </Td>
    </Tr>
  ) : (
    <Tr>
      <Td>{data.year}</Td>
      <Td>
        <Link href={`/months/${data.year}-${data.month}`}>
          {data.month}
        </Link>
      </Td>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <Td key={index}>{data[`value${index + 1}`]}</Td>
        ))}
      <Td>
        <Button size="sm" colorScheme="blue" onClick={() => setIsEditing(true)}>
          編集
        </Button>
      </Td>
    </Tr>
  );
};
