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

export default function FormNoticia() {
  const [formData, setFormData] = useState({
    titulo: '',
    resumo: '',
    conteudo: '',
    data: '',
    autor: '',
    categoria: '',
    imagem: '',
    link: '#',
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
      loadNoticia();
    } else {
      // Definir data atual como padrão
      setFormData(prev => ({
        ...prev,
        data: new Date().toISOString().split('T')[0]
      }));
    }
  }, [id, isEditing]);

  const loadNoticia = async () => {
    setPageLoading(true);
    try {
      const response = await apiService.getNoticia(id);
      const noticia = response.data;
      setFormData({
        titulo: noticia.titulo,
        resumo: noticia.resumo,
        conteudo: noticia.conteudo,
        data: noticia.data,
        autor: noticia.autor,
        categoria: noticia.categoria,
        imagem: noticia.imagem,
        link: noticia.link,
        destaque: noticia.destaque,
      });
    } catch (error) {
      toast({
        title: 'Erro ao carregar notícia',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/admin/noticias');
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
    if (!formData.titulo || !formData.resumo || !formData.conteudo || !formData.autor || !formData.categoria) {
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
        await apiService.updateNoticia(id, formData);
        toast({
          title: 'Notícia atualizada com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await apiService.createNoticia(formData);
        toast({
          title: 'Notícia criada com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/admin/noticias');
    } catch (error) {
      toast({
        title: `Erro ao ${isEditing ? 'atualizar' : 'criar'} notícia`,
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
          <Text>Carregando notícia...</Text>
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
            {isEditing ? 'Editar Notícia' : 'Nova Notícia'}
          </Heading>
          <Text color="gray.600">
            {isEditing ? 'Edite as informações da notícia' : 'Preencha os dados da nova notícia'}
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
                  placeholder="Digite o título da notícia"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Resumo</FormLabel>
                <Textarea
                  value={formData.resumo}
                  onChange={(e) => handleInputChange('resumo', e.target.value)}
                  placeholder="Escreva um resumo da notícia..."
                  rows={3}
                  resize="vertical"
                />
                <FormHelperText>
                  Resumo que aparecerá nos cards de notícias
                </FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Conteúdo</FormLabel>
                <Textarea
                  value={formData.conteudo}
                  onChange={(e) => handleInputChange('conteudo', e.target.value)}
                  placeholder="Escreva o conteúdo completo da notícia..."
                  rows={8}
                  resize="vertical"
                />
              </FormControl>

              <HStack spacing={4} w="full">
                <FormControl flex={1}>
                  <FormLabel>Data</FormLabel>
                  <Input
                    type="date"
                    value={formData.data}
                    onChange={(e) => handleInputChange('data', e.target.value)}
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired flex={1}>
                  <FormLabel>Autor</FormLabel>
                  <Select
                    value={formData.autor}
                    onChange={(e) => handleInputChange('autor', e.target.value)}
                    placeholder="Selecione o autor"
                    size="lg"
                  >
                    <option value="Equipe Blockchain Insper">Equipe Blockchain Insper</option>
                    <option value="Diretoria de Business">Diretoria de Business</option>
                    <option value="Diretoria de Finance">Diretoria de Finance</option>
                    <option value="Diretoria de Tech">Diretoria de Tech</option>
                    <option value="Presidência">Presidência</option>
                  </Select>
                </FormControl>
              </HStack>

              <HStack spacing={4} w="full">
                <FormControl isRequired flex={1}>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    value={formData.categoria}
                    onChange={(e) => handleInputChange('categoria', e.target.value)}
                    placeholder="Selecione uma categoria"
                    size="lg"
                  >
                    <option value="Pesquisa">Pesquisa</option>
                    <option value="Parceria">Parceria</option>
                    <option value="Conquista">Conquista</option>
                    <option value="Análise">Análise</option>
                    <option value="Educação">Educação</option>
                    <option value="Evento">Evento</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Mercado">Mercado</option>
                  </Select>
                </FormControl>

                <FormControl flex={1}>
                  <FormLabel>Link Externo</FormLabel>
                  <Input
                    value={formData.link}
                    onChange={(e) => handleInputChange('link', e.target.value)}
                    placeholder="https://exemplo.com"
                    size="lg"
                  />
                  <FormHelperText>
                    Link para artigo completo (opcional)
                  </FormHelperText>
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
                    <FormLabel mb={0}>Notícia em Destaque</FormLabel>
                    <Text fontSize="sm" color="gray.600">
                      Notícias em destaque aparecem em posição de maior visibilidade
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
                  onClick={() => navigate('/admin/noticias')}
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
                  {isEditing ? 'Atualizar Notícia' : 'Criar Notícia'}
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}
