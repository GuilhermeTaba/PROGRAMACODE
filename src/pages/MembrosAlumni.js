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

const times = [
  {
    ano: "2021.2",
    chain: "polygon",
    address: "0x7efFf2fb972EB77f61922af70820053566F483C5"
  },
]


export default function MembrosAlumni() {

  const [presidentes, setPresidentes] = useState([]);
  const [diretores, setDiretores] = useState([]);
  const [business, setBusiness] = useState([]);
  const [finance, setFinance] = useState([]);
  const [tech, setTech] = useState([]);

  // Dados mockados para alumni
  const mockAlumniData = {
    presidentes: [
      {
        token_id: "10",
        metadata: {
          name: "Ex-Presidente Alumni",
          image: "https://via.placeholder.com/150",
          attributes: [{ value: "Presidente" }]
        }
      }
    ],
    diretores: [
      {
        token_id: "11",
        metadata: {
          name: "Ex-Diretor Alumni",
          image: "https://via.placeholder.com/150", 
          attributes: [{ value: "Diretor de Business" }]
        }
      }
    ],
    business: [],
    finance: [],
    tech: []
  };

  useEffect(() => {
    const fetchData = async () => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPresidentes(mockAlumniData.presidentes);
      setDiretores(mockAlumniData.diretores);
      setBusiness(mockAlumniData.business);
      setFinance(mockAlumniData.finance);
      setTech(mockAlumniData.tech);
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
            Conheça nossos membros{' '}
            <Text as={'span'} color={'orange.400'}>
              Alumni
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
            Ex-Presidentes
          </chakra.h1>
          <Wrap spacing="30px" justify="center">
            {presidentes.map((card, index) => (
              <WrapItem key={index}>
                <Card cardInfo={card} />
              </WrapItem>
            ))}
          </Wrap>
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            fontWeight={'bold'}>
            Ex-Diretores
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
            Ex-Membros de Business
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
            Ex-Membros de Finance
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
            Ex-Membros de Tech
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
