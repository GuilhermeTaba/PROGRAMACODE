import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import Joao from '/joao.jpeg'
import Felipe from '/felipe.jpeg'
import Bruno from '/bruno.jpeg'


const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Depoimentos de nossos membros</Heading>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              {/* <TestimonialHeading>Efficient Collaborating</TestimonialHeading> */}
              <TestimonialText>
                Hoje acredito que a entidade se tornou algo muito mais próximo do que imaginávamos quando
                foi fundada, um organismo que funciona de maneira independente de qualquer membro
                específico. Além da possibilidade de aprender e debater com pessoas inteligentes sobre
                caminhos futuros para a sociedade por meio da tecnologia, os membros tem a oportunidade
                de aplicar essas ideias na prática nas áreas internas e também em projetos com as
                principais empresas do país como Ambev e BTG Pactual.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={Felipe}
              name={'Felipe Santos'}
              title={'Co-fundador e Ex-membro'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              {/* <TestimonialHeading>Intuitive Design</TestimonialHeading> */}
              <TestimonialText>
                Quando me chamaram e disseram que estavam fazendo uma entidade relacionada a isso eu vi
                uma oportunidade de disseminar o conhecimento nem que fosse dentro do próprio insper
                Foi então que me juntei ao time de fundadores da entidade. Com uma missão de difundir o
                conhecimento e fazer com que as pessoas gostem de aprender e tenham as melhores
                ferramentas a sua disposição. Por isso decido fazer vários projetos para que eu possa
                levar o conhecimento que fui adquirindo para os outros seja na forma de aulas, ou até
                mesmo mentira do um projeto proposto.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={Bruno}
              name={'Bruno Arthur'}
              title={'Co-fundador e Ex-membro'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              {/* <TestimonialHeading>Mindblowing Service</TestimonialHeading> */}
              <TestimonialText>
                Fundar a B.I. foi um desafio ímpar. Estudar uma tecnologia tão latente e nova trouxe
                desafios extras, mas ao mesmo tempo diferenciais competitivos em nossos currículos, logo
                no início de nossas carreiras. Habilidades de aprendizado, gestão de equipe, resolução
                de conflitos, entendimento de viabilidade de projetos e tomada de decisão, eram
                desenvolvidas a cada dia. Hoje posso falar que a entidade teve papel fundamental em meu
                desenvolvimento profissional e na posição que ocupo hoje.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={Joao}
              name={'João P. J. M. Perpetuo'}
              title={'Co-fundador e Ex-membro'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}