import { Box, Heading, Text, SimpleGrid, Container, VStack } from "@chakra-ui/react";
import { BRAND_RED, BRAND_RED_GRADIENT } from "../components/home/Hero";
import Card from "../components/parcerias/Card";

import Insper from "../assets/parceiros/insper.png";
import BeeTech from "../assets/parceiros/beetech.jpeg";
import BlockchainBerkeley from "../assets/parceiros/blockchainberkeley.png";
import BlockMaster from "../assets/parceiros/blockmaster.jpg";
import ICOLab from "../assets/parceiros/icolab.png";
import MarVentures from "../assets/parceiros/marventures.png";
import MercadoBTC from "../assets/parceiros/mercadobtc.jpg";
import PortaldoBTC from "../assets/parceiros/portaldobtc.webp";
import GCB from "../assets/parceiros/gcb.jfif";
import PeerBR from "../assets/parceiros/peer.png";
import Coins from "../assets/parceiros/coins.jfif";
import Ambev from "../assets/parceiros/ambev.jfif";
import Itau from "../assets/parceiros/itau.webp";
import Ulrich from "../assets/parceiros/ulrich.jpg";
import Dotz from "../assets/parceiros/dotz.png";

const cards = [
  {
    name: "Insper",
    image: Insper,
    link: "https://www.insper.edu.br/",
  },
  {
    name: "Mercado Bitcoin",
    image: MercadoBTC,
    link: "https://www.mercadobitcoin.com.br/",
  },
  {
    name: "Ambev",
    image: Ambev,
    link: "https://www.ambev.com.br/",
  },
  {
    name: "Itaú",
    image: Itau,
    link: "https://www.itau.com.br/",
  },
  {
    name: "Dotz",
    image: Dotz,
    link: "https://www.dotz.com.br/",
  },
  {
    name: "GCB Investimentos",
    image: GCB,
    link: "https://gcbinvestimentos.com/",
  },
  {
    name: "Peer BR",
    image: PeerBR,
    link: "https://peerbr.com/",
  },
  {
    name: "Coins",
    image: Coins,
    link: "https://coins.com.br/",
  },
  {
    name: "Fernando Ulrich",
    image: Ulrich,
    link: "https://www.linkedin.com/in/fernando-ulrich-aa805821/",
  },
  {
    name: "Blockchain Berkeley",
    image: BlockchainBerkeley,
    link: "https://blockchain.berkeley.edu/",
  },
  {
    name: "BeeTech",
    image: BeeTech,
    link: "https://beetech.global/",
  },
  {
    name: "Block Master",
    image: BlockMaster,
    link: "https://www.blockmaster.com.br/",
  },
  {
    name: "iCoLab",
    image: ICOLab,
    link: "https://icolab.org.br/",
  },
  {
    name: "Mar Ventures",
    image: MarVentures,
    link: "https://www.mar.ventures/",
  },
  {
    name: "Portal do Bitcoin",
    image: PortaldoBTC,
    link: "https://portaldobitcoin.uol.com.br/",
  },
];

export default function Parcerias() {
  return (
    <Box as="main">
      {/* Hero / Intro - fundo mais escuro e sem formas geométricas */}
      <Box
        as="section"
        color="white"
        py={{ base: 12, md: 20 }}
        sx={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,2,2,0.98), rgba(40,8,8,0.95))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxW="6xl" px={{ base: 6, lg: 8 }}>
          <VStack spacing={6} textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="700"
              letterSpacing="tight"
              bgGradient="linear(to-r, #ff2a2a, #a80000)"
              bgClip="text"
              display="inline-block"
              fontFamily={"'Inter', 'Poppins', 'Roboto', system-ui, sans-serif"}
            >
              Parceiros
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="600"
              lineHeight="1.5"
              fontFamily={"'Inter', 'Source Sans Pro', system-ui, sans-serif"}
              color="white"
            >
              A Blockchain Insper reúne instituições, empresas e pessoas que
              contribuem para o ecossistema — uma rede de apoiadores do mercado
              tradicional e das iniciativas disruptivas. Esta página é apenas
              informativa e não contém formulários ou solicitações de dados.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Partners grid */}
      <Container maxW="6xl" py={{ base: 8, md: 14 }}>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={8}>
          {cards.map((card) => (
            <Card key={card.name} cardInfo={card} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
