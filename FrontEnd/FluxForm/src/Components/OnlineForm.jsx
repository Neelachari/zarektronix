import { useState } from 'react';
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

const OnlineForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPassword,setIsPassword]=useState(true)
  const toast = useToast()

  const validateEmail = () => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };


  const validatePassword = () => {
    // Password validation with at least one uppercase letter and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    setIsPassword(passwordRegex.test(password));
  };

  

  const handleSubmit = async  (e) => {
    e.preventDefault();

    // Validate email before submission
    validateEmail();
    

    // Check if email is valid before proceeding
    if (!isEmailValid) {
      // alert('Please enter a valid email address.');
      toast({
        title: 'Register Unsuccessful.',
        description: "Please enter a valid email address.",
        status: 'waning',
        duration: 3000,
        position:"top",
        isClosable: true,
      })
      return;
    }

    validatePassword();

    if (!isPassword) {
      // alert('Please enter a valid email address.');
      toast({
        title: 'Register Unsuccessful.',
        description: "The password should contain special charector ~!@#$%^&*(){}[]",
        status: 'waning',
        duration: 3000,
        position:"top",
        isClosable: true,
      })
      return;
    }

    try {
        // Make a POST request to your local server
        const response = await axios.post('https://fluxform-backend-2.onrender.com/users/register', {
          name,
          email,
          password,
        });
  
        // Handle the response accordingly (log or display a success message)
        console.log('Server response:', response.data);
  
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
        toast({
            title: 'Register Successful.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            position:"top",
            isClosable: true,
          })
      } catch (error) {
        // Handle errors (log or display an error message)
        console.log('Error submitting registration:', error.message);
      }



  };


  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}  border={"1px solid gray"} p={{ base: 3, sm: 6 }}   boxShadow="lg" rounded="lg">
          <Stack align="center">
            <Heading fontSize="2xl">Online Sign in to your account</Heading>
            <Avatar  >
    <AvatarBadge boxSize='1.25em' bg='green.500' />
  </Avatar>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
           
            
            // boxShadow="lg"
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
            validateEmail();
          }}
          required placeholder='Enter your email' />
          <Text textAlign={"left"}>{!isEmailValid && <span style={{ color: 'red' }}>Invalid email address</span>}</Text>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input rounded="md" type={show ? 'text' : 'password'}  value={password}
                      onChange={(e) => {setPassword(e.target.value); validatePassword();}} required placeholder='Enter your password'  />
                     
                
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
                <Text textAlign={"left"} fontSize={"15px"} >{!isPassword && <span style={{ color: 'red' }}>should have special charectors</span>}</Text>
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

export default OnlineForm;