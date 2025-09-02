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
import { BRAND_RED_GRADIENT } from "../components/home/Hero";

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
        <Heading
          size="md"
          color="gray.900"
          fontFamily={"'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"}
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          {title}
        </Heading>
        {link ? (
          <Link
            href={link}
            color="red.500"
            _hover={{ color: 'red.600' }}
            isExternal
            fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
          >
            {content}
          </Link>
        ) : (
          <Text
            color="gray.600"
            whiteSpace="pre-line"
            fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
          >
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const response = await apiService.enviarMensagemContato({
        nome: nome.trim(),
        email: email.trim(),
        mensagem: mensagem.trim()
      });

      if (response.success) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: response.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        
        // Limpar formulário
        setNome("");
        setEmail("");
        setMensagem("");
      } else {
        throw new Error(response.message || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="700"
              letterSpacing="tight"
              bgGradient="linear(to-r, #ff2a2a, #a80000)"
              bgClip="text"
              display="inline-block"
              fontFamily={"'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"}
            >
              Contato
            </Heading>
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
    // outer wrapper ensures font inheritance and avoids horizontal scroll caused by full-bleed boxes
    <Box fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"} overflowX="hidden">
      {/* remove the page vertical padding so full-bleed sections can touch navbar/footer */}
      <Container maxW="container.xl" pt={0} pb={0}>
        {/* Seção 1 — full-bleed (topo) com degradê igual Parcerias.js; conteúdo centrado no container */}
        <Box
          as="section"
          width="100vw"
          position="relative"
          left="50%"
          ml="-50vw"
          backgroundImage="linear-gradient(180deg, rgba(8,2,2,0.98), rgba(40,8,8,0.95))"
          backgroundSize="cover"
          backgroundPosition="center"
          color="white"
          py={{ base: 10, md: 16 }}
          mb={0}
          rounded={0}
          minH={{ base: "48vh", md: "36vh" }}
          display="flex"
          alignItems="center"
        >
          <Container maxW="7xl" px={{ base: 6, lg: 8 }}>
            <VStack spacing={6} textAlign="center">
              <Heading
                as="h1"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="700"
                letterSpacing="tight"
                bgGradient="linear(to-r, #ff2a2a, #a80000)"
                bgClip="text"
                display="inline-block"
                fontFamily={"'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"}
              >
                Contato
              </Heading>
              <Text
                color="gray.200"
                fontSize={{ base: "md", md: "lg" }}
                fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
                fontWeight="100"
              >
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
            </VStack>
          </Container>
        </Box>

        {/* Seção 2 — Formulário visual */}
        <Box bg="white" p={8} rounded="md" boxShadow="sm" mb={8}>
          <Heading
            size="md"
            mb={4}
            fontFamily={"'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"}
            fontWeight="700"
          >
            Envie uma mensagem
          </Heading>
          <Box as="form" onSubmit={handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl id="nome" isRequired>
                <FormLabel fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}>Nome</FormLabel>
                <Input
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  bg="gray.50"
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="gray.50"
                />
              </FormControl>

              <FormControl id="mensagem" gridColumn={{ base: "auto", md: "span 2" }} isRequired>
                <FormLabel fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}>Mensagem</FormLabel>
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
              <Button 
                type="submit" 
                colorScheme="brand" 
                isLoading={submitting}
                loadingText="Enviando..."
                disabled={submitting}
              >
                Enviar Mensagem
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Seção 3 — full-bleed (rodapé) com degradê igual Parcerias.js; sem margem para encostar no footer */}
        <Box
          as="section"
          width="100vw"
          position="relative"
          left="50%"
          ml="-50vw"
          backgroundImage="linear-gradient(180deg, rgba(8,2,2,0.98), rgba(40,8,8,0.95))"
          backgroundSize="cover"
          backgroundPosition="center"
          color="white"
          py={{ base: 10, md: 14 }}   // <-- aumenta altura do bloco para dar espaço vertical
          mt={0}
          mb={0}
          rounded={0}
        >
          <Container maxW="container.xl">
            <Heading
              fontSize={{ base: "2xl", md: "4xl" }}
              mb={{ base: 6, md: 10 }}
              fontWeight="800"
              fontFamily={"'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"}
              bgGradient="linear(to-r, #ff2a2a, #a80000)"
              bgClip="text"
              display="inline-block"
              pl={{ base: 6, md: 10 }}          // alinha o texto com a borda interna do mapa
            >
              Visite-nos
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }} alignItems="center">
              {/* maior espaçamento interno ao redor do mapa */}
              <Box
                w="100%"
                h={{ base: "260px", md: "360px" }}
                rounded="md"
                overflow="hidden"
                boxShadow="inner"
                p={{ base: 6, md: 10 }}
                bg="transparent"
              >
                <Box w="100%" h="100%" rounded="md" overflow="hidden" bg="blackAlpha.600">
                  <iframe
                    title="Mapa Insper"
                    src="https://www.google.com/maps?q=Rua+Quat%C3%A1+300+Sao+Paulo&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                  />
                </Box>
              </Box>

              {/* coluna direita: mantém mesma altura do mapa e centraliza verticalmente */}
              <Stack
                spacing={3}
                h={{ base: "260px", md: "360px" }}
                justify="center"
              >
                <Text
                  fontWeight={600}
                  color="white"
                  fontFamily={"'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"}
                >
                  Insper
                </Text>
                <Text
                  color="gray.200"
                  fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
                  fontWeight="100"
                >
                  Venha nos visitar — estamos em São Paulo. Abra um horário na sua agenda e apareça para conversar!
                </Text>
                <Box
                  bgGradient="linear(to-r, rgba(255,255,255,0.03), rgba(255,255,255,0.06))"
                  p={{ base: 4, md: 6 }}
                  rounded="md"
                  borderLeft="4px solid"
                  borderColor="orange.300"
                  boxShadow="0 8px 20px rgba(0,0,0,0.35)"
                >
                  <HStack align="start" spacing={4}>
                    <Icon as={FaMapMarkerAlt} w={6} h={6} color="orange.300" mt={1} />
                    <Box>
                      <Text
                        fontSize="sm"
                        color="white"
                        fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
                        fontWeight="600"
                      >
                        Endereço: Rua Quatá, 300
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.200"
                        mt={2}
                        fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
                      >
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
                  </HStack>
                </Box>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}