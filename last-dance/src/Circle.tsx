import React, { useState } from "react";
import styled from "styled-components";

interface ContianerProps {
  bgColor: string;
}

const Container = styled.div<ContianerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
`;

interface CircleProps {
  bgColor?: string;
}

const Circle = ({ bgColor = "white" }: CircleProps) => {
  const [counter, setCounter] = useState(0);

  return <Container bgColor={bgColor} />;
};

export default Circle;
