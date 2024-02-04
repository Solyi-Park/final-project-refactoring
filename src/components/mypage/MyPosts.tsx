import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getMyPosts } from '../../api/myPostAPI';
import { AuthContext } from '../../context/AuthContext';
import { QUERY_KEYS } from '../../query/keys';
import { PostContainer } from '../community/communityPostList/style';
import PostCard from '../mypage/PostCard/PostCard';
import MyPageSkeleton from './myPageSkeleton/MyPageSkeleton';

// 내 게시물 가져오기
const MyPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  //test
  const { data: myPosts, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, 'myPosts'],
    queryFn: getMyPosts,
    enabled: !!authCurrentUser,
    staleTime: 60_000
  });

  return (
    <>
      {isLoading && <MyPageSkeleton />}
      <PostContainer>
        {myPosts?.length! > 0 ? (
          myPosts?.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p style={{ display: 'flex', justifyContent: 'center' }}>내 게시물이 없습니다.</p>
        )}
      </PostContainer>
    </>
  );
};
export default MyPosts;
