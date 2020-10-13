import styled, { css } from 'styled-components';

interface IStudentProps {
  paid: boolean;
}

interface IInfoLabelProps {
  backgroundColor: string;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-right: 1px solid #212529;

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
    width: 30px;
    height: 30px;
    padding: 4px;
    margin: 0 12px;
  }
`;

export const InfoLabelContainer = styled.div`
  display: flex;

  div {
    & + div {
      margin-left: 6px;
    }
  }
`;

export const InfoLabel = styled.div<IInfoLabelProps>`
  padding: 6px;
  font-size: 14px;
  border-radius: 6px;
  color: #f7f6fc;

  ${props =>
    css`
      background-color: ${props.backgroundColor};
    `}
`;
