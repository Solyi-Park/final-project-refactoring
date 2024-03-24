import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from 'api/authApi';
import { getPopularPosts } from 'api/homeApi';
// import mangoDefaultProfileJPG from 'assets/realMango.png';
// import mangoDefaultProfileWEBP from 'assets/realMango.webp';
import PostContentPreview from 'components/PostContentPreview';
import { AuthContext } from 'context/AuthContext';
import { useLikeButton } from 'hooks/useLikeButton';
import useSwiperNavigation from 'hooks/useSwiperNavigation';
import { QUERY_KEYS } from 'query/keys';
import { useContext, useEffect, useState } from 'react';
import { GoComment } from '@react-icons/all-files/go/GoComment';
import { GoEye } from '@react-icons/all-files/go/GoEye';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { getThumbnailSource } from 'util/getThumbnailSource';
import CarouselSkeleton from './skeleton/CarouselSkeleton';
// import swipeLeftPNG from 'assets/icons/swipeLeft.png';
// import swipeLeftWEBP from 'assets/icons/swipeLeft.webp';
// import swipeRightPNG from 'assets/icons/swipeRight.png';
// import swipeRightWEBP from 'assets/icons/swipeRight.webp';
import 'swiper/css';
import 'swiper/css/pagination';
import St from './style';

const Carousel = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const currentUserId = currentUser?.uid;

  const {
    data: popularPosts,
    isLoading: popularPostsIsLoading,
    error: popularPostsError
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.POPULAR],
    queryFn: getPopularPosts,
    staleTime: 60_000 * 5
  });
  if (popularPostsError) {
    console.log('인기 게시물 가져오기 실패!', popularPostsError);
  }

  const {
    data: users,
    isLoading: userIsLoading,
    error: usersError
  } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers,
    staleTime: 60_000 * 5
  });

  if (usersError) {
    console.log('users 데이터 가져오기 실패!', usersError);
  }

  // swiper 관련 ----
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  // 커스텀 Swiper handler
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: popularPosts ? popularPosts.length - 1 : 0
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  };
  // ---- swiper 관련

  const onClickLikeButton = useLikeButton();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 431) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <St.Container>
      {popularPostsIsLoading && userIsLoading ? (
        <CarouselSkeleton />
      ) : (
        <St.SlideWrapper>
          <Swiper
            pagination={{
              clickable: true
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            navigation={true}
            slidesPerView={slidesPerView}
          >
            {popularPosts && popularPosts.length === 0 ? (
              <St.PlaceHolder>인기 게시물 데이터 없습니다.</St.PlaceHolder>
            ) : (
              popularPosts?.map((post, idx) => {
                const user = users?.find((user) => user.uid === post.uid);
                return (
                  <SwiperSlide key={idx}>
                    <Link key={post.id} to={`/detail/${post.id}`}>
                      <St.Slide>
                        <St.CoverImage>
                          <img src={getThumbnailSource(post.coverImages)} alt={post.title} />
                        </St.CoverImage>
                        <St.SlideHeader>
                          <div>
                            <St.UserProfileImage>
                              <img src={user?.profileImg || '/images/realMangoBPNG.png'} alt="profile" />
                            </St.UserProfileImage>
                            <St.UserProfileName>
                              <span>{user?.displayName}</span>
                            </St.UserProfileName>
                          </div>
                          <button aria-label="like-button" type="button" onClick={(e) => onClickLikeButton(e, post.id)}>
                            {currentUserId && post.likedUsers?.includes(currentUserId) ? (
                              <St.HeartFillIcon />
                            ) : (
                              <St.HeartIcon />
                            )}
                          </button>
                        </St.SlideHeader>
                        <St.SlideBottom>
                          <St.TitleAndContent>
                            <h1>{post.title}</h1>
                            <div>
                              <PostContentPreview postContent={post.content || ''} />
                            </div>
                          </St.TitleAndContent>
                          <St.InteractionInfo>
                            <div>
                              <GoEye />
                              <span>{post.viewCount?.toLocaleString() || 0}</span>
                            </div>
                            <div>
                              <FaRegHeart />
                              <span>{post.likeCount?.toLocaleString() || 0}</span>
                            </div>
                            <div>
                              <GoComment />
                              <span>{post.commentCount?.toLocaleString() || 0}</span>
                            </div>
                          </St.InteractionInfo>
                        </St.SlideBottom>
                      </St.Slide>
                    </Link>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </St.SlideWrapper>
      )}
      {popularPosts && (
        <St.NavigationButtonContainer>
          <div onClick={goPrev}>
            {currentIndex > 0 && (
              <picture>
                <source srcSet="icons/swipeLeft.webp" type="image/webp" />
                <img src="icons/swipeLeft.png" alt="previous" />
              </picture>
            )}
          </div>
          <div onClick={goNext}>
            {currentIndex < Math.floor(popularPosts.length - slidesPerView) && (
              <picture>
                <source srcSet="icons/swipeRight.webp" type="image/webp" />
                <img src="icons/swipeRight.png" alt="next" />
              </picture>
            )}
          </div>
        </St.NavigationButtonContainer>
      )}
    </St.Container>
  );
};

export default Carousel;
