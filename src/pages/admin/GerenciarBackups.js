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
  Badge,
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
  Alert,
  AlertIcon,
  Tooltip,
} from '@chakra-ui/react';
import { 
  FaDownload, 
  FaUpload, 
  FaTrash,
  FaClock,
  FaDatabase
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import apiService from '../../services/api';

export default function GerenciarBackups() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  
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
      if (response.success) {
        setBackups(response.data);
      }
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
      setActionLoading(true);
      const response = await apiService.createBackup();
      
      if (response.success) {
        toast({
          title: 'Backup criado com sucesso',
          description: `Arquivo: ${response.data.filename}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        await loadBackups();
      }
    } catch (error) {
      toast({
        title: 'Erro ao criar backup',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestoreBackup = async () => {
    if (!selectedBackup) return;

    try {
      setActionLoading(true);
      const response = await apiService.restoreBackup(selectedBackup.filename);
      
      if (response.success) {
        toast({
          title: 'Backup restaurado com sucesso',
          description: `Dados restaurados de: ${selectedBackup.filename}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        await loadBackups();
        onClose();
      }
    } catch (error) {
      toast({
        title: 'Erro ao restaurar backup',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setActionLoading(false);
    }
  };

  const openRestoreDialog = (backup) => {
    setSelectedBackup(backup);
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
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="red.500" thickness="4px" />
          <Text>Carregando backups...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Heading size="lg" mb={2}>Gerenciar Backups</Heading>
            <Text color="gray.600">
              Crie e restaure backups dos dados do sistema
            </Text>
          </Box>
          
          <Button
            leftIcon={<FaDatabase />}
            colorScheme="red"
            onClick={handleCreateBackup}
            isLoading={actionLoading}
            loadingText="Criando..."
          >
            Criar Backup
          </Button>
        </HStack>

        {backups.length === 0 ? (
          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            <Box>
              <Text fontWeight="medium">Nenhum backup encontrado</Text>
              <Text fontSize="sm" color="gray.600">
                Clique em "Criar Backup" para fazer seu primeiro backup dos dados
              </Text>
            </Box>
          </Alert>
        ) : (
          <Box overflowX="auto" bg="white" borderRadius="lg" shadow="sm">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Arquivo</Th>
                  <Th>Data de Criação</Th>
                  <Th>Tipo</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {backups.map((backup, index) => (
                  <Tr key={backup.filename}>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="medium" fontSize="sm">
                          {backup.filename}
                        </Text>
                        <HStack spacing={2}>
                          <Badge 
                            size="sm"
                            colorScheme={backup.filename.includes('before-restore') ? 'orange' : 'blue'}
                            variant="subtle"
                          >
                            {backup.filename.includes('before-restore') ? 'Auto Backup' : 'Manual'}
                          </Badge>
                        </HStack>
                      </VStack>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <FaClock color="gray" size={12} />
                        <Text fontSize="sm">{backup.date}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="green" variant="subtle">
                        Completo
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={1}>
                        <Tooltip label="Restaurar Backup">
                          <IconButton
                            icon={<FaUpload />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => openRestoreDialog(backup)}
                            isDisabled={actionLoading}
                          />
                        </Tooltip>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}

        {/* Informações */}
        <Box bg="blue.50" p={4} borderRadius="lg" border="1px" borderColor="blue.200">
          <Heading size="sm" color="blue.800" mb={2}>
            ℹ️ Informações Importantes
          </Heading>
          <VStack align="start" spacing={2} fontSize="sm" color="blue.700">
            <Text>• Os backups incluem todos os eventos e notícias do sistema</Text>
            <Text>• Antes de restaurar um backup, o sistema cria automaticamente um backup dos dados atuais</Text>
            <Text>• A restauração substitui completamente os dados atuais</Text>
            <Text>• Recomenda-se criar backups regularmente, especialmente antes de grandes alterações</Text>
          </VStack>
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
                  Tem certeza que deseja restaurar o backup <strong>{selectedBackup?.filename}</strong>?
                </Text>
                <Alert status="warning" borderRadius="md">
                  <AlertIcon />
                  <Box fontSize="sm">
                    <Text fontWeight="medium">Atenção:</Text>
                    <Text>Esta ação irá substituir todos os dados atuais pelos dados do backup selecionado. Um backup automático dos dados atuais será criado antes da restauração.</Text>
                  </Box>
                </Alert>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                colorScheme="blue" 
                onClick={handleRestoreBackup}
                ml={3}
                isLoading={actionLoading}
                loadingText="Restaurando..."
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
