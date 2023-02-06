import { Box, Stack, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import '../styles/react-slick.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  accessibility: true
};

interface CarouselItem {
  img: any;
  header: string;
  text?: string;
}

interface AuthCarousel {
  carouselItems: CarouselItem[];
}

const AuthCarousel = ({ carouselItems }: AuthCarousel) => {
  return (
    <>
      <Slider {...settings} arrows={false}>
        {carouselItems.map((item, i) => (
          <Box key={i}>
            <Box mt={14} w='100%' display='flex' justifyContent='center'>
              {item.img}
            </Box>
            <Stack mt={14} textAlign='center'>
              <Text
                // textStyle={{ md: '26px' }}
                fontSize='28px'
                fontFamily='Poppins'
                sx={{ fontWeight: '700 !important' }}
              >
                {item.header}
              </Text>
              <Text textStyle='base'>{item.text}</Text>
            </Stack>
          </Box>
        ))}
      </Slider>
    </>
  );
};

export default AuthCarousel;

const CarouselItem = ({ img, header, text }: CarouselItem) => {
  return (
    <Box>
      <Box mt={14} w='100%' display='flex' justifyContent='center'>
        {img}
      </Box>
      <Stack mt={14} textAlign='center'>
        <Text
          textStyle={{ md: '3xl', lg: '4xl' }}
          fontFamily='Poppins'
          sx={{ fontWeight: '700 !important' }}
        >
          {header}
        </Text>
        <Text textStyle='base'>{text}</Text>
      </Stack>
    </Box>
  );
};
