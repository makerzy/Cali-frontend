import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import {
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoYoutube,
} from "ionicons/icons";
import styled from "styled-components";

const Footer = styled.div`
  background-color: #1c2126;
  color: #f4f4f4;
  padding: 0px 20px 50px;
`;
const CaliFooterLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: auto;
`;
const FollowHeader = styled.h3``;
const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Social = styled(IonIcon)`
  width: 25px;
  height: 25px;
`;
const ServiceItem = styled.h6`
  /* font-weight: bold; */
`;
const FooterComponent = () => {
  return (
    <>
      {/*-- Footer without a border --*/}
      <Footer>
        <IonGrid>
          <IonRow>
            <IonCol>
              <CaliFooterLogo>
                <img src='/assets/svgs/caliLogo.svg' alt='' />
              </CaliFooterLogo>
            </IonCol>
            <IonCol>
              <h6>Contact Us</h6>
              <a href='mailto:info@calicoin.me'>info@calicoin.me</a>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <FollowHeader>
                <b> Follow Us!</b>
              </FollowHeader>
              <SocialContainer>
                <Social icon={logoFacebook} />
                <Social icon={logoLinkedin} />
                <Social icon={logoInstagram} />
                <Social icon={logoYoutube} />
                <Social src='/assets/svgs/telegram.svg' />
              </SocialContainer>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <FollowHeader>
                <b> Other</b>
              </FollowHeader>

              <ServiceItem>My Wallet</ServiceItem>
              <ServiceItem>How to Donate</ServiceItem>
              <ServiceItem>Annoucement</ServiceItem>
              <ServiceItem>Resources</ServiceItem>
              <ServiceItem>FAQ's</ServiceItem>
            </IonCol>
            <IonCol>
              <FollowHeader>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FollowHeader>
              <ServiceItem>White Paper</ServiceItem>
              <ServiceItem>I'm a Charity</ServiceItem>
              <ServiceItem>I'm a Donor</ServiceItem>
              <ServiceItem>General Inquiries</ServiceItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </Footer>
    </>
  );
};

export default FooterComponent;
