import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Icon,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Spacer,
  useColorModeValue,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { 
  FaCalendarAlt, 
  FaNewspaper, 
  FaUsers, 
  FaChartLine,
  FaPlus,
  FaEye,
  FaEdit,
  FaCog,
  FaUserShield,
  FaEnvelope,
  FaArrowUp,
  FaCalendarCheck
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [dashboardResponse, userResponse, eventsResponse, newsResponse] = await Promise.all([
        apiService.getDashboard(),
        apiService.getMe(),
        apiService.getEventosAdmin(),
        apiService.getNoticiasAdmin()
      ]);

      if (dashboardResponse.success) {
        setStats(dashboardResponse.data);
      }
      setUserData(userResponse.user);
      
      // Pegar os 5 eventos mais recentes ordenados por data
      if (eventsResponse.success && eventsResponse.data) {
        const sortedEvents = eventsResponse.data
          .sort((a, b) => new Date(b.createdAt || b.data) - new Date(a.createdAt || a.data))
          .slice(0, 5);
        setRecentEvents(sortedEvents);
      }
      
      // Pegar as 5 notícias mais recentes ordenadas por data
      if (newsResponse.success && newsResponse.data) {
        const sortedNews = newsResponse.data
          .sort((a, b) => new Date(b.createdAt || b.data) - new Date(a.createdAt || a.data))
          .slice(0, 5);
        setRecentNews(sortedNews);
      }
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const StatCard = ({ icon, label, value, helpText, color = 'red', trend }) => (
    <Box bg={cardBg} shadow="lg" border="1px" borderColor={borderColor} borderRadius="lg" p={6}>
      <HStack spacing={4}>
        <Box
          p={3}
          borderRadius="lg"
          bg={`${color}.50`}
          color={`${color}.500`}
        >
          <Icon as={icon} w={6} h={6} />
        </Box>
        <Box flex={1}>
          <Stat>
            <StatLabel color="gray.600" fontSize="sm" fontWeight="medium">
              {label}
            </StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="gray.900">
              {value}
            </StatNumber>
            {helpText && (
              <StatHelpText color="gray.500" fontSize="xs" mb={0}>
                {helpText}
              </StatHelpText>
            )}
            {trend && (
              <HStack spacing={1} mt={1}>
                <Icon as={FaArrowUp} w={3} h={3} color="green.500" />
                <Text fontSize="xs" color="green.500" fontWeight="medium">
                  {trend}
                </Text>
              </HStack>
            )}
          </Stat>
        </Box>
      </HStack>
    </Box>
  );

  const QuickActionCard = ({ icon, title, description, onClick, colorScheme = 'red' }) => (
    <Box 
      bg={cardBg} 
      shadow="md" 
      border="1px" 
      borderColor={borderColor}
      borderRadius="lg"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ 
        shadow: 'lg', 
        transform: 'translateY(-2px)',
        borderColor: `${colorScheme}.300`
      }}
      onClick={onClick}
      p={6}
    >
      <VStack spacing={4} textAlign="center">
        <Box
          p={3}
          borderRadius="full"
          bg={`${colorScheme}.50`}
          color={`${colorScheme}.500`}
        >
          <Icon as={icon} w={6} h={6} />
        </Box>
        <Box>
          <Heading size="sm" mb={2} color="gray.900">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
        </Box>
      </VStack>
    </Box>
  );

  if (loading) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="red.500" thickness="4px" />
          <Text>Carregando dashboard...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Flex align="center" mb={2}>
            <Box>
              <Heading size="xl" color="gray.900">
                Bem-vindo, {userData?.nome?.split(' ')[0] || 'Administrador'}! 👋
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Aqui está um resumo das atividades da Blockchain Insper
              </Text>
            </Box>
            <Spacer />
            <HStack spacing={2}>
              <Badge 
                colorScheme={userData?.role === 'super_admin' ? 'red' : 'blue'}
                variant="subtle"
                px={3}
                py={1}
                borderRadius="full"
              >
                <HStack spacing={1}>
                  <Icon as={FaUserShield} w={3} h={3} />
                  <Text>{userData?.role === 'super_admin' ? 'Super Admin' : 'Admin'}</Text>
                </HStack>
              </Badge>
            </HStack>
          </Flex>
        </Box>

        {/* Estatísticas */}
        <Box>
          <Heading size="md" mb={4} color="gray.700">Estatísticas Gerais</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <StatCard
              icon={FaCalendarAlt}
              label="Total de Eventos"
              value={stats?.eventos?.total || 0}
              helpText="Eventos cadastrados"
              color="blue"

            />
            <StatCard
              icon={FaNewspaper}
              label="Total de Notícias"
              value={stats?.noticias?.total || 0}
              helpText="Notícias publicadas"
              color="green"

            />
            <StatCard
              icon={FaChartLine}
              label="Eventos em Destaque"
              value={stats?.eventos?.destaques || 0}
              helpText="Eventos destacados"
              color="purple"
            />
            <StatCard
              icon={FaArrowUp}
              label="Publicações Recentes"
              value={(stats?.eventos?.recentes || 0) + (stats?.noticias?.recentes || 0)}
              helpText="Últimos 30 dias"
              color="orange"
            />
          </SimpleGrid>
        </Box>

        {/* Ações Rápidas */}
        <Box>
          <Heading size="md" mb={4} color="gray.700">Ações Rápidas</Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={4}>
            <QuickActionCard
              icon={FaPlus}
              title="Novo Evento"
              description="Criar evento"
              onClick={() => navigate('/admin/eventos/novo')}
              colorScheme="blue"
            />
            <QuickActionCard
              icon={FaNewspaper}
              title="Nova Notícia"
              description="Publicar notícia"
              onClick={() => navigate('/admin/noticias/novo')}
              colorScheme="green"
            />
            {userData?.role === 'super_admin' && (
              <QuickActionCard
                icon={FaUsers}
                title="Administradores"
                description="Gerenciar admins"
                onClick={() => navigate('/admin/admins')}
                colorScheme="purple"
              />
            )}
            <QuickActionCard
              icon={FaEnvelope}
              title="Contatos"
              description="Editar contatos"
              onClick={() => navigate('/admin/contatos')}
              colorScheme="orange"
            />
            <QuickActionCard
              icon={FaCog}
              title="Configurações"
              description="Configurar perfil"
              onClick={() => navigate('/admin/perfil')}
              colorScheme="gray"
            />
            <QuickActionCard
              icon={FaCalendarCheck}
              title="Backups"
              description="Gerenciar backups"
              onClick={() => navigate('/admin/backups')}
              colorScheme="cyan"
            />
          </SimpleGrid>
        </Box>

        {/* Conteúdo Recente */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Eventos Recentes */}
          <Box bg={cardBg} shadow="lg" border="1px" borderColor={borderColor} borderRadius="lg">
            <Box p={6} pb={0}>
              <HStack justify="space-between">
                <HStack spacing={3}>
                  <Icon as={FaCalendarAlt} color="blue.500" />
                  <Heading size="md" color="gray.700">Eventos Recentes</Heading>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  rightIcon={<FaEye />}
                  onClick={() => navigate('/admin/eventos')}
                >
                  Ver Todos
                </Button>
              </HStack>
            </Box>
            <Box px={6} pb={6}>
              {recentEvents.length > 0 ? (
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Evento</Th>
                      <Th>Data</Th>
                      <Th>Status</Th>
                      <Th width="60px"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentEvents.map((evento) => (
                      <Tr key={evento.id}>
                        <Td>
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="medium" fontSize="sm" noOfLines={1}>
                              {evento.titulo}
                            </Text>
                            <Text fontSize="xs" color="gray.500" noOfLines={1}>
                              {evento.local}
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{formatDate(evento.data)}</Text>
                        </Td>
                        <Td>
                          <Badge 
                            size="sm"
                            colorScheme={evento.destaque ? 'red' : 'gray'}
                            variant="subtle"
                          >
                            {evento.destaque ? 'Destaque' : 'Normal'}
                          </Badge>
                        </Td>
                        <Td>
                          <Button
                            size="xs"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => navigate(`/admin/eventos/editar/${evento.id}`)}
                          >
                            <FaEdit />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  Nenhum evento encontrado
                </Alert>
              )}
            </Box>
          </Box>

          {/* Notícias Recentes */}
          <Box bg={cardBg} shadow="lg" border="1px" borderColor={borderColor} borderRadius="lg">
            <Box p={6} pb={0}>
              <HStack justify="space-between">
                <HStack spacing={3}>
                  <Icon as={FaNewspaper} color="green.500" />
                  <Heading size="md" color="gray.700">Notícias Recentes</Heading>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="green"
                  rightIcon={<FaEye />}
                  onClick={() => navigate('/admin/noticias')}
                >
                  Ver Todas
                </Button>
              </HStack>
            </Box>
            <Box px={6} pb={6}>
              {recentNews.length > 0 ? (
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Notícia</Th>
                      <Th>Data</Th>
                      <Th>Status</Th>
                      <Th width="60px"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentNews.map((noticia) => (
                      <Tr key={noticia.id}>
                        <Td>
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="medium" fontSize="sm" noOfLines={1}>
                              {noticia.titulo}
                            </Text>
                            <Text fontSize="xs" color="gray.500" noOfLines={1}>
                              {noticia.autor}
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{formatDate(noticia.data)}</Text>
                        </Td>
                        <Td>
                          <Badge 
                            size="sm"
                            colorScheme={noticia.destaque ? 'red' : 'gray'}
                            variant="subtle"
                          >
                            {noticia.destaque ? 'Destaque' : 'Normal'}
                          </Badge>
                        </Td>
                        <Td>
                          <Button
                            size="xs"
                            variant="ghost"
                            colorScheme="green"
                            onClick={() => navigate(`/admin/noticias/editar/${noticia.id}`)}
                          >
                            <FaEdit />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  Nenhuma notícia encontrada
                </Alert>
              )}
            </Box>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}