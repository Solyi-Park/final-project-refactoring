import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { getAdminPosts } from 'api/homeApi';
// import defaultIllustrationPNG from 'assets/home/AdminPostIllustration.png';
// import defaultIllustrationWEBP from 'assets/home/AdminPostIllustration.webp';
import Loader from 'components/Loader';
// import St from '../popularContents/carousel/style';
import HomeHeaderCenterBox from './homeHeaderCenterBox/HomeHeaderCenterBox';
import HomeHeaderSkeleton from './skeleton/HomeHeaderSkeleton';
import { QUERY_KEYS } from 'query/keys';

const HomeHeader = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: adminContents,
    isLoading,
    error
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.ADMIN, QUERY_KEYS.SELECTEDFOUR],
    queryFn: getAdminPosts,
    staleTime: 60_000
  });

  if (error) {
    console.log('byMango 게시물 가져오기 실패!', error);
  }

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <HomeHeaderSkeleton />
        ) : (
          <>
            <Swiper
              onSwiper={setSwiperInstance}
              onSlideChange={handleSlideChange}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false
              }}
              modules={[Autoplay]}
              className="custom-swiper"
            >
              {adminContents &&
                adminContents.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      {item ? (
                        <img
                          src={(item.coverImages[1] && item.coverImages[1].url) || '/home/AdminPostIllustration.png'}
                          alt={`Slide ${idx}`}
                        />
                      ) : (
                        <Loader />
                      )}
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            {adminContents && adminContents?.length > 0 && (
              <HomeHeaderCenterBox
                swiperInstance={swiperInstance}
                setCurrentIndex={setCurrentIndex}
                currentIndex={currentIndex}
                adminContents={adminContents}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HomeHeader;

const Container = styled.div`
  width: 100%;
  height: 450px;
  margin-bottom: 10px;
  position: relative;

  //모바일 세로
  @media screen and (max-width: 431px) {
    /* width: 100%; */
    width: 100vw;
  }
`;
