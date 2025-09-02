import { Box, Image, Link, VisuallyHidden } from '@chakra-ui/react';

export default function Card({ cardInfo }) {
  return (
    <Box as="article" textAlign="center">
      <Link href={cardInfo.link} isExternal _hover={{ opacity: 0.95 }}>
        <Box
          role="group"
          p={4}
          bg={'white'}
          borderRadius="8px"
          borderWidth="1px"
          borderColor="gray.100"
          boxShadow={'lg'}
          transition="transform 150ms ease, box-shadow 150ms ease"
          _hover={{ transform: 'translateY(-6px)', boxShadow: 'xl' }}
        >
          <VisuallyHidden>{cardInfo.name}</VisuallyHidden>
          <Image
            src={cardInfo.image}
            alt={cardInfo.name}
            maxH={{ base: '64px', md: '80px', lg: '110px' }}
            mx="auto"
            objectFit="contain"
          />
        </Box>
      </Link>
      <Box mt={2} fontSize="sm" color="#333">
        {cardInfo.name}
      </Box>
    </Box>
  );
}
