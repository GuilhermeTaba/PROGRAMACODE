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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaKey,
  FaUserShield,
  FaUser
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import apiService from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function GerenciarAdmins() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  
  const isSuperAdmin = user?.role === 'super_admin';
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'admin',
    ativo: true
  });
  const [passwordData, setPasswordData] = useState({
    novaSenha: '',
    confirmarSenha: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      const response = await apiService.getAdmins();
      setAdmins(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar administradores',
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
    if (!adminToDelete) return;

    setDeleteLoading(true);
    try {
      await apiService.deleteAdmin(adminToDelete.id);
      
      toast({
        title: 'Administrador excluído',
        description: 'O administrador foi excluído com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      await loadAdmins();
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao excluir administrador',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteDialog = (admin) => {
    setAdminToDelete(admin);
    onOpen();
  };

  const openCreateModal = () => {
    setFormData({
      nome: '',
      email: '',
      senha: '',
      role: 'admin',
      ativo: true
    });
    setIsCreateModalOpen(true);
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setFormData({
      nome: admin.nome,
      email: admin.email,
      senha: '',
      role: admin.role,
      ativo: admin.ativo
    });
    setIsEditModalOpen(true);
  };

  const openPasswordModal = (admin) => {
    setSelectedAdmin(admin);
    setPasswordData({
      novaSenha: '',
      confirmarSenha: ''
    });
    setIsPasswordModalOpen(true);
  };

  const handleSubmit = async (isEdit = false) => {
    if (!formData.nome || !formData.email) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Nome e email são obrigatórios',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isEdit && !formData.senha) {
      toast({
        title: 'Campo obrigatório',
        description: 'Senha é obrigatória para novos administradores',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFormLoading(true);
    try {
      if (isEdit) {
        await apiService.updateAdmin(selectedAdmin.id, {
          nome: formData.nome,
          email: formData.email,
          role: formData.role,
          ativo: formData.ativo
        });
        toast({
          title: 'Administrador atualizado',
          description: 'As informações foram atualizadas com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setIsEditModalOpen(false);
      } else {
        await apiService.createAdmin(formData);
        toast({
          title: 'Administrador criado',
          description: 'O novo administrador foi criado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setIsCreateModalOpen(false);
      }
      
      await loadAdmins();
    } catch (error) {
      toast({
        title: `Erro ao ${isEdit ? 'atualizar' : 'criar'} administrador`,
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordData.novaSenha || !passwordData.confirmarSenha) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos de senha',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordData.novaSenha !== passwordData.confirmarSenha) {
      toast({
        title: 'Senhas não coincidem',
        description: 'A nova senha e a confirmação devem ser iguais',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordData.novaSenha.length < 8) {
      toast({
        title: 'Senha muito curta',
        description: 'A senha deve ter pelo menos 8 caracteres',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFormLoading(true);
    try {
      await apiService.changeAdminPassword(selectedAdmin.id, passwordData.novaSenha);
      
      toast({
        title: 'Senha alterada',
        description: 'A senha foi alterada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setIsPasswordModalOpen(false);
    } catch (error) {
      toast({
        title: 'Erro ao alterar senha',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setFormLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="red.500" />
          <Text>Carregando administradores...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Heading size="lg" mb={2}>Gerenciar Administradores</Heading>
            <Text color="gray.600">
              Gerencie os usuários com acesso ao painel administrativo
            </Text>
          </Box>
          
          {isSuperAdmin && (
            <Button
              leftIcon={<FaPlus />}
              colorScheme="red"
              onClick={openCreateModal}
            >
              Novo Administrador
            </Button>
          )}
        </HStack>

        <Box overflowX="auto" bg="white" borderRadius="lg" shadow="sm">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Função</Th>
                <Th>Status</Th>
                <Th>Último Login</Th>
                <Th width="120px">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {admins.map((admin) => (
                <Tr key={admin.id}>
                  <Td>
                    <HStack>
                      <Box
                        as={admin.role === 'super_admin' ? FaUserShield : FaUser}
                        color={admin.role === 'super_admin' ? 'red.500' : 'gray.500'}
                      />
                      <Text fontWeight="medium">{admin.nome}</Text>
                    </HStack>
                  </Td>
                  <Td>{isSuperAdmin ? admin.email : '***@***.***'}</Td>
                  <Td>
                    <Badge 
                      colorScheme={admin.role === 'super_admin' ? 'red' : 'blue'}
                      variant="subtle"
                    >
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge 
                      colorScheme={admin.ativo ? 'green' : 'red'}
                      variant="subtle"
                    >
                      {admin.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {formatDate(admin.ultimoLogin)}
                    </Text>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      {isSuperAdmin && (
                        <>
                          <Tooltip label="Editar">
                            <IconButton
                              icon={<FaEdit />}
                              size="sm"
                              variant="ghost"
                              colorScheme="blue"
                              onClick={() => openEditModal(admin)}
                            />
                          </Tooltip>
                          
                          <Tooltip label="Alterar Senha">
                            <IconButton
                              icon={<FaKey />}
                              size="sm"
                              variant="ghost"
                              colorScheme="orange"
                              onClick={() => openPasswordModal(admin)}
                            />
                          </Tooltip>
                          
                          <Tooltip label="Excluir">
                            <IconButton
                              icon={<FaTrash />}
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => openDeleteDialog(admin)}
                            />
                          </Tooltip>
                        </>
                      )}
                      {!isSuperAdmin && (
                        <Text fontSize="sm" color="gray.500">
                          Apenas visualização
                        </Text>
                      )}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      {/* Modal de Criação */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Administrador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Nome completo"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={formData.senha}
                  onChange={(e) => setFormData({...formData, senha: e.target.value})}
                  placeholder="Mínimo 8 caracteres"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Função</FormLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="admin">Administrador</option>
                  <option value="super_admin">Super Administrador</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              colorScheme="red" 
              onClick={() => handleSubmit(false)}
              isLoading={formLoading}
            >
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Edição */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Administrador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Nome completo"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Função</FormLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="admin">Administrador</option>
                  <option value="super_admin">Super Administrador</option>
                </Select>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Ativo</FormLabel>
                <Switch
                  isChecked={formData.ativo}
                  onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              colorScheme="red" 
              onClick={() => handleSubmit(true)}
              isLoading={formLoading}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Alteração de Senha */}
      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar Senha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nova Senha</FormLabel>
                <Input
                  type="password"
                  value={passwordData.novaSenha}
                  onChange={(e) => setPasswordData({...passwordData, novaSenha: e.target.value})}
                  placeholder="Mínimo 8 caracteres"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirmar Nova Senha</FormLabel>
                <Input
                  type="password"
                  value={passwordData.confirmarSenha}
                  onChange={(e) => setPasswordData({...passwordData, confirmarSenha: e.target.value})}
                  placeholder="Digite novamente a nova senha"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setIsPasswordModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handlePasswordChange}
              isLoading={formLoading}
            >
              Alterar Senha
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Administrador
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir o administrador <strong>{adminToDelete?.nome}</strong>?
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
