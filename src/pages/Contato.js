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
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaLinkedin, 
  FaInstagram,
  FaTwitter,
  FaDiscord 
} from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
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
  const toast = useToast();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [contatos, setContatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // texto de erro (opcional)
  const defaultContatos = {
    email: "contato@insper.edu.br",
    telefone: "(11) 4000-0000",
    endereco: "Insper — Rua Miguel Stefano, 3000, São Paulo, SP",
    horarioFuncionamento: "seg–sex, 07:00–23:00",
    redesSociais: {
      linkedin: "https://www.linkedin.com",
      instagram: "https://www.instagram.com",
      twitter: ""
    }
  };

  useEffect(() => {
    const carregarContatos = async () => {
      try {
        setLoading(true);
        const response = await apiService.getContatos();

        if (response && response.success && response.data) {
          setContatos(response.data);
          setError(null);
        } else {
          // usa fallback local quando não há resposta válida
          console.warn("Contatos: resposta inválida, usando dados padrão.");
          setContatos(defaultContatos);
          setError("Não foi possível carregar as informações do servidor — exibindo dados locais.");
        }
      } catch (err) {
        console.error("Erro ao carregar contatos:", err);
        // fallback para dados locais para não bloquear a UI
        setContatos(defaultContatos);
        setError("Não foi possível conectar ao servidor — exibindo dados locais.");
      } finally {
        setLoading(false);
      }
    };

    carregarContatos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // simulação de envio — não há backend por enquanto
    toast({
      title: "Mensagem enviada (simulação)",
      description: "Sua mensagem foi preparada, mas o envio real não está configurado.",
      status: "success",
      duration: 3500,
      isClosable: true,
    });
    setNome("");
    setEmail("");
    setMensagem("");
  };

  if (loading) {
    return (
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <Heading fontSize={{ base: "4xl", md: "5xl" }}>Contato</Heading>
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
    /* remove the page vertical padding so full-bleed sections can touch navbar/footer */
    <Container maxW="container.xl" pt={0} pb={0}>
       {/* Seção 1 — full-bleed (topo) com gradiente vermelho -> preto; conteúdo centrado no container */}
      <Box
        as="section"
        width="100vw"
        position="relative"
        left="50%"
        ml="-50vw"
        bgGradient="linear(to-br, black 0%, #7a0f0f 50%, #ff4d4d 100%)"
        color="white"
        /* maior altura e padding para um bloco mais imponente */
        py={{ base: 10, md: 16 }}
        mb={0}
        rounded={0}
        minH={{ base: "48vh", md: "36vh" }}
        display="flex"
        alignItems="center"
      >
        <Container maxW="container.xl">
          <Stack spacing={{ base: 6, md: 8 }}>
            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              lineHeight="1"
              fontWeight="800"
              color="white"
              mt={0}
            >
              Contato
            </Heading>
            <Text color="gray.200" fontSize={{ base: "md", md: "lg" }}>
              Quer falar com a equipe? Use um dos canais abaixo ou envie uma mensagem pelo formulário.
            </Text>

            <HStack spacing={{ base: 4, md: 8 }}>
              <Link href="https://discord.com" isExternal aria-label="Discord">
                <IconButton
                  aria-label="Discord"
                  icon={<FaDiscord />}
                  variant="ghost"
                  size="lg"
                  fontSize={{ base: "22px", md: "28px" }}
                  color="white"
                />
              </Link>

              <Link href="https://instagram.com" isExternal aria-label="Instagram">
                <IconButton
                  aria-label="Instagram"
                  icon={<FaInstagram />}
                  variant="ghost"
                  size="lg"
                  fontSize={{ base: "22px", md: "28px" }}
                  color="white"
                />
              </Link>

              <Link href="https://www.linkedin.com" isExternal aria-label="LinkedIn">
                <IconButton
                  aria-label="LinkedIn"
                  icon={<FaLinkedin />}
                  variant="ghost"
                  size="lg"
                  fontSize={{ base: "22px", md: "28px" }}
                  color="white"
                />
              </Link>

              <Link href="mailto:contato@insper.edu.br" isExternal aria-label="Email">
                <IconButton
                  aria-label="Email"
                  icon={<FiMail />}
                  variant="ghost"
                  size="lg"
                  fontSize={{ base: "22px", md: "28px" }}
                  color="white"
                />
              </Link>
            </HStack>
          </Stack>
        </Container>
      </Box>
 
      {/* Seção 2 — Formulário visual */}
      <Box bg="white" p={8} rounded="md" boxShadow="sm" mb={8}>
        <Heading size="md" mb={4}>
          Envie uma mensagem
        </Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl id="nome" isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                bg="gray.50"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="gray.50"
              />
            </FormControl>

            <FormControl id="mensagem" gridColumn={{ base: "auto", md: "span 2" }} isRequired>
              <FormLabel>Mensagem</FormLabel>
              <Textarea
                placeholder="Escreva sua mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                bg="gray.50"
                rows={6}
              />
            </FormControl>
          </SimpleGrid>

          <Stack direction="row" justify="flex-end" mt={4}>
            <Button type="submit" colorScheme="orange">
              Enviar (simulação)
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Seção 3 — full-bleed (rodapé) com gradiente vermelho -> preto; sem margem para encostar no footer */}
      <Box
        as="section"
        width="100vw"
        position="relative"
        left="50%"
        ml="-50vw"
        bgGradient="linear(to-br, black 0%, #7a0f0f 50%, #ff4d4d 100%)"
        color="white"
        /* internal padding, no top margin so it connects directly to the previous block,
           and no bottom margin so it will sit flush with the footer that comes after this page */
        py={6}
        mt={0}
        mb={0}
        rounded={0}
      >
        <Container maxW="container.xl">
          <Heading size="md" mb={4} color="white">
            Visite-nos
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="start">
            <Box w="100%" h={{ base: "240px", md: "320px" }} rounded="md" overflow="hidden" boxShadow="inner">
              <iframe
                title="Mapa Insper"
                src="https://www.google.com/maps?q=Rua+Quat%C3%A1+300+Sao+Paulo&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Box>

            <Stack spacing={3}>
              <Text fontWeight={600} color="white">Insper</Text>
              <Text color="gray.200">
                Venha nos visitar — estamos em São Paulo. Abra um horário na sua agenda e apareça para conversar!
              </Text>
              <Box bg="whiteAlpha.06" p={3} rounded="md">
                <Text fontSize="sm" color="white">
                  Endereço: Rua Quatá, 300
                </Text>
                <Text fontSize="sm" color="gray.200" mt={2}>
                  Aberto de segunda a sexta, 07:00–23:00
                </Text>
                <Link
                  mt={3}
                  display="inline-block"
                  href="https://www.google.com/maps?q=Rua+Quat%C3%A1+300+Sao+Paulo"
                  color="orange.200"
                  isExternal
                >
                  Abrir no Google Maps
                </Link>
              </Box>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </Container>
  );
}