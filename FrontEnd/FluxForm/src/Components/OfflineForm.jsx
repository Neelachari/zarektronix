import { useEffect, useState } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  useToast,
  Avatar,
  AvatarBadge
} from '@chakra-ui/react';
import axios from 'axios';

const OfflineForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  useEffect(() => {
    const handleOnline = async () => {
      const offlineUserData = JSON.parse(localStorage.getItem('offlineUserData'));
      if (offlineUserData) {
        try {
          const response = await axios.post('https://fluxform-backend-2.onrender.com/users/register', offlineUserData);

          if (response.status >= 200 && response.status < 300) {
            console.log('Offline data submitted successfully:', response.data);
            localStorage.removeItem('offlineUserData');
          } else {
            toast({
              title: 'Error Submitting Offline Data',
              description: `Unexpected status code: ${response.status}`,
              status: 'error',
              duration: 5000,
              position: 'top',
              isClosable: true,
            });
          }
        } catch (error) {
          console.error('Error submitting offline data:', error.message);

          toast({
            title: 'Error Submitting Offline Data',
            description: 'An error occurred while submitting your registration.',
            status: 'error',
            duration: 5000,
            position: 'top',
            isClosable: true,
          });
        }
      }
    };

    // Add event listener for online event
    window.addEventListener('online', handleOnline);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener('online', handleOnline);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('offlineUserData', JSON.stringify({ name, email, password }));

    setName('');
    setEmail('');
    setPassword('');

    toast({
      title: 'Register Successful.',
      description: 'You are offline. Your registration will be submitted when you are back online.',
      status: 'warning',
      duration: 5000,
      position: 'top',
      isClosable: true,
    });
  };

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4} border={"1px solid gray"} p={{ base: 3, sm: 6 }}   boxShadow="lg" rounded="lg">
          <Stack align="center">
            <Heading fontSize="2xl">Offline Sign in to your account</Heading>
            <Avatar>
              <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' />
            </Avatar>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
            border={"1px solid gray"}
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
            onSubmit={handleSubmit}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="Name">
                <FormLabel>Name</FormLabel>
                <Input
                  rounded="md"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder='Enter your Name'
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  rounded="md"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='Enter your email'
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='Enter your password'
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('gray.300', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('gray.400', 'gray.800')
                      }}
                      onClick={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: 'green.500'
                }}
                rounded="md"
                w="100%"
                type="submit"
              >
                Register
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default OfflineForm;
