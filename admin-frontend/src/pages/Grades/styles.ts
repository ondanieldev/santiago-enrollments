import styled from 'styled-components';

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

export const GradesList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  max-width: 600px;

  a {
    padding: 12px;
    margin: 12px;
    width: 250px;
    border: 2px solid #013c64;
    border-radius: 4px;
    transition: transform 0.15s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
