import { useQuery } from '@tanstack/react-query';
import { getNews } from 'api/newsApi';
// import swipeLeft from 'assets/about/swipe-left-white.png';
// import swipeRight from 'assets/about/swipe-right-white.png';
import useRoleCheck from 'hooks/useRoleCheck';
import { QUERY_KEYS } from 'query/keys';
import { useState } from 'react';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import NewsUpload from './NewsUpload';
import YoutubeModal from './YoutubeModal';

import useSwiperNavigation from 'hooks/useSwiperNavigation';
import 'swiper/css';
import 'swiper/css/pagination';
import { getFormattedDateCustom } from 'util/formattedDateAndTime';
import St from './style';

function NewsRoom() {
  const [newsUrl, setNewsUrl] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(''); // 모달에 띄울 비디오 ID

  // swiper 관련
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // role 비어있을 경우 다시 받아오기
  const role = useRoleCheck();

  const { data: newsPosts, error } = useQuery({ queryKey: [QUERY_KEYS.NEWS], queryFn: getNews, staleTime: 60_000 });

  if (error) {
    console.log('뉴스 가져오기 실패', error);
  }

  // 클릭한 비디오로 모달창 띄우기
  const onClickSlideHandler = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  // 커스텀 Swiper handler
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: newsPosts ? newsPosts.length - 1 : 0
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <St.NewsRoomContainer>
      <St.TabTitle>
        <h3>NEWS ROOM</h3>
      </St.TabTitle>
      <St.SwiperContainer>
        <St.NewsRoomTitle>
          <h4>뉴스룸</h4>
          <span>환경과 관련된 뉴스를 확인하세요!</span>
        </St.NewsRoomTitle>
        {newsPosts && (
          <>
            <St.StyledSwiper
              onSwiper={setSwiperInstance}
              onSlideChange={handleSlideChange}
              breakpoints={{
                1200: {
                  spaceBetween: 20,
                  slidesPerView: 4
                },
                900: {
                  spaceBetween: 20,
                  slidesPerView: 3
                },
                650: {
                  spaceBetween: 10,
                  slidesPerView: 2
                },
                431: {
                  spaceBetween: 10,
                  slidesPerView: 1
                }
              }}
              pagination={{
                clickable: true
              }}
            >
              {newsPosts.map((news, index) => (
                <SwiperSlide key={index} onClick={() => onClickSlideHandler(news.youtubeId)}>
                  <St.SingleSlide>
                    <img src={news.thumbnailUrl} alt="video preview" />
                    <St.NewsInfo>
                      <span className="swiper-no-swiping" onClick={(e) => e.stopPropagation()}>
                        {news.tags[0]}
                      </span>
                      <strong className="swiper-no-swiping" onClick={(e) => e.stopPropagation()}>
                        {news.title}
                      </strong>
                      <span className="swiper-no-swiping" onClick={(e) => e.stopPropagation()}>
                        {getFormattedDateCustom(news.publishedAt)}
                      </span>
                    </St.NewsInfo>
                  </St.SingleSlide>
                </SwiperSlide>
              ))}
            </St.StyledSwiper>
            <St.NavigationButtonContainer>
              <div onClick={goPrev}>
                {currentIndex > 0 && (
                  <picture>
                    <source srcSet="about/swipe-left-white.webp" type="image/webp" />
                    <img src="about/swipe-left-white.png" alt="Previous" />
                  </picture>
                )}
              </div>
              <div onClick={goNext}>
                {currentIndex < Math.floor(newsPosts.length / 4) && (
                  <picture>
                    <source srcSet="about/swipe-right-white.webp" type="image/webp" />
                    <img src="about/swipe-right-white.png" alt="Next" />
                  </picture>
                )}
              </div>
            </St.NavigationButtonContainer>
          </>
        )}
        {/* 어드민만 등록하기 인풋 보이게 */}
        {role && role === 'admin' && <NewsUpload newsUrl={newsUrl} setNewsUrl={setNewsUrl} />}
      </St.SwiperContainer>
      {selectedVideo && <YoutubeModal videoId={selectedVideo} onClose={() => setSelectedVideo('')} />}
    </St.NewsRoomContainer>
  );
}

export default NewsRoom;
