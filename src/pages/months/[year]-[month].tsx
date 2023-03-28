import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import {useEffect} from "react";
import {fetchMeterByYearMonth} from "@/models/meterLogs";

export default function MonthPage() {
  const router = useRouter()
  const path = router.asPath.split("/")[2];
  const [year, month] = path.split("-");

  useEffect(() => {
    (async () => {
      const doc = await fetchMeterByYearMonth(Number(year), Number(month));
      console.log(doc)
    })()
  })

  return (
    <Box>
      <h1>{year}年{month}月の詳細ページ</h1>
      {/* ここに詳細ページのコンポーネントを書く */}
    </Box>
  )
}
