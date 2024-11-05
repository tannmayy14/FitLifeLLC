import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


// Styled Components
const PageWrapper = styled.div`
  background-color: #0d0d0d;
  color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  text-align: center;
`;

const Heading = styled(motion.h1)`
  font-family: 'Oswald', sans-serif;
  color: #ffffff;
  font-size: 4rem;
  margin: 0;
  letter-spacing: 0.1rem;
`;

const SubHeading = styled(motion.h2)`
  font-family: 'Bebas Neue', sans-serif;
  color: #ff4500;
  font-size: 2rem;
  margin-top: 1rem;
`;

const AccentText = styled(motion.p)`
  font-family: 'Roboto', sans-serif;
  color: #ffbf00;
  font-size: 1.25rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  font-family: 'Poppins', sans-serif;
  background-color: #ff4500;
  color: #0d0d0d;
  border: none;
  padding: 1rem 2rem;
  margin-top: 2rem;
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #ffbf00;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #ffbf00;
  color: #0d0d0d;
  margin-top: 1rem;
  &:hover {
    background-color: #ff4500;
    color: #ffffff;
  }
`;

// Animation Variants
const headingVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const subHeadingVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const buttonVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// Paywall Page Component
const Paywall = ({ user }) => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Heading 
        variants={headingVariant} 
        initial="hidden" 
        animate="visible"
      >
        This Content is Behind a Paywall
      </Heading>
      <SubHeading
        variants={subHeadingVariant} 
        initial="hidden" 
        animate="visible"
      >
        Exclusive Content For Members Only
      </SubHeading>
      <AccentText
        variants={buttonVariant} 
        initial="hidden" 
        animate="visible"
      >
        Subscribe Now To Unlock Premium Access
      </AccentText>

      {user ? (
        <Button 
          variants={buttonVariant} 
          initial="hidden" 
          animate="visible"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/pricing")}
        >
          Check Out Pricing
        </Button>
      ) : (
        <>
          <SecondaryButton
            variants={buttonVariant} 
            initial="hidden" 
            animate="visible"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/signin")}
          >
            Sign In / Sign Up
          </SecondaryButton>
          <SecondaryButton
            variants={buttonVariant} 
            initial="hidden" 
            animate="visible"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/pricing")}
          >
            Check Out Pricing
          </SecondaryButton>
        </>
      )}
    </PageWrapper>
  );
};

export default Paywall;
