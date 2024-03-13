// import defaultProfileJPG from 'assets/defaultProfileImg.jpg';
// import defaultProfileWEBP from 'assets/defaultProfileImg.webp';
import { useModal } from 'hooks/useModal';
import { GoChevronDown } from '@react-icons/all-files/go/GoChevronDown';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'recoil/modals';
import { isSignUpState } from 'recoil/users';
import { auth } from 'shared/firebase';
import St from './style';

type Props = {
  styledNav: ({ isActive }: { isActive: boolean }) => {
    color: string;
  };
  setIsAuthToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthNavBar({ styledNav, setIsAuthToggleOpen }: Props) {
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);
  const setIsSignUp = useSetRecoilState(isSignUpState);

  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  const onAuthCheckHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!auth.currentUser) {
      const onClickCancel = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen02: false }));
        modal.close();
        return;
      };

      const onClickSave = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen02: false }));
        modal.close();
        navigate('/auth');
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '로그인이 필요합니다.',
        message: '로그인 창으로 이동하시겠습니까?',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '로그인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen02: true }));
    } else if (window.location.pathname === '/write') {
      window.location.reload();
    } else {
      navigate('/write');
    }
  };

  return (
    <St.AuthContainer>
      <St.StyledNavLinkWrite to="/write" onClick={onAuthCheckHandler} style={styledNav}>
        글쓰기
      </St.StyledNavLinkWrite>
      {currentUser ? (
        <>
          <St.UserInfo onClick={() => setIsAuthToggleOpen((prev) => !prev)}>
            <img src={currentUser?.photoURL ?? '/images/defaultProfileImg.webp'} alt="profile" />
            <span>{currentUser?.displayName}</span>
            <span>
              <GoChevronDown />
            </span>
          </St.UserInfo>
        </>
      ) : (
        <>
          <St.StyledNavLnk to="/auth" onClick={() => setIsSignUp(false)} style={styledNav}>
            로그인
          </St.StyledNavLnk>
        </>
      )}
    </St.AuthContainer>
  );
}

export default AuthNavBar;
