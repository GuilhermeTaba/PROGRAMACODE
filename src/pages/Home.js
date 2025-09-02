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
  Avatar,
  HStack,
} from '@chakra-ui/react';
import { FaChartLine, FaBitcoin, FaCode } from 'react-icons/fa';
import { FaBullseye ,FaQuoteLeft} from 'react-icons/fa';

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
          
        </Box>
      </Container>
    </Box>
  );
}
function Detalhes() {
  const areas = [
    {
      icon: FaChartLine,
      title: 'Finance ',
      description:
        'Condução de researches de criptoativos modelados nos challenges tradicionais, permitindo aprendizado de avaliação de ativos, análise de mercado e gestão de portfólio',
      accent: 'black',
      iconBg: 'gray.100',
      iconColor: 'black',
      border: '1px solid #eee',
    },
    {
      icon: FaCode,
      title: 'Tech',
      description:
        'Desenvolvimento de soluções inovadoras e disruptivas utilizando as principais ferramentas da Web3, unindo tecnologia de ponta, descentralização e aplicabilidade prática para transformar o mercado financeiro',
      accent: 'black',
      iconBg: 'gray.900',
      iconColor: 'white',
      border: '1px solid #eee',
    },
  ];

  return (
    <Box py={20} bg="white" minH="75vh">
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

          <SimpleGrid 
            columns={{ base: 1, md: 2 }} // agora 2 colunas
            spacing={8} 
            w="full"
          >
            {areas.map((area, index) => (
              <Box
                key={index}
                bg="white"
                p={8}
                borderRadius="2xl"
                border={area.border}
                boxShadow="sm"
                display="flex"
                flexDirection="column"
                justifyContent="space-between" // garante que o conteúdo se espalhe
                alignItems="center"
                textAlign="center"
                minH="320px" // altura igual para todas
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
                >
                  {area.title}
                </Heading>
                <Text
                  color="gray.700"
                  fontSize={{ base: '12px', md: '14px', lg: '18px' }}
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
      /* aumentar bastante o espaçamento vertical */
      py={28}
      bgGradient="linear(to-br, black, red.900)" // gradiente preto → vermelho
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      textAlign="center"
    >
      <Container maxW="4xl" position="relative" zIndex={1}>
        {/* espaçamento maior entre heading e texto */}
        <VStack spacing={10}>
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="800"
            lineHeight="1.1"
            fontFamily="'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"
            letterSpacing="-0.02em"
          >
            Nossa missão
          </Heading>

          <Box
            p={10} /* padding interno maior */
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
              maxW="3xl"
              mx="auto"
              lineHeight="1.6"
              color="gray.300"
              fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
              fontWeight="100"
            >
              Conectar a inovação ao mercado tradicional, posicionando-se como líder dessa revolução
            </Text>
          </Box>
        </VStack>
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

            textAlign="center"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="800"
            lineHeight="1.1"
            fontFamily="'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"
            letterSpacing="-0.02em"
        
  
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
const TestimonialCard = ({ testimonial, name, role, avatar }) => {
  return (
    <Box
      bg="white"
      p={8}
      borderRadius="xl"
      shadow="xl"
      position="relative"
      border="1px"
      borderColor="gray.100"
      _hover={{
        transform: 'translateY(-5px)',
        shadow: '2xl',
        transition: 'all 0.3s ease',
      }}
      transition="all 0.3s ease"
    >
      {/* Quote Icon */}
      <Icon
        as={FaQuoteLeft}
        w={8}
        h={8}
        color="red.500"
        position="absolute"
        top={-4}
        left={8}
        bg="white"
        p={2}
        borderRadius="full"
        shadow="md"
      />
      
      {/* Testimonial Text */}
      <Text
              fontSize={{ base: '12px', md: '14px', lg: '18px' }}
              maxW="4xl"
              lineHeight="1.6"
              color="gray.700"
              fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
              fontWeight="100"
              
              mx="auto"
              
        mb={6}
        mt={4}
        textAlign="justify"
      >
        {testimonial}
      </Text>
      
      {/* Author Info */}
      <HStack spacing={4} align="center">
        <Avatar
          size="md"
          name={name}
          src={avatar}
          border="3px solid"
          borderColor="red.500"
        />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold" fontSize="lg" color="black">
            {name}
          </Text>
          <Text fontSize="sm" color="red.500" fontWeight="medium">
            {role}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Felipe Santos",
      role: "Co-fundador e Ex-membro",
      avatar: "/felipe.jpeg",
      testimonial: "Hoje acredito que a entidade se tornou algo muito mais próximo do que imaginávamos quando foi fundada, um organismo que funciona de maneira independente de qualquer membro específico. Além da possibilidade de aprender e debater com pessoas inteligentes sobre caminhos futuros para a sociedade por meio da tecnologia, os membros têm a oportunidade de aplicar essas ideias na prática nas áreas internas e também em projetos com as principais empresas do país como Ambev e BTG Pactual."
    },
    {
      name: "Bruno Arthur",
      role: "Co-fundador e Ex-membro",
      avatar: "/bruno.jpeg",
      testimonial: "Quando me chamaram e disseram que estavam fazendo uma entidade relacionada a isso eu vi uma oportunidade de disseminar o conhecimento nem que fosse dentro do próprio Insper. Foi então que me juntei ao time de fundadores da entidade. Com uma missão de difundir o conhecimento e fazer com que as pessoas gostem de aprender e tenham as melhores ferramentas à sua disposição. Por isso decido fazer vários projetos para que eu possa levar o conhecimento que fui adquirindo para os outros seja na forma de aulas, ou até mesmo mentoria de um projeto proposto."
    },
    {
      name: "João P. J. M. Perpétuo",
      role: "Co-fundador e Ex-membro",
      avatar: "/joao.jpeg",
      testimonial: "Fundar a B.I. foi um desafio ímpar. Estudar uma tecnologia tão latente e nova trouxe desafios extras, mas ao mesmo tempo diferenciais competitivos em nossos currículos, logo no início de nossas carreiras. Habilidades de aprendizado, gestão de equipe, resolução de conflitos, entendimento de viabilidade de projetos e tomada de decisão, eram desenvolvidas a cada dia. Hoje posso falar que a entidade teve papel fundamental em meu desenvolvimento profissional e na posição que ocupo hoje."
    }
  ];

  return (
    <Box bg="white" minH="100vh" py={20}>
      <Container maxW="7xl">
        <VStack spacing={16}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="800"
              lineHeight="1.1"
              fontFamily="'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"
              letterSpacing="-0.02em"
              mb={4}
             
              color="red.600"
            >
              Depoimentos de nossos membros
             
            </Heading>
            <Text
              fontSize={{ base: '12px', md: '14px', lg: '18px' }}
              maxW="4xl"
              lineHeight="1.6"
              color="gray.700"
              fontFamily="'Inter', 'Source Sans Pro', system-ui, sans-serif"
              fontWeight="100"
              
              textAlign="center"
              lineHeight="tall"
            >
              Conheça as experiências e histórias de quem fez parte da nossa jornada
            </Text>
          </VStack>

          {/* Testimonials Grid */}
          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={8}
            w="full"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial.testimonial}
                name={testimonial.name}
                role={testimonial.role}
                avatar={testimonial.avatar}
              />
            ))}
          </SimpleGrid>

          {/* Bottom Accent */}
          <Box
            w="100px"
            h="4px"
            bg="red.500"
            borderRadius="full"
            mx="auto"
          />
        </VStack>
      </Container>
    </Box>
  );
};


export default function Home() {
  return (
    <>
      <Hero />
      <QuemSomos/>
      <Detalhes />
      
      <Estatisticas />
      <Testimonials/>
    </>
  );
}