import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login realizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="md" py={20}>
        <VStack spacing={8}>
          {/* Logo e Título */}
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.900">
              Blockchain Insper
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Painel Administrativo
            </Text>
          </VStack>

          {/* Formulário de Login */}
          <Box
            w="full"
            bg="white"
            p={8}
            borderRadius="xl"
            shadow="lg"
            border="1px"
            borderColor="gray.200"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <Heading size="lg" color="gray.900" textAlign="center">
                  Entrar no Sistema
                </Heading>

                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@blockchaininsper.com.br"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    size="lg"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  w="full"
                  isLoading={loading}
                  loadingText="Entrando..."
                >
                  Entrar
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Credenciais padrão (apenas para desenvolvimento) */}
          {process.env.NODE_ENV === 'development' && (
            <Box
              w="full"
              bg="blue.50"
              p={4}
              borderRadius="md"
              border="1px"
              borderColor="blue.200"
            >
              <VStack spacing={2} textAlign="center">
                <Text fontSize="sm" fontWeight="bold" color="blue.800">
                  Credenciais Padrão (Desenvolvimento)
                </Text>
                <Text fontSize="sm" color="blue.700">
                  Email: admin@blockchaininsper.com.br
                </Text>
                <Text fontSize="sm" color="blue.700">
                  Senha: BlockchainInsper2024!
                </Text>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
