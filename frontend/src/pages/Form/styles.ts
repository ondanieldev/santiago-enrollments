import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;

  h1 {
    margin-bottom: 24px;
  }

  > div {
    display: flex;
    justify-content: center;
    width: 100%;

    form {
      flex: 1;
      max-width: 700px;
    }
  }
`;

export const FormGroup = styled.div`
  & + div {
    margin-top: 24px;
  }
`;

export const InputGroup = styled.div`
  display: flex;

  & + div {
    margin-top: 12px;
  }

  > div {
    & + div {
      margin-left: 12px;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    flex: 1;
  }
`;
