import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'api/homeApi';
import { QUERY_KEYS } from 'query/keys';
import { useEffect, useState } from 'react';
import { GoChevronLeft } from '@react-icons/all-files/go/GoChevronLeft';
import { GoChevronRight } from '@react-icons/all-files/go/GoChevronRight';
import { useNavigate } from 'react-router-dom';
import St from './style';

type Props = {
  postId: string | undefined;
};

function PostShift({ postId }: Props) {
  const { data: postList, error } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts,
    staleTime: 60_000
  });

  if (error) {
    console.log('전체 게시물(posts) 가져오기 실패!', error);
  }

  const [postIndexNumber, setPostIndexNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const postIndex = postList?.findIndex((post) => post.id === postId);
    if (postIndex) setPostIndexNumber(postIndex); // 현재 post의 인덱스 설정
  }, [postList, postId]);

  //prev 버튼
  const onClickPrevButton = () => {
    if (postList && postIndexNumber > 0) {
      const prevPostId = postList[postIndexNumber - 1].id;
      navigate(`/detail/${prevPostId}`);
      setPostIndexNumber(postIndexNumber - 1);
    }
  };

  //next 버튼
  const onClickNextButton = () => {
    if (postList && postIndexNumber < postList.length - 1) {
      const nextPostId = postList[postIndexNumber + 1].id;
      navigate(`/detail/${nextPostId}`);
      setPostIndexNumber(postIndexNumber + 1);
    }
  };

  return (
    <St.ButtonContainer>
      {postIndexNumber > 0 && (
        <St.ShiftButton $side={'left'} onClick={onClickPrevButton} type="button">
          <GoChevronLeft />
          <span>이전 글 보기</span>
        </St.ShiftButton>
      )}
      {postList && postIndexNumber < postList.length - 1 && (
        <St.ShiftButton $side={'right'} onClick={onClickNextButton} type="button">
          <span>다음 글 보기</span>
          <GoChevronRight />
        </St.ShiftButton>
      )}
    </St.ButtonContainer>
  );
}

export default PostShift;
