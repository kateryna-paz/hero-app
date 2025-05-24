import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .bar {
    display: inline-block;
    width: 4px;
    height: 25px;
    background-color: rgba(42, 14, 76, 0.5);
    border-radius: 10px;
    animation: scale-up4 1s linear infinite;
  }

  .bar:nth-child(2) {
    height: 38px;
    animation-delay: 0.25s;
  }

  .bar:nth-child(3) {
    animation-delay: 0.5s;
  }

  @keyframes scale-up4 {
    20% {
      background-color: #5923b1;
      transform: scaleY(1.75);
    }

    40% {
      transform: scaleY(1);
    }
  }
`;

export default Loader;
