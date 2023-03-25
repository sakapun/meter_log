// src/pages/login.tsx
import { Box, VStack, Heading, Link, Spacer } from "@chakra-ui/react";
import { NextPage } from "next";
import { LoginForm } from "@/components/LoginForm";

const LoginPage: NextPage = () => {
  return (
    <Box>
      <VStack
        spacing={8}
        width="100%"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Heading>メーターログ</Heading>
        <LoginForm />
        <Link href="/signup">新規登録</Link>
      </VStack>
    </Box>
  );
};

export default LoginPage;
