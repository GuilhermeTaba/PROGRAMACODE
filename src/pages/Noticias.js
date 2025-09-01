import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Button,
  Link,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaCalendar, FaExternalLinkAlt, FaUser } from 'react-icons/fa';
import apiService from '../services/api';

function NoticiaCard({ noticia }) {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Formatar data para exibição
  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return dataString; // Retorna original se houver erro
    }
  };
  
  return (
    <Box
      bg={bg}
      borderColor={borderColor}
      border="1px"
      borderRadius="lg"
      shadow="lg"
      _hover={{ 
        transform: 'translateY(-4px)', 
        shadow: 'xl',
        transition: 'all 0.3s ease'
      }}
      overflow="hidden"
      h="full"
    >
      <Image
        src={noticia.imagem || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
        alt={noticia.titulo}
        h="200px"
        w="full"
        objectFit="cover"
      />
      
      <Box p={6}>
        <VStack align="start" spacing={4} h="full">
          <HStack>
            <Badge 
              colorScheme={noticia.destaque ? 'red' : 'gray'}
              variant="solid"
              borderRadius="full"
              px={3}
            >
              {noticia.categoria || 'Notícia'}
            </Badge>
            {noticia.destaque && (
              <Badge colorScheme="red" variant="outline" borderRadius="full" px={3}>
                Destaque
              </Badge>
            )}
          </HStack>
          
          <Heading size="md" color="gray.900" noOfLines={2}>
            {noticia.titulo}
          </Heading>
          
          <Text color="gray.600" fontSize="sm" noOfLines={3} flex={1}>
            {noticia.resumo || noticia.conteudo}
          </Text>
          
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

          <VStack spacing={2} w="full">
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              w="full"
              onClick={() => window.location.href = `/noticias/${noticia.id}`}
            >
              Ler mais
            </Button>
            {noticia.link && (
              <Button
                as="a"
                href={noticia.link}
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="red"
                variant="ghost"
                size="sm"
                rightIcon={<FaExternalLinkAlt />}
                w="full"
              >
                Link original
              </Button>
            )}
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarNoticias = async () => {
      try {
        setLoading(true);
        const response = await apiService.getNoticias();
        
        // O backend retorna { success: true, data: [...] }
        if (response.success && response.data) {
          setNoticias(response.data);
        } else {
          setNoticias([]);
        }
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        setError('Não foi possível carregar as notícias. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    carregarNoticias();
  }, []);

  if (loading) {
    return (
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <Heading fontSize={{ base: '4xl', md: '5xl' }}>Notícias</Heading>
            <Spinner size="xl" color="red.500" thickness="4px" />
            <Text>Carregando notícias...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <Heading fontSize={{ base: '4xl', md: '5xl' }}>Notícias</Heading>
            <Alert status="error" borderRadius="lg">
              <AlertIcon />
              <Box>
                <AlertTitle>Erro ao carregar notícias!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
          </VStack>
        </Container>
      </Box>
    );
  }

  // Ordenar todas as notícias por data (mais recentes primeiro)
  const noticiasOrdenadas = [...noticias].sort((a, b) => new Date(b.data) - new Date(a.data));
  
  const noticiasDestaque = noticiasOrdenadas.filter(noticia => noticia.destaque);
  const outrasNoticias = noticiasOrdenadas.filter(noticia => !noticia.destaque);

  return (
    <Box>
      {/* Hero Section - fundo gradiente igual Parcerias.js */}
      <Box
        as="section"
        color="white"
        py={{ base: 12, md: 20 }}
        sx={{
          backgroundImage:
            "linear-gradient(180deg, rgba(40,8,8,0.95), rgba(8,2,2,0.98))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxW="7xl" px={{ base: 6, lg: 8 }}>
          <VStack spacing={6} textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="700"
              letterSpacing="tight"
              bgGradient="linear(to-r, #ff2a2a, #a80000)"
              bgClip="text"
              display="inline-block"
              fontFamily={"'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"}
            >
              Notícias
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              color="white"
              fontWeight="600"
              lineHeight="1.5"
              fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
            >
              Fique por dentro das últimas novidades do mundo blockchain, 
              nossas pesquisas e desenvolvimentos no mercado de criptoativos
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Notícias em Destaque */}
      {noticiasDestaque.length > 0 && (
        <Box py={20} bg="white">
          <Container maxW="7xl">
            <VStack spacing={12}>
              <Stack textAlign="center" spacing={4}>
                <Heading
                  fontSize={{ base: '3xl', md: '4xl' }}
                  color="gray.900"
                  fontWeight="bold"
                >
                  Notícias em Destaque
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  As principais novidades do setor
                </Text>
              </Stack>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
                {noticiasDestaque.map((noticia) => (
                  <NoticiaCard key={noticia.id} noticia={noticia} />
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      )}

      {/* Todas as Notícias */}
      <Box py={20} bg="gray.50">
        <Container maxW="7xl">
          <VStack spacing={12}>
            <Stack textAlign="center" spacing={4}>
              <Heading
                fontSize={{ base: '3xl', md: '4xl' }}
                color="gray.900"
                fontWeight="bold"
              >
                {noticiasDestaque.length > 0 ? 'Outras Notícias' : 'Todas as Notícias'}
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Acompanhe todas as nossas publicações e atualizações
              </Text>
            </Stack>
            
            {outrasNoticias.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
                {outrasNoticias.map((noticia) => (
                  <NoticiaCard key={noticia.id} noticia={noticia} />
                ))}
              </SimpleGrid>
            ) : noticias.length === 0 ? (
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <Box>
                  <AlertTitle>Nenhuma notícia encontrada</AlertTitle>
                  <AlertDescription>
                    Ainda não há notícias publicadas. Volte em breve para conferir nossas últimas novidades!
                  </AlertDescription>
                </Box>
              </Alert>
            ) : null}
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}