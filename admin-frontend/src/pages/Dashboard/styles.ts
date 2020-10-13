import styled from 'styled-components';

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

export const Circle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: #3f51b5;
  }

  div {
    font-size: 30px;
    border: 2px solid #3f51b5;
    width: 100px;
    height: 100px;
    line-height: 95px;
    border-radius: 50%;
    text-align: center;
  }

  & + div {
    margin-left: 48px;

    h2 {
      color: #009688;
    }

    div {
      border: 2px solid #009688;
    }
  }
`;

export const StudentListContainer = styled.div`
  display: flex;
  margin-bottom: 48px;
  border: 2px solid #013c64;
  border-radius: 4px;
  width: 100%;
`;

export const StudentList = styled.ul`
  list-style: none;
  width: 100%;
  max-width: 800px;
  text-align: center;

  h2 {
    padding: 12px;
    border-bottom: 2px solid #013c64;
    color: #3f51b5;
  }

  li {
    padding: 12px 24px;
    transition: background-color 0.15s;

    &:hover {
      background-color: #3f51b5;
    }
  }

  & + ul {
    h2 {
      color: #009688;
    }

    li {
      &:hover {
        background-color: #009688;
      }
    }
  }
`;
