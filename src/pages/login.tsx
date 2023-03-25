import { Box } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {

  return (
    <Box maxWidth="400px" mx="auto" mt="100px">
      <h1>Login</h1>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
