import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCalendar, FaUser, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

export default function NoticiaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const carregarNoticia = async () => {
      try {
        setLoading(true);
        const response = await apiService.getNoticia(id);
        
        if (response.success && response.data) {
          setNoticia(response.data);
        } else {
          setError('Notícia não encontrada');
        }
      } catch (error) {
        console.error('Erro ao carregar notícia:', error);
        setError('Não foi possível carregar a notícia. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregarNoticia();
    }
  }, [id]);

  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dataString;
    }
  };

  if (loading) {
    return (
      <Box py={20}>
        <Container maxW="4xl">
          <VStack spacing={8}>
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text>Carregando notícia...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (error || !noticia) {
    return (
      <Box py={20}>
        <Container maxW="4xl">
          <VStack spacing={8}>
            <Alert status="error" borderRadius="lg">
              <AlertIcon />
              <Box>
                <AlertTitle>Erro ao carregar notícia!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
            <Button
              leftIcon={<FaArrowLeft />}
              colorScheme="brand"
              variant="outline"
              onClick={() => navigate('/noticias')}
            >
              Voltar para Notícias
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={8}>
      <Container maxW="4xl">
        <VStack spacing={8} align="stretch">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/noticias')}>Notícias</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{noticia.titulo}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Botão Voltar */}
          <Button
            leftIcon={<FaArrowLeft />}
            colorScheme="brand"
            variant="ghost"
            size="sm"
            alignSelf="flex-start"
            onClick={() => navigate('/noticias')}
          >
            Voltar para Notícias
          </Button>

          {/* Conteúdo Principal */}
          <Box
            bg={bg}
            borderColor={borderColor}
            border="1px"
            borderRadius="lg"
            shadow="lg"
            overflow="hidden"
          >
            {/* Imagem Principal */}
            {noticia.imagem && (
              <Image
                src={noticia.imagem}
                alt={noticia.titulo}
                w="full"
                h={{ base: "250px", md: "400px" }}
                objectFit="cover"
              />
            )}

            <Box p={{ base: 6, md: 8 }}>
              <VStack align="start" spacing={6}>
                {/* Tags e Badges */}
                <HStack wrap="wrap" spacing={3}>
                  <Badge 
                    colorScheme={noticia.destaque ? 'red' : 'gray'}
                    variant="solid"
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    {noticia.categoria || 'Notícia'}
                  </Badge>
                  {noticia.destaque && (
                    <Badge colorScheme="red" variant="outline" borderRadius="full" px={3} py={1}>
                      Destaque
                    </Badge>
                  )}
                  {noticia.ativo === false && (
                    <Badge colorScheme="gray" variant="outline" borderRadius="full" px={3} py={1}>
                      Arquivada
                    </Badge>
                  )}
                </HStack>

                {/* Título */}
                <Heading
                  size="xl"
                  color="gray.900"
                  lineHeight="shorter"
                >
                  {noticia.titulo}
                </Heading>

                {/* Metadados */}
                <VStack align="start" spacing={2} w="full">
                  <HStack color="gray.500" fontSize="sm">
                    <FaCalendar />
                    <Text>{formatarData(noticia.data)}</Text>
                  </HStack>
                  {noticia.autor && (
                    <HStack color="gray.500" fontSize="sm">
                      <FaUser />
                      <Text>{noticia.autor}</Text>
                    </HStack>
                  )}
                </VStack>

                <Divider />

                {/* Resumo */}
                {noticia.resumo && (
                  <Box>
                    <Text
                      fontSize="lg"
                      color="gray.700"
                      fontWeight="medium"
                      lineHeight="tall"
                    >
                      {noticia.resumo}
                    </Text>
                    <Divider mt={4} />
                  </Box>
                )}

                {/* Conteúdo Principal */}
                <Box>
                  <Text
                    fontSize="md"
                    color="gray.600"
                    lineHeight="tall"
                    whiteSpace="pre-wrap"
                  >
                    {noticia.conteudo}
                  </Text>
                </Box>

                {/* Link Externo */}
                {noticia.link && (
                  <Box pt={4}>
                    <Button
                      as="a"
                      href={noticia.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      colorScheme="brand"
                      rightIcon={<FaExternalLinkAlt />}
                      size="lg"
                    >
                      Leia mais no site original
                    </Button>
                  </Box>
                )}

                <Divider />

                {/* Ações */}
                <HStack spacing={4} w="full" justify="space-between">
                  <Button
                    leftIcon={<FaArrowLeft />}
                    colorScheme="brand"
                    variant="outline"
                    onClick={() => navigate('/noticias')}
                  >
                    Voltar para Notícias
                  </Button>

                  <Text fontSize="xs" color="gray.400">
                    Publicado em {formatarData(noticia.data)}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
