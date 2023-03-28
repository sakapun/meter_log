import {Box, Table, Thead, Tbody, Tr, Th, Td, Button, Tfoot} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {fetchMeters, saveMeterData} from "@/models/meterLogs";
import {MeterData} from "@/types";
import {EditableTr} from "@/components/EditableTr";

export const MeterDataTable = () => {
  const [meterData, setMeterData] = useState<MeterData[]>([]);
  const [isNew, setIsNew] = useState<boolean>(false);

  useEffect(() => {
    const getMeterData = async () => {
      const meters = await fetchMeters();
      setMeterData(meters);
    };
    getMeterData();
  }, []);

  const handleAddRow = () => {
    setIsNew(true)
  };

  const handleNewSave = async (data: MeterData) => {
    await saveMeterData(data);
    const meters = await fetchMeters();
    setMeterData(meters);
    setIsNew(false);
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
            <EditableTr
              key={`${data.year}-${data.month}`}
              handleNewSave={handleNewSave}
              defaultMode={"view"}
              data={data} />
          ))}
          {isNew && (
            <EditableTr
              handleNewSave={handleNewSave}
              data={{
                year: 2023,
                month:1,
                ...Array(10).fill(0).reduce((acc, _, i) => {
                  acc[`value${i + 1}`] = 0;
                  return acc;
                }, {}),}}
              defaultMode={"new"}
            />
          )}
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
