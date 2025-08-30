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

export default function GerenciarNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [noticiaToDelete, setNoticiaToDelete] = useState(null);
  const [showInactive, setShowInactive] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    loadNoticias();
  }, []);

  const loadNoticias = async () => {
    try {
      const response = await apiService.getNoticiasAdmin();
      setNoticias(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar notícias',
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
    if (!noticiaToDelete) return;

    setDeleteLoading(true);
    try {
      await apiService.deleteNoticia(noticiaToDelete.id);
      toast({
        title: 'Notícia excluída com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await loadNoticias(); // Recarregar lista
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao excluir notícia',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleDestaque = async (noticia) => {
    try {
      await apiService.updateNoticia(noticia.id, {
        destaque: !noticia.destaque
      });
      toast({
        title: `Notícia ${noticia.destaque ? 'removida do' : 'adicionada ao'} destaque`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await loadNoticias();
    } catch (error) {
      toast({
        title: 'Erro ao atualizar notícia',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openDeleteDialog = (noticia) => {
    setNoticiaToDelete(noticia);
    onOpen();
  };

  if (loading) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>Carregando notícias...</Text>
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
              Gerenciar Notícias
            </Heading>
            <Text color="gray.600">
              {noticias.filter(n => showInactive || n.ativo).length} notícia{noticias.filter(n => showInactive || n.ativo).length !== 1 ? 's' : ''} {showInactive ? 'total' : 'ativa'}{noticias.filter(n => showInactive || n.ativo).length !== 1 ? 's' : ''}
            </Text>
          </VStack>
          
          <HStack spacing={6}>
            <FormControl display="flex" alignItems="center" minW="auto">
              <FormLabel htmlFor="show-inactive-news" mb="0" fontSize="sm" color="gray.600" whiteSpace="nowrap">
                Mostrar inativas
              </FormLabel>
              <Switch 
                id="show-inactive-news"
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
              onClick={() => navigate('/admin/noticias/novo')}
              flexShrink={0}
            >
              Nova Notícia
            </Button>
          </HStack>
        </HStack>

        {/* Tabela de Notícias */}
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
                <Th>Autor</Th>
                <Th>Categoria</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {noticias.filter(noticia => showInactive || noticia.ativo).map((noticia) => (
                <Tr key={noticia.id}>
                  <Td>
                    <Image
                      src={noticia.imagem}
                      alt={noticia.titulo}
                      w="60px"
                      h="40px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" noOfLines={1}>
                        {noticia.titulo}
                      </Text>
                      <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {noticia.resumo}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {noticia.dataFormatada}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {noticia.autor}
                    </Text>
                  </Td>
                  <Td>
                    <Badge colorScheme="purple" variant="subtle">
                      {noticia.categoria}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack spacing={1}>
                      <Badge
                        colorScheme={noticia.ativo ? 'green' : 'red'}
                        variant="solid"
                      >
                        {noticia.ativo ? 'Ativa' : 'Inativa'}
                      </Badge>
                      {noticia.destaque && (
                        <Badge colorScheme="yellow" variant="outline">
                          Destaque
                        </Badge>
                      )}
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <Tooltip label="Ver notícia">
                        <IconButton
                          icon={<FaEye />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => window.open(`#/noticias`, '_blank')}
                        />
                      </Tooltip>
                      <Tooltip label={noticia.destaque ? 'Remover destaque' : 'Destacar'}>
                        <IconButton
                          icon={noticia.destaque ? <FaStar /> : <FaRegStar />}
                          size="sm"
                          colorScheme="yellow"
                          variant="ghost"
                          onClick={() => toggleDestaque(noticia)}
                        />
                      </Tooltip>
                      <Tooltip label="Editar">
                        <IconButton
                          icon={<FaEdit />}
                          size="sm"
                          colorScheme="green"
                          variant="ghost"
                          onClick={() => navigate(`/admin/noticias/editar/${noticia.id}`)}
                        />
                      </Tooltip>
                      <Tooltip label="Excluir">
                        <IconButton
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => openDeleteDialog(noticia)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {noticias.length === 0 && (
            <Box p={10} textAlign="center">
              <Text color="gray.500" fontSize="lg">
                Nenhuma notícia cadastrada
              </Text>
              <Button
                mt={4}
                leftIcon={<FaPlus />}
                colorScheme="brand"
                onClick={() => navigate('/admin/noticias/novo')}
              >
                Criar Primeira Notícia
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
              Excluir Notícia
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir a notícia "{noticiaToDelete?.titulo}"? 
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
