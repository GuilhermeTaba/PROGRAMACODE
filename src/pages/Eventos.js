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
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaCalendar, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import apiService from '../services/api';

function EventCard({ evento }) {
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
        src={evento.imagem || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
        alt={evento.titulo}
        h="200px"
        w="full"
        objectFit="cover"
      />
      
      <Box p={6}>
        <VStack align="start" spacing={4} h="full">
          <HStack>
            <Badge 
              colorScheme={evento.destaque ? 'red' : 'gray'}
              variant="solid"
              borderRadius="full"
              px={3}
            >
              {evento.categoria || 'Evento'}
            </Badge>
            {evento.destaque && (
              <Badge colorScheme="red" variant="outline" borderRadius="full" px={3}>
                Destaque
              </Badge>
            )}
          </HStack>
          
          <Heading size="md" color="gray.900" noOfLines={2}>
            {evento.titulo}
          </Heading>
          
          <Text color="gray.600" fontSize="sm" noOfLines={3} flex={1}>
            {evento.descricao}
          </Text>
          
          <Divider />
          
          <VStack align="start" spacing={2} w="full">
            <HStack color="gray.500" fontSize="sm">
              <FaCalendar />
              <Text>{formatarData(evento.data)}</Text>
            </HStack>
            <HStack color="gray.500" fontSize="sm">
              <FaMapMarkerAlt />
              <Text>{evento.local}</Text>
            </HStack>
            {evento.participantes && (
              <HStack color="gray.500" fontSize="sm">
                <FaUsers />
                <Text>{evento.participantes} participantes</Text>
              </HStack>
            )}
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEventos();
        
        // O backend retorna { success: true, data: [...] }
        if (response.success && response.data) {
          setEventos(response.data);
        } else {
          setEventos([]);
        }
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        setError('Não foi possível carregar os eventos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    carregarEventos();
  }, []);

  if (loading) {
    return (
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <Heading fontSize={{ base: '4xl', md: '5xl' }}>Eventos</Heading>
            <Spinner size="xl" color="red.500" thickness="4px" />
            <Text>Carregando eventos...</Text>
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
            <Heading fontSize={{ base: '4xl', md: '5xl' }}>Eventos</Heading>
            <Alert status="error" borderRadius="lg">
              <AlertIcon />
              <Box>
                <AlertTitle>Erro ao carregar eventos!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
          </VStack>
        </Container>
      </Box>
    );
  }

  // Ordenar todos os eventos por data (mais recentes primeiro)
  const eventosOrdenados = [...eventos].sort((a, b) => new Date(b.data) - new Date(a.data));
  
  const eventosDestaque = eventosOrdenados.filter(evento => evento.destaque);
  const outrosEventos = eventosOrdenados.filter(evento => !evento.destaque);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        py={20}
        bg="gray.900"
        color="white"
      >
        <Container maxW="7xl">
          <VStack spacing={6} textAlign="center">
            <Heading
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="bold"
            >
              Eventos
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              color="gray.300"
            >
              Registro de nossas colaborações passadas, palestras, workshops e 
              parcerias que fortalecem o ecossistema blockchain no Brasil
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Eventos em Destaque */}
      {eventosDestaque.length > 0 && (
        <Box py={20} bg="white">
          <Container maxW="7xl">
            <VStack spacing={12}>
              <Stack textAlign="center" spacing={4}>
                <Heading
                  fontSize={{ base: '3xl', md: '4xl' }}
                  color="gray.900"
                  fontWeight="bold"
                >
                  Eventos em Destaque
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Nossos principais eventos e colaborações
                </Text>
              </Stack>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
                {eventosDestaque.map((evento) => (
                  <EventCard key={evento.id} evento={evento} />
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      )}

      {/* Todos os Eventos */}
      <Box py={20} bg="gray.50">
        <Container maxW="7xl">
          <VStack spacing={12}>
            <Stack textAlign="center" spacing={4}>
              <Heading
                fontSize={{ base: '3xl', md: '4xl' }}
                color="gray.900"
                fontWeight="bold"
              >
                {eventosDestaque.length > 0 ? 'Outros Eventos' : 'Nossos Eventos'}
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Confira todos os nossos eventos e atividades realizadas
              </Text>
            </Stack>
            
            {outrosEventos.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
                {outrosEventos.map((evento) => (
                  <EventCard key={evento.id} evento={evento} />
                ))}
              </SimpleGrid>
            ) : eventos.length === 0 ? (
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <Box>
                  <AlertTitle>Nenhum evento encontrado</AlertTitle>
                  <AlertDescription>
                    Ainda não há eventos cadastrados. Volte em breve para conferir nossos próximos eventos!
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