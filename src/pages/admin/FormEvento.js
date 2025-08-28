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
  Select,
  Switch,
  Button,
  useToast,
  Spinner,
  Center,
  Image,
  FormHelperText,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../services/api';

export default function FormEvento() {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data: '',
    local: '',
    participantes: '',
    categoria: '',
    imagem: '',
    destaque: false,
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const toast = useToast();

  useEffect(() => {
    if (isEditing) {
      loadEvento();
    }
  }, [id, isEditing]);

  const loadEvento = async () => {
    setPageLoading(true);
    try {
      const response = await apiService.getEvento(id);
      const evento = response.data;
      setFormData({
        titulo: evento.titulo,
        descricao: evento.descricao,
        data: evento.data,
        local: evento.local,
        participantes: evento.participantes,
        categoria: evento.categoria,
        imagem: evento.imagem,
        destaque: evento.destaque,
      });
    } catch (error) {
      toast({
        title: 'Erro ao carregar evento',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/admin/eventos');
    } finally {
      setPageLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const response = await apiService.uploadImage(file);
      console.log('Response do upload:', response);
      
      // O backend retorna { success: true, data: { url: "/uploads/filename.png" } }
      const imageUrl = `http://localhost:5000${response.data.url}`;
      console.log('URL da imagem:', imageUrl);
      
      handleInputChange('imagem', imageUrl);
      toast({
        title: 'Imagem enviada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: 'Erro ao enviar imagem',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.titulo || !formData.descricao || !formData.data || !formData.local || !formData.categoria) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await apiService.updateEvento(id, formData);
        toast({
          title: 'Evento atualizado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await apiService.createEvento(formData);
        toast({
          title: 'Evento criado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/admin/eventos');
    } catch (error) {
      toast({
        title: `Erro ao ${isEditing ? 'atualizar' : 'criar'} evento`,
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
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>Carregando evento...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={1}>
          <Heading size="xl" color="gray.900">
            {isEditing ? 'Editar Evento' : 'Novo Evento'}
          </Heading>
          <Text color="gray.600">
            {isEditing ? 'Edite as informações do evento' : 'Preencha os dados do novo evento'}
          </Text>
        </VStack>

        {/* Formulário */}
        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Título</FormLabel>
                <Input
                  value={formData.titulo}
                  onChange={(e) => handleInputChange('titulo', e.target.value)}
                  placeholder="Digite o título do evento"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  placeholder="Descreva o evento..."
                  rows={4}
                  resize="vertical"
                />
              </FormControl>

              <HStack spacing={4} w="full">
                <FormControl isRequired flex={1}>
                  <FormLabel>Data</FormLabel>
                  <Input
                    type="date"
                    value={formData.data}
                    onChange={(e) => handleInputChange('data', e.target.value)}
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired flex={1}>
                  <FormLabel>Local</FormLabel>
                  <Input
                    value={formData.local}
                    onChange={(e) => handleInputChange('local', e.target.value)}
                    placeholder="Local do evento"
                    size="lg"
                  />
                </FormControl>
              </HStack>

              <HStack spacing={4} w="full">
                <FormControl flex={1}>
                  <FormLabel>Participantes</FormLabel>
                  <Input
                    value={formData.participantes}
                    onChange={(e) => handleInputChange('participantes', e.target.value)}
                    placeholder="Ex: 150+"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired flex={1}>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    value={formData.categoria}
                    onChange={(e) => handleInputChange('categoria', e.target.value)}
                    placeholder="Selecione uma categoria"
                    size="lg"
                  >
                    <option value="Palestra">Palestra</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Mesa Redonda">Mesa Redonda</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Apresentação">Apresentação</option>
                    <option value="Parceria">Parceria</option>
                    <option value="Conferência">Conferência</option>
                    <option value="Seminário">Seminário</option>
                  </Select>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Imagem</FormLabel>
                <VStack spacing={4} align="start">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                  />
                  <FormHelperText>
                    Ou cole uma URL de imagem abaixo
                  </FormHelperText>
                  <Input
                    value={formData.imagem}
                    onChange={(e) => handleInputChange('imagem', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    size="lg"
                  />
                  {formData.imagem && (
                    <Box>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        URL da imagem: {formData.imagem}
                      </Text>
                      <Image
                        src={formData.imagem}
                        alt="Preview"
                        maxH="200px"
                        borderRadius="md"
                        border="1px"
                        borderColor="gray.200"
                        onError={(e) => {
                          console.error('Erro ao carregar imagem:', formData.imagem);
                          console.error('Evento de erro:', e);
                        }}
                        onLoad={() => {
                          console.log('Imagem carregada com sucesso:', formData.imagem);
                        }}
                      />
                    </Box>
                  )}
                  {imageUploading && (
                    <HStack>
                      <Spinner size="sm" />
                      <Text fontSize="sm">Enviando imagem...</Text>
                    </HStack>
                  )}
                </VStack>
              </FormControl>

              <FormControl>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <FormLabel mb={0}>Evento em Destaque</FormLabel>
                    <Text fontSize="sm" color="gray.600">
                      Eventos em destaque aparecem em posição de maior visibilidade
                    </Text>
                  </VStack>
                  <Switch
                    isChecked={formData.destaque}
                    onChange={(e) => handleInputChange('destaque', e.target.checked)}
                    size="lg"
                    colorScheme="brand"
                  />
                </HStack>
              </FormControl>

              <HStack spacing={4} w="full" pt={4}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/admin/eventos')}
                  flex={1}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  isLoading={loading}
                  loadingText={isEditing ? 'Atualizando...' : 'Criando...'}
                  flex={1}
                >
                  {isEditing ? 'Atualizar Evento' : 'Criar Evento'}
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}
