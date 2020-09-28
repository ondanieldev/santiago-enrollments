import styled, { css } from 'styled-components';

interface IStudentProps {
  paid: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;

  strong {
    margin-bottom: 24px;
  }
`;

export const StudentsList = styled.div`
  width: 100%;
  max-width: 700px;
  border: 2px solid #013c64;
  border-radius: 4px;
  overflow: hidden;
`;

export const Student = styled.div<IStudentProps>`
  display: flex;
  align-items: center;

  a {
    flex: 1;
    padding: 12px 24px;
    transition: background-color 0.15s;

    ${props =>
      props.paid &&
      css`
        color: #4caf50;
      `}

    &:nth-child(even) {
      background-color: #ced4da;
    }

    &:hover {
      background-color: #ffcf00;
    }
  }

  button {
    max-width: 25px;
    max-height: 25px;
    padding: 0;
    margin: 0 12px;
  }
`;
