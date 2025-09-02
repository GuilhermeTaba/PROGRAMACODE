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
  Button,
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

          {/* Botão Ver Detalhes */}
          <Button
            colorScheme="red"
            variant="outline"
            size="sm"
            w="full"
            onClick={() => window.location.href = `/eventos/${evento.id}`}
          >
            Ver Detalhes
          </Button>
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
        as="section"
        color="white"
        py={{ base: 12, md: 20 }}
        sx={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,2,2,0.98), rgba(40,8,8,0.95))",
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
              Eventos
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              color="white"
              fontWeight="600"
              lineHeight="1.5"
              fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
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