import { useEffect, useState } from "react";
import { MeterData } from "@/types";
import { useMeters } from "@/context/MeterContext";
import { getPreviousMonth } from "@/utils/date";

export const useMonthDetails = (
  year: number | undefined,
  month: number | undefined
) => {
  const { meterData } = useMeters();
  const [currentMonthData, setCurrentMonthData] = useState<MeterData | undefined>();
  const [previousMonthData, setPreviousMonthData] = useState<MeterData | undefined>();

  useEffect(() => {
    if (year && month && meterData.length > 0) {
      const currentData = meterData.find((meter) => {
        return meter.year === year && meter.month === month;
      });
      setCurrentMonthData(currentData);

      const { prevYear, prevMonth } = getPreviousMonth(year, month);
      const prevData = meterData.find((meter) => {
        return meter.year === prevYear && meter.month === prevMonth;
      });
      setPreviousMonthData(prevData);
    }
  }, [year, month, meterData]);

  const calculateDifferences = () => {
    if (!currentMonthData || !previousMonthData) {
      return [];
    }

    const differences = [];
    for (let i = 1; i <= 10; i++) {
      const diff = currentMonthData[`value${i}`] - previousMonthData[`value${i}`];
      differences.push(diff);
    }

    return differences;
  };

  const differences = calculateDifferences();

  // ここで料金設定値を定義します（必要に応じて変更してください）
  const rates = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const calculateAmounts = () => {
    return differences.map((diff, index) => diff * rates[index]);
  };

  const amounts = calculateAmounts();

  return { currentMonthData, previousMonthData, differences, rates, amounts };
};
