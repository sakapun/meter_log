import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

export default function MonthPage() {
  const router = useRouter()
  const path = router.asPath.split("/")[2];
  const [year, month] = path.split("-");

  return (
    <Box>
      <h1>{year}年{month}月の詳細ページ</h1>
      {/* ここに詳細ページのコンポーネントを書く */}
    </Box>
  )
}
