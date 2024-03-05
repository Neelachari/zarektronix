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
  Checkbox,
  Link,
  Text,
  AvatarBadge,
  Avatar
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';

const OfflineForm = ({toggleMode}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast()

  useEffect(() => {
    // Check if there is offline user data in local storage when the component mounts
    const offlineUserData = JSON.parse(localStorage.getItem('offlineUserData'));
    if (offlineUserData) {
      // Automatically attempt to submit the offline data if available
      submitOfflineData(offlineUserData);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const submitOfflineData = async (offlineUserData) => {
    try {
      // Make a POST request to your local server to submit the offline data
      const response = await axios.post('https://fluxform-backend-2.onrender.com/users/register', offlineUserData);

      // Handle the response accordingly (log or display a success message)
      console.log('Offline data submitted successfully:', response.data);

      // Clear offline user data from local storage after successful submission
      localStorage.removeItem('offlineUserData');
    } catch (error) {
      // Handle errors (log or display an error message)
      console.error('Error submitting offline data:', error.message);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user data locally for later submission when online
    localStorage.setItem('offlineUserData', JSON.stringify({ name, email, password }));

    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');

    // Inform the user about offline registration
    // alert('You are offline. Your registration will be submitted when you are back online.');
    submitOfflineData({ name, email, password });
    toast({
        title: 'Register Successful.',
        description: "You are offline. Your registration will be submitted when you are back online.",
        status: 'success',
        duration: 3000,
        position:"top",
        isClosable: true,
      })
  };


  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Offline Sign in to your account</Heading>
            <Avatar  >
    <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' />
  </Avatar>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
            onSubmit={handleSubmit}
          >
            <VStack spacing={4} w="100%">
            <FormControl id="Name">
                <FormLabel>Name</FormLabel>
                <Input rounded="md" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Enter your Name' />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input rounded="md" type="email" value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // validateEmail();
          }}
          required placeholder='Enter your email' />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input rounded="md" type={show ? 'text' : 'password'}  value={password}
                      onChange={(e) => setPassword(e.target.value)} required  placeholder='Enter your password' />
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
             <Button onClick={toggleMode}>Switch to Offline Mode</Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default OfflineForm;