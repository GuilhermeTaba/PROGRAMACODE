import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaLinkedin, 
  FaInstagram,
  FaTwitter 
} from 'react-icons/fa';
import apiService from '../services/api';

function ContactCard({ icon, title, content, link }) {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <Box
      bg={bg}
      p={8}
      borderRadius="xl"
      shadow="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{ 
        transform: 'translateY(-2px)', 
        shadow: 'xl',
        transition: 'all 0.3s ease'
      }}
    >
      <VStack spacing={4} align="center" textAlign="center">
        <Icon
          as={icon}
          w={8}
          h={8}
          color="red.500"
        />
        <Heading size="md" color="gray.900">
          {title}
        </Heading>
        {link ? (
          <Link 
            href={link} 
            color="red.500" 
            _hover={{ color: 'red.600' }}
            isExternal
          >
            {content}
          </Link>
        ) : (
          <Text color="gray.600" whiteSpace="pre-line">
            {content}
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default function Contato() {
  const [contatos, setContatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarContatos = async () => {
      try {
        setLoading(true);
        const response = await apiService.getContatos();
        
        if (response.success && response.data) {
          setContatos(response.data);
        } else {
          setError('Não foi possível carregar as informações de contato.');
        }
      } catch (error) {
        console.error('Erro ao carregar contatos:', error);
        setError('Não foi possível carregar as informações de contato.');
      } finally {
        setLoading(false);
      }
    };

    carregarContatos();
  }, []);

  if (loading) {
    return (
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <Heading fontSize={{ base: '4xl', md: '5xl' }}>Contato</Heading>
            <Spinner size="xl" color="red.500" thickness="4px" />
            <Text>Carregando informações de contato...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <Heading fontSize={{ base: '4xl', md: '5xl' }}>Contato</Heading>
            <Alert status="error" borderRadius="lg">
              <AlertIcon />
              <Box>
                <AlertTitle>Erro ao carregar contatos!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
          </VStack>
        </Container>
      </Box>
    );
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      content: contatos.email,
      link: `mailto:${contatos.email}`
    },
    {
      icon: FaPhone,
      title: 'Telefone',
      content: contatos.telefone,
      link: `tel:${contatos.telefone.replace(/[^\d]/g, '')}`
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Endereço',
      content: contatos.endereco,
      link: null
    },
    {
      icon: FaClock,
      title: 'Horário de Funcionamento',
      content: contatos.horarioFuncionamento,
      link: null
    }
  ];

  const socialLinks = [];
  
  if (contatos.redesSociais.linkedin) {
    socialLinks.push({
      icon: FaLinkedin,
      title: 'LinkedIn',
      content: contatos.redesSociais.linkedin.replace('https://', ''),
      link: contatos.redesSociais.linkedin
    });
  }

  if (contatos.redesSociais.instagram) {
    socialLinks.push({
      icon: FaInstagram,
      title: 'Instagram',
      content: contatos.redesSociais.instagram.replace('https://', ''),
      link: contatos.redesSociais.instagram
    });
  }

  if (contatos.redesSociais.twitter) {
    socialLinks.push({
      icon: FaTwitter,
      title: 'Twitter',
      content: contatos.redesSociais.twitter.replace('https://', ''),
      link: contatos.redesSociais.twitter
    });
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        py={20}
        bg="gray.900"
        color="white"
      >
        <Container maxW="7xl">
          <VStack spacing={6} textAlign="center">
            <Heading
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="bold"
            >
              Contato
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              color="gray.300"
            >
              Entre em contato conosco para parcerias, colaborações ou 
              para conhecer mais sobre nosso trabalho
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Informações de Contato */}
      <Box py={20} bg="gray.50">
        <Container maxW="7xl">
          <VStack spacing={12}>
            <Stack textAlign="center" spacing={4}>
              <Heading
                fontSize={{ base: '3xl', md: '4xl' }}
                color="gray.900"
                fontWeight="bold"
              >
                Informações de Contato
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Principais canais para entrar em contato com nossa equipe
              </Text>
            </Stack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {contactInfo.map((info, index) => (
                <ContactCard
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  content={info.content}
                  link={info.link}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Redes Sociais */}
      {socialLinks.length > 0 && (
        <Box py={20} bg="white">
          <Container maxW="7xl">
            <VStack spacing={12}>
              <Stack textAlign="center" spacing={4}>
                <Heading
                  fontSize={{ base: '3xl', md: '4xl' }}
                  color="gray.900"
                  fontWeight="bold"
                >
                  Siga-nos nas Redes Sociais
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Acompanhe nossas atividades e novidades
                </Text>
              </Stack>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
                {socialLinks.map((social, index) => (
                  <ContactCard
                    key={index}
                    icon={social.icon}
                    title={social.title}
                    content={social.content}
                    link={social.link}
                  />
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      )}

      {/* Localização */}
      <Box py={20} bg="gray.50">
        <Container maxW="7xl">
          <VStack spacing={12}>
            <Stack textAlign="center" spacing={4}>
              <Heading
                fontSize={{ base: '3xl', md: '4xl' }}
                color="gray.900"
                fontWeight="bold"
              >
                Localização
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Encontre-nos no campus do Insper
              </Text>
            </Stack>
            
            <Box
              w="full"
              h="400px"
              borderRadius="xl"
              overflow="hidden"
              shadow="lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.398494477805!2d-46.67754842370871!3d-23.599496862507894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a9c1fb0c1a3%3A0x1b8c9f8b5c8f9b8!2sInsper%20Instituto%20de%20Ensino%20e%20Pesquisa!5e0!3m2!1spt!2sbr!4v1703000000000!5m2!1spt!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Insper"
              />
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}