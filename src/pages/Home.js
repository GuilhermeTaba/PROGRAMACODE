import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  VStack,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaChartLine, FaBitcoin, FaCode } from 'react-icons/fa';
import { FaBullseye } from 'react-icons/fa';

// Componente Hero inspirado no Insper Asset
function Hero() {
  return (
    <Box
      position="relative"
      minH="100vh"
      bgGradient="linear(to-br, gray.900, gray.800)"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Image
        src="/insper-biblioteca.jpg"
        alt="Insper Biblioteca"
        objectFit="cover"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
        opacity={0.3}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.400"
        zIndex={1}
      />
      <Container
        maxW="7xl"
        zIndex={2}
        position="relative"
        h="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          textAlign="left"
          maxW={{ base: "90%", md: "60%", lg: "50%" }}
          alignSelf="flex-start"
          mt={{ base: 0, md: 0 }}
          ml={{ base: 8, md: 16 }}
        >
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="800"
            lineHeight="1.1"
            fontFamily="'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"
            letterSpacing="-0.02em"
            textAlign="left"
            mt="-79"
          >
            Primeira Organização Estudantil de Blockchain da América Latina
          </Heading>
        </Box>

        <Box
          textAlign="left"
          maxW={{ base: "90%", md: "60%", lg: "50%" }}
          alignSelf="flex-start"
          mt={10}
          ml={{ base: 8, md: 16 }}
        >
          <Text
            fontSize={{ base: '12px', md: '14px', lg: '18px' }}
            maxW="4xl"
            lineHeight="1.6"
            color="gray.300"
            fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
            fontWeight="100"
            textAlign="left"
          >
            Uma organização estudantil criada com o intuito de formar
            lideranças para o mercado financeiro, por meio da elaboração de análises
            que orientam a alocação estratégica em tecnologias blockchain.
          </Text>
        </Box>

        <Box
          textAlign="left"
          maxW={{ base: "90%", md: "60%", lg: "50%" }}
          alignSelf="flex-start"
          mt={8}
          ml={{ base: 8, md: 16 }}
        >
          <Button
            size="lg"
            bg="#5865F2"
            color="white"
            _hover={{ 
              bg: "#4752C4",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(88, 101, 242, 0.4)"
            }}
            _active={{ 
              bg: "#3C45A5",
              transform: "translateY(0)"
            }}
            leftIcon={
              <Icon viewBox="0 0 24 24" boxSize={5}>
                <path
                  fill="currentColor"
                  d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.010c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.188.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
               
               />
              </Icon>
            }
            px={8}
            py={6}
            borderRadius="lg"
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight="600"
            transition="all 0.3s ease"
            boxShadow="0 4px 15px rgba(88, 101, 242, 0.3)"
          >
            Entre em nossa comunidade
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
function Detalhes() {
  const areas = [
    {
      icon: FaBullseye,
      title: 'Nossa Missão',
      description:
        'Fomentar o desenvolvimento do ecossistema brasileiro em torno da tecnologia blockchain, criando um futuro mais eficiente através da tecnologia',
      accent: 'red.600',
      iconBg: 'red.50',
      iconColor: 'red.600',
      border: '1px solid #eee',
    },
    {
      icon: FaChartLine,
      title: 'Nossa Visão',
      description:
        'Capacitar os alunos com o melhor conteúdo e conectá-los ao mercado, no intuito de incluir nosso país nesse cenário de inovação',
      accent: 'black',
      iconBg: 'gray.100',
      iconColor: 'black',
      border: '1px solid #eee',
    },
    {
      icon: FaCode,
      title: 'Nossos Valores',
      description:
        'Alto comprometimento, proatividade, inovação, trabalho em equipe, multidisciplinaridade, excelência e eficiência',
      accent: 'black',
      iconBg: 'gray.900',
      iconColor: 'white',
      border: '1px solid #eee',
    },
  ];

  return (
    <Box py={20} bg="white" minH = "75vH">
      <Container maxW="7xl">
        <VStack spacing={10}>
          <Stack textAlign="center" spacing={2}>
            <Heading
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="800"
              lineHeight="1.1"
              fontFamily="'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"
              letterSpacing="-0.02em"
              mb={4}
             
              color="red.600"
              
            >
              O que nos move
            </Heading>
            <Text
              fontSize={{ base: '12px', md: '14px', lg: '18px' }}
              maxW="4xl"
              lineHeight="1.6"
              color="gray.700"
              fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
              fontWeight="100"
              
              mx="auto"
              
            >
              Conheça nossos pilares fundamentais para transformar o mercado financeiro com blockchain.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {areas.map((area, index) => (
              <Box
                key={index}
                bg="white"
                p={8}
                borderRadius="2xl"
                border={area.border}
                boxShadow="sm"
                minH="300px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                transition="all 0.2s"
                _hover={{
                  boxShadow: 'lg',
                  transform: 'translateY(-4px) scale(1.03)',
                }}
              >
                <Box
                  bg={area.iconBg}
                  borderRadius="full"
                  p={4}
                  mb={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={area.icon} w={10} h={10} color={area.iconColor} />
                </Box>
                <Heading
                  size="md"
                  color={area.accent}
                  fontWeight="bold"
                  letterSpacing="-0.01em"
                  mb={2}
                  textAlign="center"
                >
                  {area.title}
                </Heading>
                <Text
                  color={index === 2 ? 'gray.800' : 'gray.700'}
                  fontSize={{ base: '12px', md: '14px', lg: '18px' }}
                  maxW="4xl"
                  lineHeight="1.6"
                  
                  fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
                  fontWeight="100"
                >
                  {area.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
// Seção Quem Somos
function QuemSomos() {
  return (
    <Box 
      position="relative"
      minH="100vh"
      bgGradient="linear(to-br, gray.900, gray.800)"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(35,35,38,0.85)"
        zIndex={0}
      />
      <Image
        src="/insper-aquario.jpg"
        alt="Insper Biblioteca"
        objectFit="cover"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
        opacity={0.3}
        filter="brightness(0.25)" 
      />
      <Container maxW="7xl" position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center">
          <Box>
            <Heading

              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="800"
              lineHeight="1.1"
              fontFamily="'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"
              letterSpacing="-0.02em"
              mb={4}
              color="white"

              ml={{ base: 0, lg: 16 }}
            >
              Visão e Propósito
            </Heading>
          </Box>
          
          <VStack align="start" spacing={6}>
            <Box
              p={6}
              bg="rgba(255,255,255,0.04)"
              borderRadius="xl"
              borderLeft="4px solid"
              borderColor="red.500"
              transition="all 0.3s"
              _hover={{
                bg: "rgba(255,255,255,0.08)",
                borderColor: "red.400"
              }}
            >
              <Text            
              
            fontSize={{ base: '12px', md: '14px', lg: '18px' }}
            maxW="4xl"
            lineHeight="1.6"
            color="gray.300"
            fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
            fontWeight="100">
                A Blockchain Insper é uma entidade estudantil voltada para a formação de 
                profissionais de destaque e excelência no mercado financeiro.
              </Text>
            </Box>
            
            <Box
              p={6}
              bg="rgba(255,255,255,0.04)"
              borderRadius="xl"
              borderLeft="4px solid"
              borderColor="red.500"
              transition="all 0.3s"
              _hover={{
                bg: "rgba(255,255,255,0.08)",
                borderColor: "red.400"
              }}
            >
              <Text             
            fontSize={{ base: '12px', md: '14px', lg: '18px' }}
            maxW="4xl"
            lineHeight="1.6"
            color="gray.300"
            fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
            fontWeight="100">
                Utilizando uma abordagem prática e teórica, promovendo capacitações, 
                palestras com profissionais do setor e projetos aplicados para aprofundar 
                o conhecimento técnico e desenvolver habilidades essenciais.
              </Text>
            </Box>
            
            <Box
              p={6}
              bg="rgba(255,255,255,0.04)"
              borderRadius="xl"
              borderLeft="4px solid"
              borderColor="red.500"
              transition="all 0.3s"
              _hover={{
                bg: "rgba(255,255,255,0.08)",
                borderColor: "red.400"
              }}
            >
              <Text             
            fontSize={{ base: '12px', md: '14px', lg: '18px' }}
            maxW="4xl"
            lineHeight="1.6"
            color="gray.300"
            fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
            fontWeight="100">
                Com foco na excelência, a entidade prepara seus membros para enfrentar 
                desafios e oportunidades no mercado financeiro, destacando valores 
                como senso crítico e proatividade.
              </Text>
            </Box>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

// Seção Áreas de Atuação


// Seção de Estatísticas (inspirada no Insper Asset)
function Estatisticas() {
  const stats = [
    { label: 'Membros', value: '+35' },
    { label: 'Projetos', value: '+50' },
    { label: 'Parceiros', value: '+20' },
    { label: 'Eventos', value: '+100' },
  ];
   
  return (
    <Box  
      position="relative"
      minH="75vh"
      bgGradient="linear(to-br, gray.900, gray.800)"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      py={20}
    >
  <Image
        src="/insper-aquario.jpg"
        alt="Insper Biblioteca"
        objectFit="cover"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
        opacity={0.3}
        filter="brightness(0.25)" 
      />

      <Container maxW="7xl">
        <VStack spacing={12}>
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            textAlign="center"
            fontWeight="bold"
            color='white'
          >
            Impacto e Resultados
          </Heading>
          
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10} w="full">
            {stats.map((stat, index) => (
              <VStack key={index} spacing={2} textAlign="center">
                <Text
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight="bold"
                  color="brand.500"
                >
                  {stat.value}
                </Text>
                <Text
  
                  
            fontSize={{ base: '12px', md: '14px', lg: '18px' }}
            maxW="4xl"
            lineHeight="1.6"
            color="gray.300"
            fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
            fontWeight="100"
                >
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
   
  );
}

// Seção de Parceiros
function Parceiros() {
  const parceiros = [
    'Nova Futura',
    'Aster Capital', 
    'Mission CO',
    'Safra',
    'Alaska',
    'Verde Asset',
    'XP Inc.',
    'Bradesco',
    'BTG Pactual',
    'Vinci Partners'
  ];

  return (
    <Box py={20} bg="white">
      <Container maxW="7xl">
        <VStack spacing={12}>
          <Stack textAlign="center" spacing={4}>
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              color="gray.900"
              fontWeight="bold"
            >
              Trabalhando com as Melhores Equipes do Brasil
            </Heading>
          </Stack>
          
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={8} w="full">
            {parceiros.map((parceiro, index) => (
              <Box
                key={index}
                p={6}
                borderRadius="lg"
                bg="gray.50"
                textAlign="center"
                _hover={{ bg: 'gray.100' }}
                transition="background 0.2s"
              >
                <Text fontWeight="semibold" color="gray.700">
                  {parceiro}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Detalhes />

      <Estatisticas />
      
    </>
  );
}