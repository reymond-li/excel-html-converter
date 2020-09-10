import styled from "styled-components";

export const TitleContainer = styled.div`
  margin: auto;
  padding: 20px;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  color: #2c2c2c;
`;

export const DescriptionContainer = styled.div`
  margin: auto;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #2c2c2c;
`;

export const SectionContainer = styled.div`
  margin: auto;
  padding: 20px;
  text-align: center;
`;

export const DownloadButton = styled.button`
  ${({ disabled }) => disabled && "display: none;"}
  border: 1px solid #757575;
  border-radius: 5px;
  color: #fff;
  background-color: steelblue;
  font-size: 20px;
  font-weight: 500;
  padding: 6px 12px;
`;

export const FormContainer = styled.form`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #757575;
  border-radius: 5px;
`;

export const InputLabel = styled.label`
  font-size: 18px;
`;

export const InputContainer = styled.input`
  font-size: 18px;
`;
