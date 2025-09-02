import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
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
  Tooltip,
  Switch,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { 
  FaEye, 
  FaTrash, 
  FaReply, 
  FaEnvelope,
  FaEnvelopeOpen,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import apiService from '../../services/api';

export default function GerenciarMensagens() {
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [mensagemToDelete, setMensagemToDelete] = useState(null);
  const [mensagemToView, setMensagemToView] = useState(null);
  const [showRead, setShowRead] = useState(true);
  
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    loadMensagens();
  }, []);

  const loadMensagens = async () => {
    try {
      const response = await apiService.getMensagens();
      setMensagens(response.data || []);
    } catch (error) {
      toast({
        title: 'Erro ao carregar mensagens',
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
    if (!mensagemToDelete) return;

    setDeleteLoading(true);
    try {
      await apiService.deleteMensagem(mensagemToDelete.id);
      toast({
        title: 'Mensagem excluída com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await loadMensagens();
      onDeleteClose();
    } catch (error) {
      toast({
        title: 'Erro ao excluir mensagem',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleLida = async (mensagem) => {
    try {
      await apiService.updateMensagem(mensagem.id, {
        lida: !mensagem.lida
      });
      toast({
        title: `Mensagem marcada como ${mensagem.lida ? 'não lida' : 'lida'}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      await loadMensagens();
    } catch (error) {
      toast({
        title: 'Erro ao atualizar mensagem',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleRespondida = async (mensagem) => {
    try {
      await apiService.updateMensagem(mensagem.id, {
        respondida: !mensagem.respondida
      });
      toast({
        title: `Mensagem marcada como ${mensagem.respondida ? 'não respondida' : 'respondida'}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      await loadMensagens();
    } catch (error) {
      toast({
        title: 'Erro ao atualizar mensagem',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openDeleteDialog = (mensagem) => {
    setMensagemToDelete(mensagem);
    onDeleteOpen();
  };

  const openViewDialog = async (mensagem) => {
    setMensagemToView(mensagem);
    onViewOpen();
    
    // Marcar como lida automaticamente ao visualizar
    if (!mensagem.lida) {
      try {
        await apiService.updateMensagem(mensagem.id, { lida: true });
        await loadMensagens();
      } catch (error) {
        console.error('Erro ao marcar mensagem como lida:', error);
      }
    }
  };

  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleString('pt-BR');
    } catch (error) {
      return dataString;
    }
  };

  if (loading) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>Carregando mensagens...</Text>
        </VStack>
      </Center>
    );
  }

  const mensagensFiltradas = mensagens.filter(mensagem => showRead || !mensagem.lida);
  const mensagensNaoLidas = mensagens.filter(m => !m.lida).length;
  const mensagensNaoRespondidas = mensagens.filter(m => !m.respondida).length;

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="xl" color="gray.900">
              Gerenciar Mensagens
            </Heading>
            <Text color="gray.600">
              {mensagensFiltradas.length} mensagem{mensagensFiltradas.length !== 1 ? 's' : ''} {showRead ? 'total' : 'não lida'}{mensagensFiltradas.length !== 1 ? 's' : ''}
            </Text>
          </VStack>
          
          <FormControl display="flex" alignItems="center" minW="auto">
            <FormLabel htmlFor="show-read" mb="0" fontSize="sm" color="gray.600" whiteSpace="nowrap">
              Mostrar lidas
            </FormLabel>
            <Switch 
              id="show-read"
              colorScheme="red"
              size="sm"
              isChecked={showRead}
              onChange={(e) => setShowRead(e.target.checked)}
              ml={2}
            />
          </FormControl>
        </HStack>

        {/* Estatísticas */}
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
              <StatLabel>Total de Mensagens</StatLabel>
              <StatNumber>{mensagens.length}</StatNumber>
              <StatHelpText>Todas as mensagens</StatHelpText>
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
              <StatLabel>Não Lidas</StatLabel>
              <StatNumber color="brand.500">{mensagensNaoLidas}</StatNumber>
              <StatHelpText>Precisam de atenção</StatHelpText>
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
              <StatLabel>Não Respondidas</StatLabel>
              <StatNumber color="orange.500">{mensagensNaoRespondidas}</StatNumber>
              <StatHelpText>Aguardando resposta</StatHelpText>
            </Stat>
          </Box>
        </Flex>

        {/* Tabela de Mensagens */}
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
                <Th>Status</Th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Data</Th>
                <Th>Mensagem</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mensagensFiltradas.map((mensagem) => (
                <Tr key={mensagem.id} bg={!mensagem.lida ? "blue.50" : "white"}>
                  <Td>
                    <VStack spacing={1}>
                      <Badge
                        colorScheme={mensagem.lida ? 'green' : 'blue'}
                        variant="solid"
                      >
                        {mensagem.lida ? 'Lida' : 'Nova'}
                      </Badge>
                      {mensagem.respondida && (
                        <Badge colorScheme="purple" variant="outline">
                          Respondida
                        </Badge>
                      )}
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontWeight={!mensagem.lida ? "bold" : "normal"}>
                      {mensagem.nome}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {mensagem.email}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {formatarData(mensagem.dataEnvio)}
                    </Text>
                  </Td>
                  <Td>
                    <Text noOfLines={2} fontSize="sm" maxW="300px">
                      {mensagem.mensagem}
                    </Text>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <Tooltip label="Visualizar mensagem">
                        <IconButton
                          icon={<FaEye />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => openViewDialog(mensagem)}
                        />
                      </Tooltip>
                      <Tooltip label={mensagem.lida ? 'Marcar como não lida' : 'Marcar como lida'}>
                        <IconButton
                          icon={mensagem.lida ? <FaEnvelopeOpen /> : <FaEnvelope />}
                          size="sm"
                          colorScheme="green"
                          variant="ghost"
                          onClick={() => toggleLida(mensagem)}
                        />
                      </Tooltip>
                      <Tooltip label={mensagem.respondida ? 'Marcar como não respondida' : 'Marcar como respondida'}>
                        <IconButton
                          icon={mensagem.respondida ? <FaTimes /> : <FaCheck />}
                          size="sm"
                          colorScheme="purple"
                          variant="ghost"
                          onClick={() => toggleRespondida(mensagem)}
                        />
                      </Tooltip>
                      <Tooltip label="Excluir">
                        <IconButton
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => openDeleteDialog(mensagem)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {mensagensFiltradas.length === 0 && (
            <Box p={10} textAlign="center">
              <Text color="gray.500" fontSize="lg">
                {mensagens.length === 0 ? 'Nenhuma mensagem recebida' : 'Nenhuma mensagem não lida'}
              </Text>
            </Box>
          )}
        </Box>
      </VStack>

      {/* Dialog de Visualização */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack justify="space-between">
              <Text>Mensagem de {mensagemToView?.nome}</Text>
              <HStack>
                {mensagemToView?.lida && (
                  <Badge colorScheme="green">Lida</Badge>
                )}
                {mensagemToView?.respondida && (
                  <Badge colorScheme="purple">Respondida</Badge>
                )}
              </HStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4}>
              <Box>
                <Text fontWeight="bold" color="gray.700">Email:</Text>
                <Text>{mensagemToView?.email}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color="gray.700">Data:</Text>
                <Text>{formatarData(mensagemToView?.dataEnvio)}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color="gray.700">Mensagem:</Text>
                <Text whiteSpace="pre-wrap" bg="gray.50" p={4} borderRadius="md">
                  {mensagemToView?.mensagem}
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button
                leftIcon={<FaReply />}
                colorScheme="brand"
                onClick={() => {
                  window.location.href = `mailto:${mensagemToView?.email}?subject=Re: Sua mensagem para Blockchain Insper&body=Olá ${mensagemToView?.nome},%0D%0A%0D%0A`;
                }}
              >
                Responder por Email
              </Button>
              <Button
                colorScheme={mensagemToView?.respondida ? "gray" : "purple"}
                onClick={() => {
                  toggleRespondida(mensagemToView);
                  onViewClose();
                }}
              >
                {mensagemToView?.respondida ? 'Marcar como não respondida' : 'Marcar como respondida'}
              </Button>
              <Button variant="ghost" onClick={onViewClose}>
                Fechar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Mensagem
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir a mensagem de "{mensagemToDelete?.nome}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
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
