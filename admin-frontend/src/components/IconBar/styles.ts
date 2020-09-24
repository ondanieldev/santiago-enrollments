import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #fff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  padding: 12px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  max-width: 50px;

  button {
    border: 0;
    background: transparent;
    transition: transform 0.15s;

    &:hover {
      transform: scale(1.1);
    }

    & + button {
      margin-top: 24px;
    }
  }
`;
