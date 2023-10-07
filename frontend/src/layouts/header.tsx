import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import { throttle } from '../utils';
import { useLocalStorage } from '../hooks';
import { NAV_LINKS, ROUTER_KEYS } from '../constants';

export const Header = () => {
  const [token, setLocalStorageUser] = useLocalStorage<string | null>('project-me-user', null);
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [huge, setHuge] = useState<boolean>(false);

  useEffect(() => {
    if (pathname === '/') {
      setHuge(true);
      const handleScroll = (event: Event) => {
        setHuge(!window.scrollY);
      };

      window.addEventListener('scroll', throttle(handleScroll, 100));

      return () => {
        window.removeEventListener('scroll', throttle(handleScroll, 100));
      };
    } else {
      setHuge(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box mt={0} pt={0} as="header" position="fixed" top={0} w="100%" zIndex={50}>
        <Flex
          minW={'none'}
          w={'full'}
          bg={'dark'}
          color={'white'}
          transition={'all .5s ease'}
          py={{ md: 2 }}
          px={{ sm: 10, md: 20 }}
          align={'center'}
          position={'relative'}
          justifyContent={'space-between'}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            backgroundColor={'black'}
            _hover={{
              color: 'white'
            }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {NAV_LINKS.map((link) => {
              if (link.label !== 'All Projects' && !token) return <div key={link.label}></div>;
              else
                return (
                  <Button
                    key={link.label}
                    variant={'ghost'}
                    as={Link}
                    href={
                      link.label === 'All Projects'
                        ? ROUTER_KEYS.PROJECT_ALL + '?page=0&perPage=10'
                        : ROUTER_KEYS.PROJECT_CREATE + '?page=0&perPage=10'
                    }
                    p={2}
                    fontSize={{ sm: 'sm', md: huge ? 'md' : 'sm' }}
                    transition={'all .5s ease'}
                    fontWeight={500}
                    color={'light'}
                    _active={{
                      bg: 'dark'
                    }}
                    _hover={{
                      textDecoration: 'none',
                      color: 'white'
                    }}
                  >
                    {link.label}
                  </Button>
                );
            })}
          </HStack>
          <Box
            textStyle={{
              sm: 'display2',
              md: huge ? 'display1' : 'body1Semi'
            }}
            transition={'all .5s ease'}
            alignItems={'center'}
          >
            <Text as="a" href={'/'}>
              Project Space
            </Text>
          </Box>
          <Box display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
            <User huge={huge} setLocalStorageUser={setLocalStorageUser} token={token} />
          </Box>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {NAV_LINKS.map((link) => {
                if (link.label !== 'All Projects' && !token) return '';
                else
                  return (
                    <>
                      <Stack
                        px={10}
                        direction={'row'}
                        backgroundColor={'black'}
                        py={2}
                        m={0}
                        w={'full'}
                        display={{ base: 'flex', md: 'none' }}
                        alignItems={'center'}
                        justify={'space-between'}
                      >
                        <Button
                          as={Link}
                          href={
                            link.label === 'All Projects'
                              ? ROUTER_KEYS.PROJECT_ALL + '?page=0&perPage=10'
                              : ROUTER_KEYS.PROJECT_CREATE
                          }
                          p={2}
                          backgroundColor={'black'}
                          fontSize={{ sm: 'sm', md: huge ? 'md' : 'sm' }}
                          transition={'all .5s ease'}
                          fontWeight={500}
                          color={'light'}
                          _active={{
                            bg: 'dark'
                          }}
                          _hover={{
                            textDecoration: 'none',
                            color: 'white'
                          }}
                        >
                          {link.label}
                        </Button>
                        <Box>
                          <User
                            huge={huge}
                            setLocalStorageUser={setLocalStorageUser}
                            token={token}
                          />
                        </Box>
                      </Stack>
                    </>
                  );
              })}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

type UserProps = {
  huge: boolean;
  token: string | null;
  setLocalStorageUser: any;
};

const User = ({ huge, token, setLocalStorageUser }: UserProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {token ? (
        <>
          <ModalLogOut
            isOpen={isOpen}
            onClose={onClose}
            setLocalStorageUser={setLocalStorageUser}
          />
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar
                src={'https://i.pravatar.cc/300'}
                bg={'attention.dark'}
                transition={'all .5s ease'}
                size={{ sm: 'sm', md: huge ? 'md' : 'sm' }}
              />
            </MenuButton>
            <MenuList
              borderColor={'attention.light'}
              bg={'black'}
              fontSize={{ sm: 'sm', md: huge ? 'lg' : 'md' }}
              lineHeight={2}
              color={'white'}
            >
              <MenuItem
                as={Link}
                href={ROUTER_KEYS.USER_PROJECTS + '?page=0&perPage=10'}
                _hover={{
                  textDecoration: 'none',
                  color: 'attention.light'
                }}
                fontWeight={400}
                bg={'black'}
              >
                My projects
              </MenuItem>
              <MenuItem
                as={Link}
                href={ROUTER_KEYS.USER_RESUME}
                _hover={{
                  textDecoration: 'none',
                  color: 'attention.light'
                }}
                fontWeight={400}
                bg={'black'}
              >
                My resume
              </MenuItem>
              <MenuDivider />
              <MenuItem
                _hover={{
                  textDecoration: 'none',
                  color: 'attention.light'
                }}
                bg={'black'}
                fontWeight={600}
                onClick={() => onOpen()}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Button
            h={{ sm: 9, md: 10 }}
            px={{ sm: 3, md: 4 }}
            as={'a'}
            transition={'all .5s ease'}
            fontSize={{ sm: 'sm', md: huge ? 'md' : 'sm' }}
            fontWeight={400}
            variant={'link'}
            href={ROUTER_KEYS.USER_LOGIN}
            color={'white'}
          >
            Sign In
          </Button>
          <Button
            h={{ sm: 9, md: 10 }}
            px={{ sm: 3, md: 4 }}
            transition={'all .5s ease'}
            display={'inline-flex'}
            fontSize={{ sm: 'sm', md: huge ? 'md' : 'sm' }}
            fontWeight={600}
            color={'white'}
            bg={'attention.dark'}
            as="a"
            href={ROUTER_KEYS.USER_REGISTER}
            _hover={{
              bg: 'attention.light'
            }}
          >
            Sign Up
          </Button>
        </>
      )}
    </>
  );
};

const ModalLogOut = ({ isOpen, onClose, setLocalStorageUser }: any) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent py={{ sm: 2, md: 4 }} bg={'black'} color={'white'}>
          <ModalHeader fontSize={{ sm: '1.5rem', md: '2rem' }}>Sure want to log out?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={{ sm: 'sm', md: 'md' }}>
              Some functionality will be limited after you log out.
            </Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup fontSize={{ sm: 'md', md: 'lg' }}>
              <Button
                color={'attention.light'}
                bg={'none'}
                _hover={{
                  color: 'orange',
                  bg: 'dark',
                  textDecoration: 'none'
                }}
                as={Link}
                href={ROUTER_KEYS.USER_LOGIN}
                onClick={() => setLocalStorageUser(undefined)}
              >
                Log out
              </Button>
              <Button
                _hover={{
                  bg: 'attention.light',
                  textDecoration: 'none'
                }}
                bg={'attention.dark'}
                onClick={onClose}
              >
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
