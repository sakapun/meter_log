// src/components/SignUpForm.tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {auth} from "@/firebase/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "next/router";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "エラー",
        description: "パスワードが一致しません。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "アカウント作成成功",
        description: "アカウントが作成されました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await router.push("/");
    } catch (error) {
      toast({
        title: "エラー",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box width="100%" maxWidth="400px" margin="0 auto">
      <Heading textAlign="center" marginBottom="6">
        新規登録
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormControl id="email">
            <FormLabel>メールアドレス</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirm-password">
            <FormLabel>パスワード（確認）</FormLabel>
            <Input
              // src/components/SignUpForm.tsx
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" width="100%" colorScheme="blue">
            新規登録
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export { SignUpForm };
