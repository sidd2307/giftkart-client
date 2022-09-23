import React, { useState } from "react";
import styled from "styled-components";

// responsiveness
import { mobile } from "../Responsive";

// styled components
const Container = styled.div`
  width: 300px;
  height: 150px;
  display: flex;
  position: relative;
  margin-top: 20px;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -300}px);
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 150px;
  /* background-color: #${(props) => props.bgcolor}; */
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  /* object-fit: cover; */
  width: 300px;
`;

const Image = styled.img`
  height: 100%;
  width: 90%;
  object-fit: contain;
  /* background: yellow; */
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 78px;
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

export default function Carousal2(props) {
  // hooks
  const [slideIndex, setSlideIndex] = useState(0);

  // functions
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        ◀
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {props?.images?.map((item) => (
          <Slide key={item}>
            <ImgContainer>
              <Image src={item} />
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        ▶
      </Arrow>
    </Container>
  );
}
