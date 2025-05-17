import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const typing = keyframes`
  0% { content: "."; }
  33% { content: ".."; }
  66% { content: "..."; }
  100% { content: "."; }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3498db;
  margin-right: 8px;
  animation: ${spin} 1.5s linear infinite;
`;

const TextBubble = styled.div`
  display: inline-block;
  background-color: #f1f1f1;
  color: #333;
  padding: 10px;
  border-radius: 15px;
  max-width: 250px;
  text-align: left;
  font-size: 16px;
  position: relative;
  animation: ${typing} 2s steps(3) infinite;
`;

const Loading = () => {
  return (
    <div className="text-center text-gray-600">
      <TextBubble>
        <Spinner />
        <span>Hmm... Let me think</span>
      </TextBubble>
    </div>
  );
};

export default Loading;