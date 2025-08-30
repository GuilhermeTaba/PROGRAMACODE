import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Spinner,
  Center,

  Divider,
  Avatar,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaUser, FaKey, FaUserShield } from 'react-icons/fa';
import apiService from '../../services/api';

export default function ConfiguracoesPerfil() {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState({
    nome: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  
  const toast = useToast();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setPageLoading(true);
    try {
      const response = await apiService.getMe();
      if (response.user) {
        setUserData(response.user);
        setProfileData({
          nome: response.user.nome,
          email: response.user.email
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar dados do usuário',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setPageLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!profileData.nome || !profileData.email) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Nome e email são obrigatórios',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setProfileLoading(true);
    try {
      await apiService.updateAdmin(userData.id, {
        nome: profileData.nome,
        email: profileData.email,
        role: userData.role,
        ativo: true
      });
      
      // Atualizar dados locais
      setUserData(prev => ({
        ...prev,
        nome: profileData.nome,
        email: profileData.email
      }));

      // Atualizar localStorage
      const storedUser = JSON.parse(localStorage.getItem('admin_user') || '{}');
      localStorage.setItem('admin_user', JSON.stringify({
        ...storedUser,
        nome: profileData.nome,
        email: profileData.email
      }));
      
      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwordData.senhaAtual || !passwordData.novaSenha || !passwordData.confirmarSenha) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos de senha',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordData.novaSenha !== passwordData.confirmarSenha) {
      toast({
        title: 'Senhas não coincidem',
        description: 'A nova senha e a confirmação devem ser iguais',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordData.novaSenha.length < 8) {
      toast({
        title: 'Senha muito curta',
        description: 'A nova senha deve ter pelo menos 8 caracteres',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setPasswordLoading(true);
    try {
      await apiService.changePassword(passwordData.senhaAtual, passwordData.novaSenha);
      
      // Limpar campos
      setPasswordData({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
      });
      
      toast({
        title: 'Senha alterada',
        description: 'Sua senha foi alterada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao alterar senha',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (pageLoading) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="red.500" />
          <Text>Carregando dados do perfil...</Text>
        </VStack>
      </Center>
    );
  }

  if (!userData) {
    return (
      <Container maxW="4xl" py={8}>
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>Erro ao carregar perfil!</AlertTitle>
            <AlertDescription>
              Não foi possível carregar os dados do seu perfil. Tente fazer login novamente.
            </AlertDescription>
          </Box>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Configurações do Perfil</Heading>
          <Text color="gray.600">
            Gerencie suas informações pessoais e configurações de segurança
          </Text>
        </Box>

        {/* Informações do Usuário */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.200">
            <VStack spacing={6} align="stretch">
              <HStack spacing={4}>
                <Avatar 
                  size="xl" 
                  name={userData.nome}
                  bg="red.500"
                  color="white"
                />
                <Box flex={1}>
                  <Heading size="md">{userData.nome}</Heading>
                  <Text color="gray.600" mb={2}>{userData.email}</Text>
                  <HStack spacing={2}>
                    <Badge 
                      colorScheme={userData.role === 'super_admin' ? 'red' : 'blue'}
                      variant="subtle"
                      leftIcon={userData.role === 'super_admin' ? <FaUserShield /> : <FaUser />}
                    >
                      {userData.role === 'super_admin' ? 'Super Administrador' : 'Administrador'}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Último login: {formatDate(userData.ultimoLogin)}
                  </Text>
                </Box>
              </HStack>
            </VStack>
        </Box>

        {/* Editar Informações Pessoais */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.200">
            <form onSubmit={handleProfileSubmit}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" color="gray.700">Informações Pessoais</Heading>
                
                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Nome Completo</FormLabel>
                    <Input
                      value={profileData.nome}
                      onChange={(e) => setProfileData({...profileData, nome: e.target.value})}
                      placeholder="Seu nome completo"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                  </FormControl>
                </HStack>

                <Button
                  type="submit"
                  colorScheme="red"
                  size="lg"
                  isLoading={profileLoading}
                  loadingText="Salvando..."
                  leftIcon={<FaUser />}
                >
                  Salvar Informações
                </Button>
              </VStack>
            </form>
        </Box>

        {/* Alterar Senha */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.200">
            <form onSubmit={handlePasswordSubmit}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" color="gray.700">Alterar Senha</Heading>
                
                <FormControl isRequired>
                  <FormLabel>Senha Atual</FormLabel>
                  <Input
                    type="password"
                    value={passwordData.senhaAtual}
                    onChange={(e) => setPasswordData({...passwordData, senhaAtual: e.target.value})}
                    placeholder="Digite sua senha atual"
                  />
                </FormControl>

                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Nova Senha</FormLabel>
                    <Input
                      type="password"
                      value={passwordData.novaSenha}
                      onChange={(e) => setPasswordData({...passwordData, novaSenha: e.target.value})}
                      placeholder="Mínimo 8 caracteres"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Confirmar Nova Senha</FormLabel>
                    <Input
                      type="password"
                      value={passwordData.confirmarSenha}
                      onChange={(e) => setPasswordData({...passwordData, confirmarSenha: e.target.value})}
                      placeholder="Digite novamente"
                    />
                  </FormControl>
                </HStack>

                <Button
                  type="submit"
                  colorScheme="orange"
                  size="lg"
                  isLoading={passwordLoading}
                  loadingText="Alterando..."
                  leftIcon={<FaKey />}
                >
                  Alterar Senha
                </Button>
              </VStack>
            </form>
        </Box>
      </VStack>
    </Container>
  );
}
