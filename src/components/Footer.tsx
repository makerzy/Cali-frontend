import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import {
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoTwitter,
  logoYoutube,
} from "ionicons/icons";
import styled from "styled-components";

const Footer = styled.div`
  background-color: #1c2126;
  color: #f4f4f4;
  padding: 15px 20px 50px;
`;
const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (min-width: 700px) {
    flex-direction: row;
    /* align-items: center; */
    justify-content: space-between;
  }
`;
const CaliFooterLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  @media (min-width: 700px) {
    width: 100px;
    height: 100px;
    left: 0;
  }
`;

const ContactUs = styled.div``;

const FollowContainer = styled.div`
  @media (min-width: 700px) {
    margin-bottom: 20px;
  }
`;
const FollowHeader = styled.h5``;
const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DoubleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    /* flex-direction: row; */
    /* align-items: center; */
    /* justify-content: space-between; */
  }
`;
const Social = styled(IonButton)`
  /* width: 25px;
  height: 25px;
  margin-right: 10px; */
`;
const QuickLink = styled.a`
  margin-bottom: 10px;
  text-transform: capitalize;
  color: #b8b8b8;
  text-decoration: none;
`;
const QuickLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    /* margin-right: 30px; */
  }
`;
const QuickWrap = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    margin-right: 30px;
  }
`;

const QWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterComponent = () => {
  return (
    <>
      <Footer>
        <FooterInner>
          <CaliFooterLogo>
            <img src='/assets/svgs/caliLogo.svg' alt='' />
          </CaliFooterLogo>
          <DoubleWrapper>
            <FollowContainer>
              <FollowHeader>
                <b> Follow Us!</b>
              </FollowHeader>
              <SocialContainer>
                <Social
                  href='https://www.twitter.com/calicoin_token/'
                  fill='clear'
                  color='medium'
                  className='ion-no-padding'>
                  <IonIcon size='large' icon={logoTwitter} />
                </Social>
                <Social
                  href='https://www.facebook.com/calicoin.token/'
                  fill='clear'
                  color='medium'
                  className='ion-no-padding'>
                  <IonIcon size='large' icon={logoFacebook} />
                </Social>
                <Social
                  href='https://www.linkedin.com/company/76362000'
                  fill='clear'
                  color='medium'
                  className='ion-no-padding'>
                  <IonIcon size='large' icon={logoLinkedin} />
                </Social>
                <Social
                  href='https://www.instagram.com/calicoin.me/'
                  fill='clear'
                  color='medium'
                  className='ion-no-padding'>
                  <IonIcon size='large' icon={logoInstagram} />
                </Social>
                <Social
                  href='https://www.youtube.com/channel/UC3b_MRtk-DMsHgxey7HbBFQ'
                  fill='clear'
                  color='medium'
                  className='ion-no-padding'>
                  <IonIcon size='large' icon={logoYoutube} />
                </Social>
                <Social
                  href='https://t.me/calicoinofficialgroup'
                  fill='clear'
                  color='medium'
                  className='ion-no-padding'>
                  <IonIcon size='large' src='/assets/svgs/telegram.svg' />
                </Social>
              </SocialContainer>
            </FollowContainer>
            <ContactUs>
              <FollowHeader>
                <b> Contact Us</b>
              </FollowHeader>
              <a
                style={{ textDecoration: "none", color: "#b8b8b8" }}
                href='mailto:info@calicoin.me'>
                info@calicoin.me
              </a>
            </ContactUs>
          </DoubleWrapper>
          <QuickLinkContainer>
            <FollowHeader>
              <b> Quick Links</b>
            </FollowHeader>
            <QWrapper>
              <QuickWrap>
                <QuickLink href='https://calicoin.me/wallet/' target='_blank'>
                  My Wallet
                </QuickLink>
                <QuickLink
                  href='https://calicoin.me/how-to-donate/'
                  target='_blank'>
                  How to Donate
                </QuickLink>
                <QuickLink
                  href='https://calicoin.me/announcements/'
                  target='_blank'>
                  Annoucement
                </QuickLink>
                <QuickLink
                  href='https://calicoin.me/resources/'
                  target='_blank'>
                  Resources
                </QuickLink>
                <QuickLink href='https://calicoin.me/faqs/' target='_blank'>
                  FAQ's
                </QuickLink>
              </QuickWrap>

              <QuickWrap>
                <QuickLink
                  href='https://calicoin.me/wp-content/uploads/2021/03/CaliCoin-White-Paper.pdf'
                  target='_blank'>
                  White Paper
                </QuickLink>
                <QuickLink
                  href='https://calicoin.me/im-a-charity/'
                  target='_blank'>
                  I'm a Charity
                </QuickLink>
                <QuickLink
                  href='https://calicoin.me/im-a-donor/'
                  target='_blank'>
                  I'm a Donor
                </QuickLink>
                <QuickLink
                  href='https://calicoin.me/general-inquiries/'
                  target='_blank'>
                  General Inquiries
                </QuickLink>
              </QuickWrap>
            </QWrapper>
          </QuickLinkContainer>
        </FooterInner>
      </Footer>
    </>
  );
};

export default FooterComponent;
