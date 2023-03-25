import { Box, Button, Heading, Link, VStack } from '@chakra-ui/react';

const Home = () => {
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
};

export default Home;
