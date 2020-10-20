import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 24px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CircleContainer = styled.div`
  display: flex;
  margin: 48px 0;

  h2 {
    margin-bottom: 12px;
  }
`;

interface ICircleProps {
  themeColor: string;
}

export const Circle = styled.div<ICircleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    ${props =>
      css`
        color: ${props.themeColor};
      `}
  }

  div {
    font-size: 30px;
    width: 100px;
    height: 100px;
    line-height: 95px;
    border-radius: 50%;
    text-align: center;

    ${props =>
      css`
        border: 2px solid ${props.themeColor};
      `}
  }

  & + div {
    margin-left: 48px;
  }
`;

export const StudentListContainer = styled.div`
  display: flex;
  margin-bottom: 48px;
  border: 2px solid #013c64;
  border-radius: 4px;
  width: 100%;
`;

export const StudentList = styled.div`
  list-style: none;
  width: 100%;
  max-width: 800px;
  text-align: center;

  h2 {
    padding: 12px;
    border-bottom: 2px solid #013c64;
    color: #3f51b5;
  }

  a {
    padding: 12px 24px;
    transition: background-color 0.15s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 55px;

    &:hover {
      background-color: #3f51b5;
    }
  }

  & + div {
    h2 {
      color: #009688;
    }

    a {
      &:hover {
        background-color: #009688;
      }
    }
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

interface IInfoLabelProps {
  backgroundColor: string;
}

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
