import React from 'react';
import { Box, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';

const Header: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('ログアウトしました');
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  };

  return (
    <Box bg={bg} color={color} px={4} py={2}>
      <Flex justifyContent="flex-end" alignItems="center">
        <Button size="sm" colorScheme="blue" onClick={handleLogout}>
          ログアウト
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
