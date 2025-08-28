import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  Image,
  VStack,
} from '@chakra-ui/react';
import { FaBitcoin, FaChartLine, FaCode } from 'react-icons/fa';

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
    >
      <Container maxW="7xl" zIndex={1}>
        <Stack spacing={8} textAlign="center">
          <Heading
            fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
            fontWeight="bold"
            lineHeight="shorter"
          >
            Blockchain Insper
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            maxW="4xl"
            mx="auto"
            lineHeight="tall"
            color="gray.300"
          >
            Uma organização estudantil criada com o intuito de formar 
            lideranças para o mercado financeiro, por meio da elaboração de análises 
            que orientam a alocação estratégica em tecnologias blockchain
          </Text>
        </Stack>
      </Container>
      
      {/* Overlay para melhor legibilidade */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.400"
        zIndex={0}
      />
    </Box>
  );
}

// Seção Quem Somos
function QuemSomos() {
  return (
    <Box py={20} bg="white">
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20} alignItems="center">
          <VStack align="start" spacing={6}>
            <Heading
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              color="gray.900"
              fontWeight="bold"
            >
              Visão e Propósito
            </Heading>
            <Text fontSize="lg" color="gray.600" lineHeight="tall">
              A Blockchain Insper é uma entidade estudantil voltada para a formação de 
              profissionais de destaque e excelência no mercado financeiro.
            </Text>
            <Text fontSize="lg" color="gray.600" lineHeight="tall">
              Utilizando uma abordagem prática e teórica, promovendo capacitações, 
              palestras com profissionais do setor e projetos aplicados para aprofundar 
              o conhecimento técnico e desenvolver habilidades essenciais.
            </Text>
            <Text fontSize="lg" color="gray.600" lineHeight="tall">
              Com foco na excelência, a entidade prepara seus membros para enfrentar 
              desafios e oportunidades no mercado financeiro, destacando valores 
              como senso crítico e proatividade.
            </Text>
          </VStack>
          
          <Box>
            <Image
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Blockchain Technology"
              borderRadius="lg"
              shadow="xl"
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

// Seção Áreas de Atuação
function AreasAtuacao() {
  const areas = [
    {
      icon: FaChartLine,
      title: 'Business',
      description: 'Análise de mercado, estratégias de negócio e desenvolvimento de parcerias estratégicas no ecossistema blockchain.',
    },
    {
      icon: FaBitcoin,
      title: 'Finanças',
      description: 'Gestão de portfólio, análise de investimentos e desenvolvimento de soluções financeiras inovadoras.',
    },
    {
      icon: FaCode,
      title: 'Tecnologia',
      description: 'Desenvolvimento de aplicações blockchain, smart contracts e soluções técnicas para o mercado financeiro.',
    },
  ];

  return (
    <Box py={20} bg="gray.50">
      <Container maxW="7xl">
        <VStack spacing={12}>
          <Stack textAlign="center" spacing={4}>
            <Heading
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              color="gray.900"
              fontWeight="bold"
            >
              Áreas de Atuação
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Nossas três frentes de trabalho que integram conhecimento teórico 
              e aplicação prática no mercado financeiro
            </Text>
          </Stack>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {areas.map((area, index) => (
              <Box
                key={index}
                bg="white"
                p={8}
                borderRadius="xl"
                shadow="lg"
                _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
                transition="all 0.3s"
              >
                <VStack spacing={6} align="center" textAlign="center">
                  <Icon
                    as={area.icon}
                    w={12}
                    h={12}
                    color="brand.500"
                  />
                  <Heading size="lg" color="gray.900">
                    {area.title}
                  </Heading>
                  <Text color="gray.600" lineHeight="tall">
                    {area.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

// Seção de Estatísticas (inspirada no Insper Asset)
function Estatisticas() {
  const stats = [
    { label: 'Membros', value: '+35' },
    { label: 'Projetos', value: '+50' },
    { label: 'Parceiros', value: '+20' },
    { label: 'Eventos', value: '+100' },
  ];

  return (
    <Box py={20} bg="gray.900" color="white">
      <Container maxW="7xl">
        <VStack spacing={12}>
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            textAlign="center"
            fontWeight="bold"
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
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="gray.300"
                  fontWeight="medium"
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
      <QuemSomos />
      <AreasAtuacao />
      <Estatisticas />
      <Parceiros />
    </>
  );
}