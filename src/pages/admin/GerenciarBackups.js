import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Spinner,
  Center,
  Badge,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
} from '@chakra-ui/react';
import { 
  FaDownload, 
  FaUpload, 
  FaTrash,
  FaHistory,
  FaDatabase,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import apiService from '../../services/api';

export default function GerenciarBackups() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [backupToRestore, setBackupToRestore] = useState(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    try {
      setLoading(true);
      const response = await apiService.getBackups();
      setBackups(response.data || []);
    } catch (error) {
      toast({
        title: 'Erro ao carregar backups',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setCreateLoading(true);
      await apiService.createBackup();
      toast({
        title: 'Backup criado com sucesso',
        description: 'Os dados foram salvos com segurança',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await loadBackups(); // Recarregar lista
    } catch (error) {
      toast({
        title: 'Erro ao criar backup',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!backupToRestore) return;

    try {
      setRestoreLoading(true);
      await apiService.restoreBackup(backupToRestore.filename);
      toast({
        title: 'Backup restaurado com sucesso',
        description: 'Os dados foram restaurados. Um backup dos dados atuais foi criado automaticamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await loadBackups(); // Recarregar lista
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao restaurar backup',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setRestoreLoading(false);
    }
  };

  const openRestoreDialog = (backup) => {
    setBackupToRestore(backup);
    onOpen();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>Carregando backups...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="xl" color="gray.900">
              Gerenciar Backups
            </Heading>
            <Text color="gray.600">
              {backups.length} backup{backups.length !== 1 ? 's' : ''} disponível{backups.length !== 1 ? 'eis' : ''}
            </Text>
          </VStack>
          
          <Button
            leftIcon={<FaDatabase />}
            colorScheme="brand"
            onClick={handleCreateBackup}
            isLoading={createLoading}
            loadingText="Criando..."
          >
            Criar Backup
          </Button>
        </HStack>

        {/* Informações importantes */}
        <Box
          bg="white"
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
          p={6}
        >
          <VStack align="start" spacing={3}>
            <HStack>
              <FaExclamationTriangle color="#E53E3E" />
              <Heading size="md" color="gray.900">
                Informações Importantes
              </Heading>
            </HStack>
            <VStack align="start" spacing={2} pl={6}>
              <Text fontSize="sm" color="gray.600">
                • Os backups incluem todos os eventos e notícias cadastrados no sistema
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Ao restaurar um backup, os dados atuais serão substituídos
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Um backup automático dos dados atuais será criado antes da restauração
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Recomenda-se criar backups regularmente para evitar perda de dados
              </Text>
            </VStack>
          </VStack>
        </Box>

        {/* Estatísticas */}
        {backups.length > 0 && (
          <Flex gap={4} wrap="wrap">
            <Box
              flex="1"
              minW="200px"
              bg="white"
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              p={6}
            >
              <Stat>
                <StatLabel>Total de Backups</StatLabel>
                <StatNumber>{backups.length}</StatNumber>
                <StatHelpText>Arquivos disponíveis</StatHelpText>
              </Stat>
            </Box>
            
            <Box
              flex="1"
              minW="200px"
              bg="white"
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              p={6}
            >
              <Stat>
                <StatLabel>Backup Mais Recente</StatLabel>
                <StatNumber fontSize="md">{backups[0]?.date || 'N/A'}</StatNumber>
                <StatHelpText>Último backup criado</StatHelpText>
              </Stat>
            </Box>
          </Flex>
        )}

        {/* Tabela de Backups */}
        <Box
          bg="white"
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
          overflow="hidden"
        >
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Data/Hora</Th>
                <Th>Nome do Arquivo</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {backups.map((backup, index) => (
                <Tr key={backup.filename}>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" fontSize="sm">
                        {backup.date}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {backup.timestamp}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" fontFamily="mono" color="gray.700">
                      {backup.filename}
                    </Text>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Badge
                        colorScheme="green"
                        variant="solid"
                      >
                        Disponível
                      </Badge>
                      {index === 0 && (
                        <Badge colorScheme="blue" variant="outline" fontSize="xs">
                          Mais Recente
                        </Badge>
                      )}
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <Tooltip label="Restaurar backup">
                        <IconButton
                          icon={<FaHistory />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => openRestoreDialog(backup)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {backups.length === 0 && (
            <Box p={10} textAlign="center">
              <VStack spacing={4}>
                <FaDatabase size="48" color="#CBD5E0" />
                <Text color="gray.500" fontSize="lg">
                  Nenhum backup encontrado
                </Text>
                <Text color="gray.400" fontSize="sm">
                  Crie seu primeiro backup para proteger os dados do sistema
                </Text>
                <Button
                  leftIcon={<FaDatabase />}
                  colorScheme="brand"
                  onClick={handleCreateBackup}
                  isLoading={createLoading}
                  loadingText="Criando..."
                >
                  Criar Primeiro Backup
                </Button>
              </VStack>
            </Box>
          )}
        </Box>
      </VStack>

      {/* Dialog de Confirmação de Restauração */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Restaurar Backup
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack align="start" spacing={3}>
                <Text>
                  Tem certeza que deseja restaurar o backup de <strong>{backupToRestore?.date}</strong>?
                </Text>
                <Box bg="yellow.50" p={3} borderRadius="md" border="1px" borderColor="yellow.200">
                  <HStack align="start" spacing={2}>
                    <FaExclamationTriangle color="#D69E2E" />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold" color="yellow.800">
                        Atenção:
                      </Text>
                      <Text fontSize="sm" color="yellow.700">
                        • Todos os dados atuais serão substituídos
                      </Text>
                      <Text fontSize="sm" color="yellow.700">
                        • Um backup automático será criado antes da restauração
                      </Text>
                      <Text fontSize="sm" color="yellow.700">
                        • Esta ação não pode ser desfeita
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleRestore}
                ml={3}
                isLoading={restoreLoading}
                loadingText="Restaurando..."
                leftIcon={<FaHistory />}
              >
                Restaurar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
