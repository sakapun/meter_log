// src/pages/signup.tsx
import { Box, VStack, Heading, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import { SignUpForm } from "../components/SignUpForm";

const SignUpPage: NextPage = () => {
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
        <SignUpForm />
        <Link href="/login">ログイン</Link>
      </VStack>
    </Box>
  );
};

export default SignUpPage;
