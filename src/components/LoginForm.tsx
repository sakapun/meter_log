// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import {useRouter} from "next/router";

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('ログイン成功');
      await router.push('/');
    } catch (error) {
      console.error('ログイン失敗:', error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%" maxWidth="400px" mx="auto">
      <VStack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          ログイン
        </Button>
      </VStack>
    </Box>
  );
};
