import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import useSwiperNavigation from 'hooks/useSwiperNavigation';

import { GoChevronLeft } from '@react-icons/all-files/go/GoChevronLeft';
import { GoChevronRight } from '@react-icons/all-files/go/GoChevronRight';
import pageOne from 'assets/guide/1.png';
import pageTwo from 'assets/guide/2.png';
import pageThree from 'assets/guide/3.png';
import pageFour from 'assets/guide/4.png';
import pageFive from 'assets/guide/5.png';
import pageSix from 'assets/guide/6.png';
import St from './style';

type ModalProps = {
  onClose: () => void;
};

function GuideModal({ onClose }: ModalProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 커스텀 Swiper handler
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: 6
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <St.ModalBackdrop onClick={onClose}>
      <St.ModalContent onClick={(e) => e.stopPropagation()}>
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true
          }}
        >
          <SwiperSlide>
            <picture>
              <source srcSet="guide/1.webp" type="image/webp" />
              <St.GuideImage src="/guide/1.png" alt="guide-one" />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source srcSet="guide/2.webp" type="image/webp" />
              <img src="/guide/2.png" alt="guide-two" />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source srcSet="guide/3.webp" type="image/webp" />
              <img src="/guide/3.png" alt="guide-three" />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source srcSet="guide/4.webp" type="image/webp" />
              <img src="/guide/4.png" alt="guide-four" />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source srcSet="guide/5.webp" type="image/webp" />
              <img src="guide/5.png" alt="guide-five" />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source srcSet="guide/6.webp" type="image/webp" />
              <img src="guide/6.png" alt="guide-six" />
            </picture>
          </SwiperSlide>
          <St.NavigationButtonContainer>
            <St.NavButton onClick={goPrev}>
              {currentIndex > 0 && (
                <span>
                  <GoChevronLeft />
                </span>
              )}
            </St.NavButton>
            <St.NavButton onClick={goNext}>
              {currentIndex < 5 && (
                <span>
                  <GoChevronRight />
                </span>
              )}
            </St.NavButton>
          </St.NavigationButtonContainer>
          <St.PageCount>{`${currentIndex + 1} / 6`}</St.PageCount>
        </Swiper>
      </St.ModalContent>
    </St.ModalBackdrop>
  );
}

export default GuideModal;

// import { useState } from 'react';
// import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
// import useSwiperNavigation from 'hooks/useSwiperNavigation';

// import { GoChevronLeft } from '@react-icons/all-files/go/GoChevronLeft';
// import { GoChevronRight } from '@react-icons/all-files/go/GoChevronRight';
// // import pageOne from 'assets/guide/1.png';
// // import pageTwo from 'assets/guide/2.png';
// // import pageThree from 'assets/guide/3.png';
// // import pageFour from 'assets/guide/4.png';
// // import pageFive from 'assets/guide/5.png';
// // import pageSix from 'assets/guide/6.png';
// import St from './style';

// type ModalProps = {
//   onClose: () => void;
// };

// function GuideModal({ onClose }: ModalProps) {
//   const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // 커스텀 Swiper handler
//   const { goNext, goPrev } = useSwiperNavigation({
//     swiperInstance,
//     currentIndex,
//     setCurrentIndex,
//     maxIndex: 6
//   });

//   const handleSlideChange = (swiper: SwiperClass) => {
//     setCurrentIndex(swiper.activeIndex);
//   };

//   return (
//     <St.ModalBackdrop onClick={onClose}>
//       <St.ModalContent onClick={(e) => e.stopPropagation()}>
//         <Swiper
//           onSwiper={setSwiperInstance}
//           onSlideChange={handleSlideChange}
//           spaceBetween={20}
//           slidesPerView={1}
//           pagination={{
//             clickable: true
//           }}
//         >
//
//           {/* <SwiperSlide>
//             <picture>
//               <St.GuideImageWebp srcSet="/guide/1.webp" type="image/webp" />
//               <St.GuideImage src="/guide/1.png" alt="guide-one" />
//             </picture>
//           </SwiperSlide>
//           <SwiperSlide>
//             <picture>
//               <source srcSet="/guide/2.webp" type="image/webp" />
//               <img src="/guide/2.png" alt="guide-two" />
//             </picture>
//           </SwiperSlide>
//           <SwiperSlide>
//             <picture>
//               <source srcSet="/guide/3.webp" type="image/webp" />
//               <img src="/guide/3.png" alt="guide-three" />
//             </picture>
//           </SwiperSlide>
//           <SwiperSlide>
//             <picture>
//               <source srcSet="/guide/4.webp" type="image/webp" />
//               <img src="/guide/4.png" alt="guide-four" />
//             </picture>
//           </SwiperSlide>
//           <SwiperSlide>
//             <picture>
//               <source srcSet="/guide/5.webp" type="image/webp" />
//               <img src="/guide/5.png" alt="guide-five" />
//             </picture>
//           </SwiperSlide>
//           <SwiperSlide>
//             <picture>
//               <source srcSet="/guide/6.webp" type="image/webp" />
//               <img src="/guide/6.png" alt="guide-six" />
//             </picture>
//           </SwiperSlide> */}
//           <St.NavigationButtonContainer>
//             <St.NavButton onClick={goPrev}>
//               {currentIndex > 0 && (
//                 <span>
//                   <GoChevronLeft />
//                 </span>
//               )}
//             </St.NavButton>
//             <St.NavButton onClick={goNext}>
//               {currentIndex < 5 && (
//                 <span>
//                   <GoChevronRight />
//                 </span>
//               )}
//             </St.NavButton>
//           </St.NavigationButtonContainer>
//           <St.PageCount>{`${currentIndex + 1} / 6`}</St.PageCount>
//         </Swiper>
//       </St.ModalContent>
//     </St.ModalBackdrop>
//   );
// }

// export default GuideModal;
