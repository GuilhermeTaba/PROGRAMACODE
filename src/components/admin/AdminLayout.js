import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { 
  FaHome,
  FaCalendarAlt,
  FaNewspaper,
  FaUsers,
  FaEnvelope,
  FaComments,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaDatabase
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import apiService from '../../services/api';

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await apiService.getMe();
      if (response.user) {
        setUserData(response.user);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: FaHome, path: '/admin/dashboard' },
    { name: 'Eventos', icon: FaCalendarAlt, path: '/admin/eventos' },
    { name: 'Notícias', icon: FaNewspaper, path: '/admin/noticias' },
    { name: 'Contatos', icon: FaEnvelope, path: '/admin/contatos' },
    { name: 'Mensagens', icon: FaComments, path: '/admin/mensagens' },
    ...(userData?.role === 'super_admin' ? [{ name: 'Administradores', icon: FaUsers, path: '/admin/admins' }] : []),
    { name: 'Backups', icon: FaDatabase, path: '/admin/backups' },
    { name: 'Configurações', icon: FaCog, path: '/admin/perfil' },
  ];

  const NavItem = ({ icon, children, path, ...rest }) => {
    const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
    
    return (
      <Button
        variant={isActive ? 'solid' : 'ghost'}
        colorScheme={isActive ? 'red' : 'gray'}
        justifyContent="start"
        leftIcon={<Box as={icon} />}
        w="full"
        h="12"
        fontSize="sm"
        fontWeight={isActive ? 'semibold' : 'medium'}
        onClick={() => {
          navigate(path);
          onClose && onClose();
        }}
        {...rest}
      >
        {children}
      </Button>
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <Box
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      shadow="sm"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8">
        <Box position="relative">
          <Text 
            fontSize="xl" 
            fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" 
            fontWeight="800" 
            bgGradient="linear(to-r, red.500, red.600, red.700)"
            bgClip="text"
            letterSpacing="-0.02em"
            lineHeight="1.1"
          >
            BLOCKCHAIN
          </Text>
          <Text 
            fontSize="lg" 
            fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" 
            fontWeight="700" 
            color="black"
            letterSpacing="-0.01em"
            mt="-1"
          >
            INSPER
          </Text>
          <Box 
            h="1" 
            w="full" 
            bgGradient="linear(to-r, red.500, black)"
            borderRadius="full"
            mt="1"
            opacity="0.9"
          />
        </Box>
      </Flex>
      
      <VStack spacing={1} align="stretch" px={4}>
        {menuItems.map((item) => (
          <NavItem key={item.name} icon={item.icon} path={item.path}>
            {item.name}
          </NavItem>
        ))}
      </VStack>

      {/* User Info at Bottom */}
      <Box pos="absolute" bottom={4} left={4} right={4}>
        <Box
          p={3}
          bg="gray.50"
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
        >
          <HStack spacing={3}>
            <Avatar 
              size="sm" 
              name={userData?.nome}
              bg="red.500"
              color="white"
            />
            <Box flex={1} minW={0}>
              <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                {userData?.nome}
              </Text>
              <Badge 
                size="sm"
                colorScheme={userData?.role === 'super_admin' ? 'red' : 'blue'}
                variant="subtle"
              >
                {userData?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </Badge>
            </Box>
          </HStack>
          
          <Button
            leftIcon={<FaSignOutAlt />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            w="full"
            mt={2}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const MobileNav = ({ onOpen, userData, ...rest }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FaBars />}
      />

      <Box display={{ base: 'flex', md: 'none' }}>
        <Text 
          fontSize="lg" 
          fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" 
          fontWeight="800" 
          bgGradient="linear(to-r, red.500, red.600, red.700)"
          bgClip="text"
          letterSpacing="-0.02em"
          lineHeight="1.1"
        >
          BLOCKCHAIN
        </Text>
        <Text 
          fontSize="md" 
          fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" 
          fontWeight="700" 
          color="black"
          letterSpacing="-0.01em"
          ml="2"
        >
          INSPER
        </Text>
      </Box>

      <HStack spacing={{ base: '2', md: '6' }}>
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            size="sm"
            rightIcon={<FaChevronDown />}
          >
            <HStack spacing={2}>
              <Avatar 
                size="sm" 
                name={userData?.nome}
                bg="red.500"
                color="white"
              />
              <Text fontSize="sm" display={{ base: 'none', md: 'block' }}>
                {userData?.nome?.split(' ')[0]}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem 
              icon={<FaCog />}
              onClick={() => navigate('/admin/perfil')}
            >
              Configurações
            </MenuItem>
            <MenuDivider />
            <MenuItem 
              icon={<FaSignOutAlt />}
              onClick={handleLogout}
              color="red.500"
            >
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default function AdminLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await apiService.getMe();
      if (response.user) {
        setUserData(response.user);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} userData={userData} />
      
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}