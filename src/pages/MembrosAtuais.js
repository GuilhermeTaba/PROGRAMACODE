import { useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
  CircularProgress,
  Center,
  chakra
} from '@chakra-ui/react';

import Card from '../components/members/Card'

const time = {
  ano: "2022.1",
  chain: "matic",
  address: "0x60063c63fb535c8ae98eff9730a3748e2a805458"
}

// Dados mockados para demonstração
const mockMembersData = {
  diretores: [
    {
      token_id: "1",
      metadata: {
        name: "João Silva",
        image: "https://via.placeholder.com/150",
        attributes: [{ value: "Presidente" }]
      }
    },
    {
      token_id: "2", 
      metadata: {
        name: "Maria Santos",
        image: "https://via.placeholder.com/150",
        attributes: [{ value: "Diretor de Tech" }]
      }
    }
  ],
  business: [
    {
      token_id: "3",
      metadata: {
        name: "Pedro Costa",
        image: "https://via.placeholder.com/150", 
        attributes: [{ value: "Analista de Business" }]
      }
    }
  ],
  finance: [
    {
      token_id: "4",
      metadata: {
        name: "Ana Oliveira",
        image: "https://via.placeholder.com/150",
        attributes: [{ value: "Analista de Finance" }]
      }
    }
  ],
  tech: [
    {
      token_id: "5",
      metadata: {
        name: "Carlos Lima",
        image: "https://via.placeholder.com/150",
        attributes: [{ value: "Analista de Tech" }]
      }
    }
  ]
};

export default function MembrosAtuais() {

  const [diretores, setDiretores] = useState([]);
  const [business, setBusiness] = useState([]);
  const [finance, setFinance] = useState([]);
  const [tech, setTech] = useState([]);

  useEffect(() => {
    // Simular carregamento de dados
    const fetchData = async () => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDiretores(mockMembersData.diretores);
      setBusiness(mockMembersData.business);
      setFinance(mockMembersData.finance);
      setTech(mockMembersData.tech);
    }
    fetchData()
  }, [])

  return (
    <>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 20 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Conheça nosso time{' '}
            <Text as={'span'} color={'orange.400'}>
              {time.ano}
            </Text>
          </Heading>
        </Stack>
      </Container>
      {diretores.length === 0 ?
        <Center><CircularProgress isIndeterminate color='orange.400' /> </Center>
        :
        <>
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            fontWeight={'bold'}>
            Presidente e Diretores
          </chakra.h1>
          <Wrap spacing="30px" justify="center">
            {diretores.map((card, index) => (
              <WrapItem key={index}>
                <Card cardInfo={card} />
              </WrapItem>
            ))}
          </Wrap>
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            fontWeight={'bold'}>
            Business
          </chakra.h1>
          <Wrap spacing="30px" justify="center">
            {business.map((card, index) => (
              <WrapItem key={index}>
                <Card cardInfo={card} />
              </WrapItem>
            ))}
          </Wrap>
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            fontWeight={'bold'}>
            Finance
          </chakra.h1>
          <Wrap spacing="30px" justify="center">
            {finance.map((card, index) => (
              <WrapItem key={index}>
                <Card cardInfo={card} />
              </WrapItem>
            ))}
          </Wrap>
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            fontWeight={'bold'}>
            Tech
          </chakra.h1>
          <Wrap spacing="30px" justify="center">
            {tech.map((card, index) => (
              <WrapItem key={index}>
                <Card cardInfo={card} />
              </WrapItem>
            ))}
          </Wrap>
        </>
      }
    </>
  );
}
