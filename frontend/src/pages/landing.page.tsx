/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import {
  Flex,
  Image,
  Text,
  Heading,
  Link,
  Box,
  Container,
  IconButton,
  Stack,
  Divider,
  Button
} from '@chakra-ui/react';
import { FaUser, FaComments } from 'react-icons/fa';

import { LANDING, ROUTER_KEYS, EMPLOYEES } from '../constants';

export const LandingPage = () => {
  const scrollToSection = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  return (
    <>
      <SliderComponent scrollToSection={scrollToSection} />
      {/* <span ref={scrollToSection}></span> */}
      {/* <AboutUs /> */}
    </>
  );
};

const SliderComponent = ({ scrollToSection }: any) => {
  return (
    <Container maxW={'none'} position={'relative'} m={0} p={0}>
      {/* <ScrollArrowHintComponent scrollToSection={scrollToSection} /> */}
      <Swiper
        id="main-slider-container"
        loop={true}
        speed={3000}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination]}
      >
        {LANDING.map((item) => (
          <SwiperSlide key={item.title} id="main-slider-slide">
            <div
              className="slider-popup-container"
              onClick={() => (window.location.href = ROUTER_KEYS.USER_REGISTER)}
            >
              <div className="slider-popup">
                <Heading my={2}>{item.title}</Heading>
                <Divider style={{ margin: 5, padding: 0 }} />
                <div className="popup-decoration">
                  <Heading my={4} size={'md'}>
                    INFO
                  </Heading>
                </div>
                <Divider />
                <Text textAlign={'center'} my={4}>
                  {item.description}
                </Text>
                <Button
                  h={{ sm: 9, md: 10 }}
                  px={{ sm: 3, md: 4 }}
                  transition={'all .5s ease'}
                  display={'inline-flex'}
                  fontSize={{ sm: 'sm', md: 'md' }}
                  fontWeight={600}
                  color={'white'}
                  bg={'attention.dark'}
                  as="a"
                  href={ROUTER_KEYS.USER_REGISTER}
                  _hover={{
                    bg: 'attention.light'
                  }}
                >
                  I WANT TO CREATE MY ACCOUNT
                </Button>
              </div>
            </div>
            <img alt="pizza" src={item.href} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

const ScrollArrowHintComponent = ({ scrollToSection }: any) => {
  const scrollDown = () => {
    window.scrollTo({
      top: scrollToSection.current.offsetTop - 50,
      behavior: 'smooth'
    });
  };
  return (
    <div id="section04" onClick={() => scrollDown()}>
      <a>
        <span></span>
      </a>
    </div>
  );
};

const AboutUs = () => {
  return (
    <Container maxW="4xl" mx="auto" my={8}>
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        About Us
      </Heading>
      <Text fontSize="lg" mb={4}>
        We are a modern team of developers who want to support others. Our website is a huge storage
        of different projects and people who are doing them. We have different types of projects and
        our main scope is of course development. User can create their own project or join other. It
        is an amazing opportunity to cooperate and solve problems together.
      </Text>
      <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={8}>
        {EMPLOYEES.map((employee) => (
          <Box
            key={employee.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mx={2}
            w={'15em'}
          >
            <Image src={employee.image} alt={employee.name} width="100%" />
            <Box p={4} my={4}>
              <Heading as="h3" size="md" mb={2}>
                {employee.name}
              </Heading>
              <Text mb={2}>{employee.role}</Text>
              <Stack direction="row" spacing={2} align="center" justify="flex-end">
                <IconButton
                  icon={<FaUser />}
                  aria-label="View Profile"
                  _hover={{
                    bg: 'attention.light'
                  }}
                  transition={'all .5s ease'}
                  fontSize={{ sm: 'sm', md: 'md' }}
                  fontWeight={600}
                  color={'white'}
                  bg={'attention.dark'}
                  size="sm"
                />
                <Link href="/contact">
                  <IconButton
                    as="a"
                    icon={<FaComments />}
                    aria-label="Send Message"
                    _hover={{
                      bg: 'attention.light'
                    }}
                    transition={'all .5s ease'}
                    fontSize={{ sm: 'sm', md: 'md' }}
                    fontWeight={600}
                    color={'white'}
                    bg={'attention.dark'}
                    size="sm"
                  />
                </Link>
              </Stack>
            </Box>
          </Box>
        ))}
      </Flex>
      <Text fontSize="lg">
        We are proud of the positive feedback we have received from our users:
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mx="auto" my={4} p={4}>
        <Text fontSize="lg" fontStyle="italic" mb={2}>
          "I have found some great projects to work on and met some amazing people through this
          website. Highly recommend it to anyone looking to collaborate on development projects." -
          John Doe
        </Text>
        <Text fontWeight="bold">- John Doe, Software Engineer</Text>
      </Box>
    </Container>
  );
};
