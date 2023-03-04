/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {
  Heading,
  Divider,
  Text,
  Button,
  Tooltip,
  Image,
  Stack,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { LANDING, ROUTER_KEYS } from '../constants';

const offers = [
  {
    id: 23452352345,
    img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    title: 'Offer title',
    description: 'Description for the specific offer',
  },
  {
    id: 23452352345,
    img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    title: 'Offer title',
    description: 'Description for the specific offer',
  },
  {
    id: 23452352345,
    img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    title: 'Offer title',
    description: 'Description for the specific offer',
  },
  {
    id: 23452352345,
    img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    title: 'Offer title',
    description: 'Description for the specific offer',
  },
  {
    id: 23452352345,
    img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    title: 'Offer title',
    description: 'Description for the specific offer',
  },
];

export const LandingPage = () => {
  const scrollToSection = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  return (
    <>
      <SliderComponent scrollToSection={scrollToSection} />
      <span ref={scrollToSection}></span>
    </>
  );
};

const SliderComponent = ({ scrollToSection }: any) => {
  return (
    <section style={{ position: 'relative' }}>
      <ScrollArrowHintComponent scrollToSection={scrollToSection} />
      <Swiper
        id='main-slider-container'
        loop={true}
        speed={3000}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {LANDING.map((item) => (
          <SwiperSlide id='main-slider-slide'>
            <div className='slider-popup-container' onClick={() => window.location.href = ROUTER_KEYS.USER_REGISTER}>
              <div className='slider-popup'>
                <Heading my={2}>{item.title}</Heading>
                <Divider style={{ margin: 5, padding: 0 }} />
                <div className='popup-decoration'>
                  <Heading my={4} size={'md'}>
                    INFO
                  </Heading>
                </div>
                <Divider />
                <Text my={4}>{item.description}</Text>
                <Button
                  h={{ sm: 9, md: 10 }}
                  px={{ sm: 3, md: 4 }}
                  transition={'all .5s ease'}
                  display={'inline-flex'}
                  fontSize={{ sm: 'sm', md: 'md' }}
                  fontWeight={600}
                  color={'white'}
                  bg={'attention.dark'}
                  as='a'
                  href={ROUTER_KEYS.USER_REGISTER}
                  _hover={{
                    bg: 'attention.light',
                  }}
                >
                  I WANT TO CREATE MY ACCOUNT
                </Button>
              </div>
            </div>
            <img alt='pizza' src={item.href} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const ScrollArrowHintComponent = ({ scrollToSection }: any) => {
  const scrollDown = () => {
    window.scrollTo({
      top: scrollToSection.current.offsetTop,
      behavior: 'smooth',
    });
  };
  return (
    <div id='section04' onClick={() => scrollDown()}>
      <a>
        <span></span>
      </a>
    </div>
  );
};
