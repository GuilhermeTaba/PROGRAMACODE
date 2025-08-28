import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  useColorModeValue,
  HStack,
  Icon,
  Divider,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { 
  FaLinkedin, 
  FaInstagram, 
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import apiService from '../services/api';

const SocialButton = ({ children, label, href }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('gray.600', 'gray.300');
  
  if (!href) return null;
  
  return (
    <Link
      href={href}
      isExternal
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w={10}
      h={10}
      bg={bg}
      color={color}
      borderRadius="full"
      _hover={{
        bg: 'red.500',
        color: 'white',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.3s"
      aria-label={label}
    >
      {children}
    </Link>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight="bold" fontSize="lg" mb={4} color="gray.900">
      {children}
    </Text>
  );
};

export default function Footer() {
  const [contatos, setContatos] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const carregarContatos = async () => {
      try {
        setLoading(true);
        const response = await apiService.getContatos();
        
        if (response.success && response.data) {
          setContatos(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar contatos no footer:', error);
        // Em caso de erro, usar dados padrão
        setContatos({
          email: 'contato@blockchaininsper.com.br',
          telefone: '(11) 3000-0000',
          endereco: 'Rua Quatá, 300 - Vila Olímpia, São Paulo - SP, 04546-042',
          redesSociais: {
            linkedin: 'https://linkedin.com/company/blockchain-insper',
            instagram: 'https://instagram.com/blockchaininsper',
            twitter: 'https://twitter.com/blockchaininsper'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    carregarContatos();
  }, []);

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor}>
      <Container maxW="7xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          {/* Sobre */}
          <Stack spacing={6}>
            <Box>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="gray.900"
                mb={2}
              >
                Blockchain Insper
              </Text>
              <Text fontSize="sm" color="gray.600" maxW="250px">
                Organização estudantil dedicada à formação de lideranças 
                para o mercado financeiro através da tecnologia blockchain.
              </Text>
            </Box>
          </Stack>

          {/* Links Rápidos */}
          <Stack align="flex-start">
            <ListHeader>Links Rápidos</ListHeader>
            <Link href="/" color="gray.600" _hover={{ color: 'red.500' }}>
              Home
            </Link>
            <Link href="/eventos" color="gray.600" _hover={{ color: 'red.500' }}>
              Eventos
            </Link>
            <Link href="/noticias" color="gray.600" _hover={{ color: 'red.500' }}>
              Notícias
            </Link>
            <Link href="/contato" color="gray.600" _hover={{ color: 'red.500' }}>
              Contato
            </Link>
          </Stack>

          {/* Áreas de Atuação */}
          <Stack align="flex-start">
            <ListHeader>Áreas de Atuação</ListHeader>
            <Text color="gray.600" fontSize="sm">Business</Text>
            <Text color="gray.600" fontSize="sm">Finanças</Text>
            <Text color="gray.600" fontSize="sm">Tecnologia</Text>
          </Stack>

          {/* Contato */}
          <Stack align="flex-start">
            <ListHeader>Contato</ListHeader>
            {loading ? (
              <Spinner size="sm" color="red.500" />
            ) : contatos ? (
              <VStack align="flex-start" spacing={3}>
                <HStack color="gray.600" fontSize="sm">
                  <Icon as={FaEnvelope} />
                  <Link 
                    href={`mailto:${contatos.email}`}
                    _hover={{ color: 'red.500' }}
                  >
                    {contatos.email}
                  </Link>
                </HStack>
                
                {contatos.telefone && (
                  <HStack color="gray.600" fontSize="sm">
                    <Icon as={FaPhone} />
                    <Link 
                      href={`tel:${contatos.telefone.replace(/[^\d]/g, '')}`}
                      _hover={{ color: 'red.500' }}
                    >
                      {contatos.telefone}
                    </Link>
                  </HStack>
                )}
                
                <HStack color="gray.600" fontSize="sm" align="flex-start">
                  <Icon as={FaMapMarkerAlt} mt={0.5} />
                  <Text>
                    {contatos.endereco.split(',').map((linha, index) => (
                      <span key={index}>
                        {linha.trim()}
                        {index < contatos.endereco.split(',').length - 1 && <br />}
                      </span>
                    ))}
                  </Text>
                </HStack>
              </VStack>
            ) : (
              <Text fontSize="sm" color="gray.500">
                Carregando informações...
              </Text>
            )}
          </Stack>
        </SimpleGrid>

        <Divider my={8} borderColor={borderColor} />

        {/* Bottom Section */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          spacing={4}
        >
          <Text fontSize="sm" color="gray.600">
            © 2024 Blockchain Insper. Todos os direitos reservados.
          </Text>
          
          {!loading && contatos && (
            <HStack spacing={4}>
              <SocialButton
                label="LinkedIn"
                href={contatos.redesSociais?.linkedin}
              >
                <FaLinkedin />
              </SocialButton>
              <SocialButton
                label="Instagram"
                href={contatos.redesSociais?.instagram}
              >
                <FaInstagram />
              </SocialButton>
              <SocialButton
                label="Twitter"
                href={contatos.redesSociais?.twitter}
              >
                <FaTwitter />
              </SocialButton>
            </HStack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}