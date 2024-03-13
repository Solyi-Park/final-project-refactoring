// import swipeLeftPNG from 'assets/icons/swipeLeft.png';
// import swipeLeftWEBP from 'assets/icons/swipeLeft.webp';
// import swipeRightPNG from 'assets/icons/swipeRight.png';
// import swipeRightWEBP from 'assets/icons/swipeRight.webp';
import useSwiperNavigation from 'hooks/useSwiperNavigation';
import { useState } from 'react';
import 'swiper/css';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import { FoundDetailPostProps } from 'types/PostType';

import { convertToKor } from 'pages/write/components/common/lists';
import St from './style';

function DetailHeader({ foundDetailPost }: FoundDetailPostProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  //24.02.18 추가
  const coverImages = foundDetailPost.coverImages ?? [];

  // swiper custom hook
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: coverImages.length - 1
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <St.CoverContainer>
      {coverImages.length > 0 ? (
        <>
          <St.StyledSwiper onSwiper={setSwiperInstance} onSlideChange={handleSlideChange} className="mySwiper">
            {coverImages.map((image, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={image.url} alt="cover" />
                  <St.Gradient></St.Gradient>
                  <St.PostHeaderInfo $noImage={false}>
                    <span>{convertToKor(foundDetailPost.category)}</span>
                    <h2>{foundDetailPost.title}</h2>
                  </St.PostHeaderInfo>
                </SwiperSlide>
              );
            })}
          </St.StyledSwiper>
          <St.NavigationButtonContainer>
            <div onClick={goPrev}>
              {currentIndex > 0 && (
                <picture>
                  <source srcSet="images/icons/swipeLeft.webp" type="image/webp" />
                  <img src="images/icons/swipeLeft.png" alt="previous" />
                </picture>
              )}
            </div>
            <div onClick={goNext}>
              {currentIndex < coverImages.length - 1 && (
                <picture>
                  <source srcSet="images/icons/swipeRight.webp" type="image/webp" />
                  <img src="images/icons/swipeRight.png" alt="next" />
                </picture>
              )}
            </div>
          </St.NavigationButtonContainer>
        </>
      ) : (
        <St.NoImage>
          <St.PostHeaderInfo $noImage={true}>{foundDetailPost.title}</St.PostHeaderInfo>
        </St.NoImage>
      )}
    </St.CoverContainer>
  );
}

export default DetailHeader;
