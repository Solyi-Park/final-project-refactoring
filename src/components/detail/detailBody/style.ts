import styled from 'styled-components';
import theme from '../../../styles/theme';

const BodyContainer = styled.div`
  width: 100%;
  margin: 40px 0;
`;

const BodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostInfo = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 18px;
  font-weight: bold;

  & img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 15px;
  }
`;

const DateSpan = styled.span`
  color: ${theme.color.gray};
  font-size: 14px;
  font-weight: 300;
`;

const EditNDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  position: relative;
  color: ${theme.color.lightgray};

  & button {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

const ContentBody = styled.div`
  color: ${theme.color.darkgray};
  padding: 40px 0;
  border-bottom: 1px solid ${theme.color.lightgray};
  line-height: 200%;
`;

const AdditionalInfoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  column-gap: 30px;
  font-size: 18px;
  color: #222222;
  padding: 15px 0;
`;

const CountInfo = styled.div`
  display: flex;
  column-gap: 12px;

  & div {
    display: flex;
    column-gap: 7px;
  }
`;

export default {
  BodyContainer,
  BodyHeader,
  PostInfo,
  DateSpan,
  EditNDeleteContainer,
  ContentBody,
  AdditionalInfoContainer,
  CountInfo
};