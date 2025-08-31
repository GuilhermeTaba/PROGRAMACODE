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
  Grid,
  GridItem,
  Icon,
} from '@chakra-ui/react';
import { 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaArrowLeft, 
  FaClock,
  FaTicketAlt,
  FaInfoCircle
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

export default function EventoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const carregarEvento = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEvento(id);
        
        if (response.success && response.data) {
          setEvento(response.data);
        } else {
          setError('Evento não encontrado');
        }
      } catch (error) {
        console.error('Erro ao carregar evento:', error);
        setError('Não foi possível carregar o evento. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregarEvento();
    }
  }, [id]);

  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return dataString;
    }
  };

  const formatarHorario = (dataString) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return '';
    }
  };

  if (loading) {
    return (
      <Box py={20}>
        <Container maxW="4xl">
          <VStack spacing={8}>
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text>Carregando evento...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (error || !evento) {
    return (
      <Box py={20}>
        <Container maxW="4xl">
          <VStack spacing={8}>
            <Alert status="error" borderRadius="lg">
              <AlertIcon />
              <Box>
                <AlertTitle>Erro ao carregar evento!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
            <Button
              leftIcon={<FaArrowLeft />}
              colorScheme="brand"
              variant="outline"
              onClick={() => navigate('/eventos')}
            >
              Voltar para Eventos
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={8}>
      <Container maxW="6xl">
        <VStack spacing={8} align="stretch">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/eventos')}>Eventos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{evento.titulo}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Botão Voltar */}
          <Button
            leftIcon={<FaArrowLeft />}
            colorScheme="brand"
            variant="ghost"
            size="sm"
            alignSelf="flex-start"
            onClick={() => navigate('/eventos')}
          >
            Voltar para Eventos
          </Button>

          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            {/* Conteúdo Principal */}
            <GridItem>
              <Box
                bg={bg}
                borderColor={borderColor}
                border="1px"
                borderRadius="lg"
                shadow="lg"
                overflow="hidden"
              >
                {/* Imagem Principal */}
                {evento.imagem && (
                  <Image
                    src={evento.imagem}
                    alt={evento.titulo}
                    w="full"
                    h={{ base: "250px", md: "300px" }}
                    objectFit="cover"
                  />
                )}

                <Box p={{ base: 6, md: 8 }}>
                  <VStack align="start" spacing={6}>
                    {/* Tags e Badges */}
                    <HStack wrap="wrap" spacing={3}>
                      <Badge 
                        colorScheme={evento.destaque ? 'red' : 'gray'}
                        variant="solid"
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {evento.categoria || 'Evento'}
                      </Badge>
                      {evento.destaque && (
                        <Badge colorScheme="red" variant="outline" borderRadius="full" px={3} py={1}>
                          Destaque
                        </Badge>
                      )}
                      {evento.ativo === false && (
                        <Badge colorScheme="gray" variant="outline" borderRadius="full" px={3} py={1}>
                          Encerrado
                        </Badge>
                      )}
                    </HStack>

                    {/* Título */}
                    <Heading
                      size="xl"
                      color="gray.900"
                      lineHeight="shorter"
                    >
                      {evento.titulo}
                    </Heading>

                    <Divider />

                    {/* Descrição */}
                    <Box>
                      <Heading size="md" color="gray.800" mb={4}>
                        Sobre o Evento
                      </Heading>
                      <Text
                        fontSize="md"
                        color="gray.600"
                        lineHeight="tall"
                        whiteSpace="pre-wrap"
                      >
                        {evento.descricao}
                      </Text>
                    </Box>

                    {/* Informações Adicionais */}
                    {(evento.programacao || evento.requisitos || evento.observacoes) && (
                      <>
                        <Divider />
                        
                        {evento.programacao && (
                          <Box>
                            <Heading size="md" color="gray.800" mb={4}>
                              Programação
                            </Heading>
                            <Text
                              fontSize="md"
                              color="gray.600"
                              lineHeight="tall"
                              whiteSpace="pre-wrap"
                            >
                              {evento.programacao}
                            </Text>
                          </Box>
                        )}

                        {evento.requisitos && (
                          <Box>
                            <Heading size="md" color="gray.800" mb={4}>
                              Requisitos
                            </Heading>
                            <Text
                              fontSize="md"
                              color="gray.600"
                              lineHeight="tall"
                              whiteSpace="pre-wrap"
                            >
                              {evento.requisitos}
                            </Text>
                          </Box>
                        )}

                        {evento.observacoes && (
                          <Box>
                            <HStack align="start" spacing={3}>
                              <Icon as={FaInfoCircle} color="blue.500" mt={1} />
                              <Box>
                                <Heading size="sm" color="gray.800" mb={2}>
                                  Observações Importantes
                                </Heading>
                                <Text
                                  fontSize="sm"
                                  color="gray.600"
                                  lineHeight="tall"
                                  whiteSpace="pre-wrap"
                                >
                                  {evento.observacoes}
                                </Text>
                              </Box>
                            </HStack>
                          </Box>
                        )}
                      </>
                    )}
                  </VStack>
                </Box>
              </Box>
            </GridItem>

            {/* Sidebar com Informações */}
            <GridItem>
              <VStack spacing={6}>
                {/* Informações do Evento */}
                <Box
                  bg={bg}
                  borderColor={borderColor}
                  border="1px"
                  borderRadius="lg"
                  shadow="lg"
                  p={6}
                  w="full"
                >
                  <VStack align="start" spacing={4}>
                    <Heading size="md" color="gray.800">
                      Informações do Evento
                    </Heading>

                    <VStack align="start" spacing={3} w="full">
                      <HStack color="gray.600">
                        <Icon as={FaCalendar} />
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold">Data</Text>
                          <Text fontSize="sm">{formatarData(evento.data)}</Text>
                        </Box>
                      </HStack>

                      {evento.horario && (
                        <HStack color="gray.600">
                          <Icon as={FaClock} />
                          <Box>
                            <Text fontSize="sm" fontWeight="semibold">Horário</Text>
                            <Text fontSize="sm">{evento.horario}</Text>
                          </Box>
                        </HStack>
                      )}

                      <HStack color="gray.600">
                        <Icon as={FaMapMarkerAlt} />
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold">Local</Text>
                          <Text fontSize="sm">{evento.local}</Text>
                        </Box>
                      </HStack>

                      {evento.participantes && (
                        <HStack color="gray.600">
                          <Icon as={FaUsers} />
                          <Box>
                            <Text fontSize="sm" fontWeight="semibold">Participantes</Text>
                            <Text fontSize="sm">{evento.participantes} pessoas</Text>
                          </Box>
                        </HStack>
                      )}

                      {evento.preco && (
                        <HStack color="gray.600">
                          <Icon as={FaTicketAlt} />
                          <Box>
                            <Text fontSize="sm" fontWeight="semibold">Preço</Text>
                            <Text fontSize="sm">{evento.preco}</Text>
                          </Box>
                        </HStack>
                      )}
                    </VStack>
                  </VStack>
                </Box>

                {/* Inscrições/Link */}
                {evento.linkInscricao && (
                  <Box
                    bg="brand.50"
                    borderColor="brand.200"
                    border="1px"
                    borderRadius="lg"
                    p={6}
                    w="full"
                  >
                    <VStack spacing={4}>
                      <Text fontSize="sm" color="gray.700" textAlign="center">
                        Interessado no evento?
                      </Text>
                      <Button
                        as="a"
                        href={evento.linkInscricao}
                        target="_blank"
                        rel="noopener noreferrer"
                        colorScheme="brand"
                        size="lg"
                        w="full"
                      >
                        Fazer Inscrição
                      </Button>
                    </VStack>
                  </Box>
                )}

                {/* Ação de Voltar */}
                <Button
                  leftIcon={<FaArrowLeft />}
                  colorScheme="brand"
                  variant="outline"
                  onClick={() => navigate('/eventos')}
                  w="full"
                >
                  Voltar para Eventos
                </Button>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
