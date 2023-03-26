import {Box, Table, Thead, Tbody, Tr, Th, Td, Button, Tfoot} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {fetchMeters, saveMeterData} from "@/models/meterLogs";
import {MeterData, MeterValues} from "@/types";
import {EditableTr} from "@/components/EditableTr";

export const MeterDataTable = () => {
  const [meterData, setMeterData] = useState<MeterData[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const getMeterData = async () => {
      const meters = await fetchMeters();
      setMeterData(meters);
    };
    getMeterData();
  }, []);

  const handleAddRow = () => {
    setIsEditing(true)
  };

  const handleNewSave = async (data: MeterData) => {
    await saveMeterData(data);
    const meters = await fetchMeters();
    setMeterData(meters);
    setIsEditing(false);
  };

  return (
    <Box overflowX={"auto"} mx="auto">
      <Table>
        <Thead>
          <Tr>
            <Th>年</Th>
            <Th>月</Th>
            <Th>メーター1</Th>
            <Th>メーター2</Th>
            <Th>メーター3</Th>
            <Th>メーター4</Th>
            <Th>メーター5</Th>
            <Th>メーター6</Th>
            <Th>メーター7</Th>
            <Th>メーター8</Th>
            <Th>メーター9</Th>
            <Th>メーター10</Th>
          </Tr>
        </Thead>
        <Tbody>
          {meterData.map((data) => (
            <Tr key={data.id}>
              <Td>{data.year}</Td>
              <Td>{data.month}</Td>
              {data.meters.map((value, i) => (
                <Td key={i}>{value}</Td>
              ))}
            </Tr>
          ))}
          {isEditing && <EditableTr handleNewSave={handleNewSave} data={{
            year: 2023,
            month:1,
            meters: [0 ,0, 0, 0, 0, 0, 0, 0, 0, 0]
          }} />}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={12}>
              <Button size="sm" onClick={handleAddRow}>
                追加
              </Button>
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
