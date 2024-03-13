// import figmaIconPNG from '/icons/figma.png';
// import figmaIconWEBP from '/icons/figma.webp';
// import githubIconPNG from '/icons/github-icon.png';
// import githubIconWEBP from 'assets/icons/github-icon.webp';
// import mangoLogoIconPNG from 'assets/icons/mango-logo.png';
// import mangoLogoIconWEBP from 'assets/icons/mango-logo.webp';
import { LogoContainerFooter } from 'layouts/navbar/style';
import { useNavigate } from 'react-router-dom';
import St from './style';

function Footer() {
  const navigate = useNavigate();

  return (
    <St.FooterContainer>
      <St.FooterContentContainer>
        <St.LogoWrapper>
          <LogoContainerFooter>
            <picture>
              <source srcSet="/icons/mango-logo.webp" type="image/webp" />
              <img src="/icons/mango-logo.png" alt="logo" />
            </picture>
            <span onClick={() => navigate('/')}>Mango</span>
          </LogoContainerFooter>
        </St.LogoWrapper>
        <St.FooterText>
          <p>내일배움캠프 | 스파르타코딩클럼 | 팀스파르타</p>
          <p>A8 Team Infinity</p>
          <St.TeamInfo>
            <St.SingleMember>
              <span>김혜민 Kim</span>
              <a href="https://github.com/zerotonine2da" target="_blank" rel="noopener noreferrer">
                <picture>
                  <source srcSet="/icons/github-icon.webp" type="image/webp" />
                  <img src="/icons/github-icon.png" alt="github-icon" />
                </picture>
              </a>
            </St.SingleMember>
            <span>|</span>
            <St.SingleMember>
              <span>박솔이 Soli</span>
              <a href="https://github.com/Solyi-Park" target="_blank" rel="noopener noreferrer">
                <picture>
                  <source srcSet="/icons/github-icon.webp" type="image/webp" />
                  <img src="/icons/github-icon.png" alt="github-icon" />
                </picture>
              </a>
            </St.SingleMember>
            <span>|</span>
            <St.SingleMember>
              <span>박혜민 Ashley</span>
              <a href="https://github.com/hyeomin" target="_blank" rel="noopener noreferrer">
                <picture>
                  <source srcSet="/icons/github-icon.webp" type="image/webp" />
                  <img src="/icons/github-icon.png" alt="github-icon" />
                </picture>
              </a>
            </St.SingleMember>
            <span>|</span>
            <St.SingleMember>
              <span>박희원 Hailey</span>
              <a href="https://github.com/heeneeee" target="_blank" rel="noopener noreferrer">
                <picture>
                  <source srcSet="/icons/github-icon.webp" type="image/webp" />
                  <img src="/icons/github-icon.png" alt="github-icon" />
                </picture>
              </a>
            </St.SingleMember>
            <span>|</span>
            <St.SingleMember>
              <span>송승훈 Hoon</span>
              <a
                href="https://www.figma.com/file/26bMH0GEeJKepxaqcaYHMg/%EB%A7%9D%EA%B3%A0%EB%A7%9D?type=design&node-id=0%3A1&mode=design&t=KmHXwJ62oVZL2kyp-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <picture>
                  <source srcSet="/icons/figma.webp" type="image/webp" />
                  <img src="/icons/figma.png" alt="figma-icon" />
                </picture>
              </a>
            </St.SingleMember>
          </St.TeamInfo>
        </St.FooterText>
      </St.FooterContentContainer>
      <St.CopyrightBox>MANGO PROJECT © Copyrights All Reserved</St.CopyrightBox>
    </St.FooterContainer>
  );
}

export default Footer;
