import { useState } from "react";
import {MeterData, MeterValues} from "@/types";
import { Tr, Td, Button, Input } from "@chakra-ui/react";

interface Props {
  data: MeterData;
  handleNewSave: (data: MeterData) => Promise<any>
}

const CELL_WIDTH = "60px";

export const EditableTr = ({ data, handleNewSave }: Props) => {
  const [isEditing, setIsEditing] = useState(true);
  const [editData, setEditData] = useState<MeterData>(data);

  const renderCell = (value: any, index: number) => {
    return isEditing ? (
      <Input
        size="sm"
        minWidth={CELL_WIDTH}
        value={editData.meters[index]}
        onChange={(e) => {
          const newMeters = [...editData.meters];
          newMeters[index] = Number(e.target.value);
          setEditData({ ...editData, meters: newMeters });
        }}
      />
    ) : (
      value
    );
  };

  return (
    <Tr>
      <Td>{isEditing ? <Input size="sm" minWidth={CELL_WIDTH} value={editData.year} onChange={(e) => setEditData({ ...editData, year: Number(e.target.value) })} /> : data.year}</Td>
      <Td>{isEditing ? <Input size="sm" minWidth={CELL_WIDTH} value={editData.month} onChange={(e) => setEditData({ ...editData, month: Number(e.target.value) })} /> : data.month}</Td>
      {data.meters.map((value, index) => (
        <Td key={index}>{renderCell(value, index)}</Td>
      ))}
      <Td>
        {isEditing ? (
          <>
            <Button size="sm" colorScheme="green" onClick={() => handleNewSave(editData)}>
              保存
            </Button>
            <Button size="sm" colorScheme="gray" ml={2} onClick={() => setIsEditing(false)}>
              キャンセル
            </Button>
          </>
        ) : (
          <Button size="sm" colorScheme="blue" onClick={() => setIsEditing(true)}>
            編集
          </Button>
        )}
      </Td>
    </Tr>
  );
};
