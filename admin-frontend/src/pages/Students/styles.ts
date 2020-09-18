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

export const StudentsList = styled.div`
  width: 100%;
  max-width: 700px;
  border: 2px solid #013c64;
  border-radius: 4px;
  overflow: hidden;

  a {
    display: block;
    padding: 12px 24px;
    transition: background-color 0.15s;

    &:nth-child(even) {
      background-color: #ced4da;
    }

    &:hover {
      background-color: #ffcf00;
    }
  }
`;
