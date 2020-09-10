import React from "react";
import styled from "styled-components";

const DragDropContainer = styled.div`
  margin: auto;
  width: 600px;
  padding: 20px;
`;

const DragDropFile = ({ children, handleFile }) => {
  const suppress = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
  };
  const onDrop = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) handleFile(files[0]);
  };

  return (
    <DragDropContainer
      onDrop={onDrop}
      onDragEnter={suppress}
      onDragOver={suppress}
    >
      {children}
    </DragDropContainer>
  );
};

export default DragDropFile;
