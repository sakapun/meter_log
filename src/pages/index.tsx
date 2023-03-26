// src/pages/index.tsx
import { Box, Button, Heading, Link, VStack } from '@chakra-ui/react';
import { useAuth } from '@/context/AuthContext';

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <VStack spacing={6} alignItems="center" justifyContent="center" minH="100vh">
        <Heading>Welcome to Meter Log</Heading>
        <Box>
          <Link href="/login">
            <Button colorScheme="blue" size="lg">
              Log In
            </Button>
          </Link>
        </Box>
      </VStack>
    );
  }

  return (
    <VStack spacing={6} alignItems="center" justifyContent="center" minH="100vh">
      <Heading>Welcome, {user.displayName || user.email}!</Heading>
      {/* Add your authenticated content here */}
      <Link href="/view" >見るページ</Link>
    </VStack>
  );
};

export default Home;
``
