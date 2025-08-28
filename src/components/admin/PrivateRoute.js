import { useAuth } from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { Center, Spinner, VStack, Text } from '@chakra-ui/react';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Center h="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>Verificando autenticação...</Text>
        </VStack>
      </Center>
    );
  }

  if (!isAuthenticated) {
    // Redirecionar para login, salvando a localização atual
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
