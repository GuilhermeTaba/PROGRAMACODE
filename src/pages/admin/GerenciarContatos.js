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
  Textarea,
  Button,
  useToast,
  Spinner,
  Center,

  Divider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import apiService from '../../services/api';

export default function GerenciarContatos() {
  const [formData, setFormData] = useState({
    email: '',
    telefone: '',
    endereco: '',
    horarioFuncionamento: '',
    redesSociais: {
      linkedin: '',
      instagram: '',
      twitter: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  
  const toast = useToast();

  useEffect(() => {
    loadContatos();
  }, []);

  const loadContatos = async () => {
    setPageLoading(true);
    try {
      const response = await apiService.getContatos();
      if (response.success && response.data) {
        setFormData({
          email: response.data.email || '',
          telefone: response.data.telefone || '',
          endereco: response.data.endereco || '',
          horarioFuncionamento: response.data.horarioFuncionamento || '',
          redesSociais: {
            linkedin: response.data.redesSociais?.linkedin || '',
            instagram: response.data.redesSociais?.instagram || '',
            twitter: response.data.redesSociais?.twitter || ''
          }
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar contatos',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setPageLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.startsWith('redesSociais.')) {
      const socialField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        redesSociais: {
          ...prev.redesSociais,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.email || !formData.telefone || !formData.endereco) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha email, telefone e endereço.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      await apiService.updateContatos(formData);
      
      toast({
        title: 'Contatos atualizados',
        description: 'As informações de contato foram atualizadas com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao atualizar contatos',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="red.500" />
          <Text>Carregando informações de contato...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Gerenciar Informações de Contato</Heading>
          <Text color="gray.600">
            Edite as informações de contato que aparecem na página pública
          </Text>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.200">
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" color="gray.700">Informações Básicas</Heading>
                
                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contato@blockchaininsper.com.br"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Telefone</FormLabel>
                    <Input
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(11) 3000-0000"
                    />
                  </FormControl>
                </HStack>

                <FormControl isRequired>
                  <FormLabel>Endereço</FormLabel>
                  <Textarea
                    value={formData.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    placeholder="Rua Quatá, 300 - Vila Olímpia, São Paulo - SP, 04546-042"
                    rows={3}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Horário de Funcionamento</FormLabel>
                  <Input
                    value={formData.horarioFuncionamento}
                    onChange={(e) => handleInputChange('horarioFuncionamento', e.target.value)}
                    placeholder="Segunda a Sexta: 8h às 18h"
                  />
                </FormControl>

                <Divider />

                <Heading size="md" color="gray.700">Redes Sociais</Heading>

                <FormControl>
                  <FormLabel>LinkedIn</FormLabel>
                  <Input
                    value={formData.redesSociais.linkedin}
                    onChange={(e) => handleInputChange('redesSociais.linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/blockchain-insper"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Instagram</FormLabel>
                  <Input
                    value={formData.redesSociais.instagram}
                    onChange={(e) => handleInputChange('redesSociais.instagram', e.target.value)}
                    placeholder="https://instagram.com/blockchaininsper"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Twitter</FormLabel>
                  <Input
                    value={formData.redesSociais.twitter}
                    onChange={(e) => handleInputChange('redesSociais.twitter', e.target.value)}
                    placeholder="https://twitter.com/blockchaininsper"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="red"
                  size="lg"
                  isLoading={loading}
                  loadingText="Salvando..."
                >
                  Salvar Alterações
                </Button>
              </VStack>
            </form>
        </Box>
      </VStack>
    </Container>
  );
}
