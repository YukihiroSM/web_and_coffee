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
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import { throttle } from '../utils';
import { LocalStorageUser } from '../types';
import { useLocalStorage } from '../hooks';
import { NAV_LINKS, ROUTER_KEYS } from '../constants';

export const Header = () => {
  const [{ id }, setLocalStorageUser] = useLocalStorage<LocalStorageUser>(
    'project-me-user',
    {
      id: undefined,
      token: undefined,
    }
  );
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [huge, setHuge] = useState<boolean>(true);

  useEffect(() => {
    if (pathname === '/') {
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
      <Box
        mt={0}
        pt={0}
        as='header'
        position='fixed'
        top={0}
        w='100%'
        zIndex={50}
      >
        <Flex
          minW={'none'}
          w={'full'}
          bg={'dark'}
          color={'white'}
          transition={'all .5s ease'}
          py={{ md: 2 }}
          px={{ md: 4 }}
          borderBottom={1}
          align={'center'}
          borderStyle={'solid'}
          borderColor={'gray.200'}
          position={'relative'}
          justifyContent={'space-between'}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {NAV_LINKS.map((link) => (
              <Button
                variant={'ghost'}
                as={Link}
                href={
                  link.label === 'All Projects'
                    ? ROUTER_KEYS.PROJECTS + '?page=0&perPage=10'
                    : `/user/${id}/project/create`
                }
                p={2}
                fontSize={{ sm: 'sm', md: huge ? 'md' : 'sm' }}
                transition={'all .5s ease'}
                fontWeight={500}
                color={'light'}
                _active={{
                  bg: 'dark',
                }}
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                {link.label}
              </Button>
            ))}
          </HStack>
          <Box
            textStyle={{
              sm: 'display2',
              md: huge ? 'display1' : 'body1Semi',
            }}
            transition={'all .5s ease'}
            alignItems={'center'}
          >
            <Text as='a' href={'/'}>
              ProjectMe
            </Text>
          </Box>
          <Box alignItems={'center'}>
            <User
              huge={huge}
              setLocalStorageUser={setLocalStorageUser}
              id={id}
            />
          </Box>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {NAV_LINKS.map((link) => (
                <Button
                  variant={'ghost'}
                  as={Link}
                  href={
                    link.label === 'All Projects'
                      ? ROUTER_KEYS.PROJECTS + '?page=0&perPage=10'
                      : `/user/${id}/project/create`
                  }
                  p={2}
                  fontSize={{ sm: 'sm', md: huge ? 'md' : 'sm' }}
                  transition={'all .5s ease'}
                  fontWeight={500}
                  color={'light'}
                  _active={{
                    bg: 'dark',
                  }}
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

type UserProps = {
  huge: boolean;
  id: string | undefined;
  setLocalStorageUser: any;
};

const User = ({ huge, id, setLocalStorageUser }: UserProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {id ? (
        <>
          <ModalLogOut
            isOpen={isOpen}
            onClose={onClose}
            setLocalStorageUser={setLocalStorageUser}
          />
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
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
                href={`/user/${id}/projects?page=0&perPage=10`}
                _hover={{
                  textDecoration: 'none',
                  color: 'attention.light',
                }}
                fontWeight={400}
                bg={'black'}
              >
                My projects
              </MenuItem>
              <MenuItem
                as={Link}
                href={`/user/${id}/resumee`}
                _hover={{
                  textDecoration: 'none',
                  color: 'attention.light',
                }}
                fontWeight={400}
                bg={'black'}
              >
                My resumee
              </MenuItem>
              <MenuDivider />
              <MenuItem
                _hover={{
                  textDecoration: 'none',
                  color: 'attention.light',
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
            href={'/user/login'}
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
            as='a'
            href={'/user/register'}
            _hover={{
              bg: 'attention.light',
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
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent py={{ sm: 2, md: 4 }} bg={'black'} color={'white'}>
          <ModalHeader fontSize={{ sm: '1.5rem', md: '2rem' }}>
            Sure want to log out?
          </ModalHeader>
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
                  textDecoration: 'none',
                }}
                as={Link}
                href={`/`}
                onClick={() =>
                  setLocalStorageUser({ id: undefined, token: undefined })
                }
              >
                Log out
              </Button>
              <Button
                _hover={{
                  bg: 'attention.light',
                  textDecoration: 'none',
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
