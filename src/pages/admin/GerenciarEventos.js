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
  Image,
  Tooltip,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaStar,
  FaRegStar
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

export default function GerenciarEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState(null);
  const [showInactive, setShowInactive] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      const response = await apiService.getEventosAdmin();
      setEventos(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar eventos',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!eventoToDelete) return;

    setDeleteLoading(true);
    try {
      await apiService.deleteEvento(eventoToDelete.id);
      toast({
        title: 'Evento excluído com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await loadEventos(); // Recarregar lista
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao excluir evento',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleDestaque = async (evento) => {
    try {
      await apiService.updateEvento(evento.id, {
        destaque: !evento.destaque
      });
      toast({
        title: `Evento ${evento.destaque ? 'removido do' : 'adicionado ao'} destaque`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await loadEventos();
    } catch (error) {
      toast({
        title: 'Erro ao atualizar evento',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openDeleteDialog = (evento) => {
    setEventoToDelete(evento);
    onOpen();
  };

  if (loading) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>Carregando eventos...</Text>
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
              Gerenciar Eventos
            </Heading>
            <Text color="gray.600">
              {eventos.filter(e => showInactive || e.ativo).length} evento{eventos.filter(e => showInactive || e.ativo).length !== 1 ? 's' : ''} {showInactive ? 'total' : 'ativo'}{eventos.filter(e => showInactive || e.ativo).length !== 1 ? 's' : ''}
            </Text>
          </VStack>
          
          <HStack spacing={6}>
            <FormControl display="flex" alignItems="center" minW="auto">
              <FormLabel htmlFor="show-inactive" mb="0" fontSize="sm" color="gray.600" whiteSpace="nowrap">
                Mostrar inativos
              </FormLabel>
              <Switch 
                id="show-inactive"
                colorScheme="red"
                size="sm"
                isChecked={showInactive}
                onChange={(e) => setShowInactive(e.target.checked)}
                ml={2}
              />
            </FormControl>
            
            <Button
              leftIcon={<FaPlus />}
              colorScheme="brand"
              onClick={() => navigate('/admin/eventos/novo')}
              flexShrink={0}
            >
              Novo Evento
            </Button>
          </HStack>
        </HStack>

        {/* Tabela de Eventos */}
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
                <Th>Imagem</Th>
                <Th>Título</Th>
                <Th>Data</Th>
                <Th>Categoria</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {eventos.filter(evento => showInactive || evento.ativo).map((evento) => (
                <Tr key={evento.id}>
                  <Td>
                    <Image
                      src={evento.imagem}
                      alt={evento.titulo}
                      w="60px"
                      h="40px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" noOfLines={1}>
                        {evento.titulo}
                      </Text>
                      <Text fontSize="sm" color="gray.600" noOfLines={1}>
                        {evento.local} • {evento.participantes} participantes
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {evento.dataFormatada}
                    </Text>
                  </Td>
                  <Td>
                    <Badge colorScheme="blue" variant="subtle">
                      {evento.categoria}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack spacing={1}>
                      <Badge
                        colorScheme={evento.ativo ? 'green' : 'red'}
                        variant="solid"
                      >
                        {evento.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                      {evento.destaque && (
                        <Badge colorScheme="yellow" variant="outline">
                          Destaque
                        </Badge>
                      )}
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <Tooltip label="Ver evento">
                        <IconButton
                          icon={<FaEye />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => window.open(`#/eventos`, '_blank')}
                        />
                      </Tooltip>
                      <Tooltip label={evento.destaque ? 'Remover destaque' : 'Destacar'}>
                        <IconButton
                          icon={evento.destaque ? <FaStar /> : <FaRegStar />}
                          size="sm"
                          colorScheme="yellow"
                          variant="ghost"
                          onClick={() => toggleDestaque(evento)}
                        />
                      </Tooltip>
                      <Tooltip label="Editar">
                        <IconButton
                          icon={<FaEdit />}
                          size="sm"
                          colorScheme="green"
                          variant="ghost"
                          onClick={() => navigate(`/admin/eventos/editar/${evento.id}`)}
                        />
                      </Tooltip>
                      <Tooltip label="Excluir">
                        <IconButton
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => openDeleteDialog(evento)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {eventos.length === 0 && (
            <Box p={10} textAlign="center">
              <Text color="gray.500" fontSize="lg">
                Nenhum evento cadastrado
              </Text>
              <Button
                mt={4}
                leftIcon={<FaPlus />}
                colorScheme="brand"
                onClick={() => navigate('/admin/eventos/novo')}
              >
                Criar Primeiro Evento
              </Button>
            </Box>
          )}
        </Box>
      </VStack>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Evento
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir o evento "{eventoToDelete?.titulo}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={deleteLoading}
                loadingText="Excluindo..."
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
