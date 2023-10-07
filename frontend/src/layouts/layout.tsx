import React from 'react';

import {
  Container,
  Box,
  chakra,
  Stack,
  Text,
  VisuallyHidden,
  Link as ChakraLink,
  Image,
  Grid,
  GridItem
} from '@chakra-ui/react';

import { ReactNode } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { TEAM } from '../constants';
import { Header } from './header';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <Stack
      justify={'space-between'}
      direction={'column'}
      minHeight={'100vh'}
      minW={'none'}
      pt={'3.8em'}
      m={0}
      spacing={0}
    >
      <Header />
      <Container
        as="main"
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        bg={'white'}
        m={0}
        p={0}
        maxWidth={'100vw'}
        height={'full'}
        minW={'none'}
      >
        {children}
      </Container>
      {/* <Footer /> */}
    </Stack>
  );
};

const SocialButton = ({
  children,
  label,
  href
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={'blackAlpha.100'}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={ChakraLink}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'all .5s ease'}
      _hover={{
        bg: 'blackAlpha.200'
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <>
      <Box minHeight={'none'} as={'footer'} bg={'gray.50'} color={'gray.700'}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <Grid gap={5} templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}>
            <GridItem>
              <Stack spacing={{ sm: 4, md: 5 }}>
                <Stack
                  align={'center'}
                  direction={'row'}
                  textStyle={{ sm: 'body2Semi', md: 'body1Semi' }}
                >
                  <Text>Project Space</Text>
                  <SocialButton
                    label={'GitHub'}
                    href={'https://github.com/YukihiroSM/web_and_coffee'}
                  >
                    <FaGithub size={'full'} />
                  </SocialButton>
                </Stack>
                <Text fontSize={{ sm: 'xs', md: 'sm' }}>
                  © 2023 Code & Coffee Team. All rights reserved
                </Text>
                <Stack display={{ sm: 'block', md: 'none' }} align={'flex-start'}>
                  <Text fontSize={{ sm: 'sm', md: 'md' }}>Fu*k russia</Text>
                  <Image
                    src="https://media.giphy.com/media/0SPa3c91z2l1giDIMH/giphy.gif"
                    alt="Ukraine"
                  />
                </Stack>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack align={'flex-start'} rowGap={2}>
                <Text fontSize={{ sm: 'sm', md: 'md' }}>Our Team</Text>
                {TEAM.map((member: any) => (
                  <Stack
                    fontSize={{ sm: 'xs', md: 'sm' }}
                    key={`${member.name}-${Date.now()}`}
                    align={'center'}
                    direction={'row'}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={'gray.200'}
                    paddingBottom={1}
                    w={'full'}
                    justify={'space-between'}
                  >
                    <Text>{member.name}</Text>
                    <Stack direction={'row'} spacing={{ sm: 2, md: 4 }}>
                      <SocialButton label={'LinkedIn'} href={member.linkedIn}>
                        <FaLinkedin />
                      </SocialButton>
                      <SocialButton label={'GitHub'} href={member.gitHub}>
                        <FaGithub />
                      </SocialButton>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </GridItem>
            <GridItem display={{ sm: 'none', md: 'block' }}>
              <Stack align={'flex-start'}>
                <ListHeader>Fu*k russia</ListHeader>
                <Image
                  src="https://media.giphy.com/media/0SPa3c91z2l1giDIMH/giphy.gif"
                  alt="Ukraine"
                />
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Layout;
