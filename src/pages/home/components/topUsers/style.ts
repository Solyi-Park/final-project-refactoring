import styled from 'styled-components';

const Container = styled.section`
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 40px 0 150px 0;
  & h1 {
    color: #000;
    font-size: 28px;
    font-weight: 700;
    @media screen and (max-width: 431px) {
      font-size: 26px;
    }
  }
  & h3 {
    color: #ffa114;
    font-size: 17px;
    font-weight: 600;
    @media screen and (max-width: 431px) {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 431px) {
    width: 100%;
  }
`;

const PlaceHolder = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  font-size: 19px;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
`;

const UserList = styled.div`
  width: 85%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto auto;
  gap: 10px;

  @media screen and (max-width: 431px) {
    width: 100%;
    height: 250px;
    gap: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 200px;
  @media screen and (max-width: 431px) {
    height: 120px;
  }
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 431px) {
    width: 40px;
    height: 40px;
  }
`;

const UserName = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  & img {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 431px) {
    font-size: 9px;
    margin-top: 10px;
    & img {
      width: 15px;
      height: 15px;
    }
  }
`;

export default {
  Container,
  PlaceHolder,
  Title,
  UserList,
  UserInfo,
  ProfileImage,
  UserName
};
