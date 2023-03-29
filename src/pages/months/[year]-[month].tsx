import { useRouter } from "next/router";
import { useMonthDetails } from "@/hooks/useMonthDetails";
import { Box, VStack, HStack, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const MonthDetailsPage = () => {
  const router = useRouter();
  const path = router.asPath.split("/")[2];
  const [year, month] = path.split("-");
  const currentYear = year ? parseInt(year as string) : undefined;
  const currentMonth = month ? parseInt(month as string) : undefined;
  const { currentMonthData, previousMonthData, differences, rates, amounts } = useMonthDetails(currentYear, currentMonth);

  if (!currentMonthData || !previousMonthData) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <VStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Meter</Th>
              <Th>今月</Th>
              <Th>先月</Th>
              <Th>差</Th>
              <Th>料金設定値</Th>
              <Th>金額</Th>
            </Tr>
          </Thead>
          <Tbody>
            {differences.map((diff, index) => (
              <Tr key={index}>
                <Td>{`Meter ${index + 1}`}</Td>
                <Td>{currentMonthData[`value${index + 1}`]}</Td>
                <Td>{previousMonthData[`value${index + 1}`]}</Td>
                <Td>{diff}</Td>
                <Td>{rates[`meter${index + 1}`]}</Td>
                <Td>{amounts[index]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default MonthDetailsPage;
