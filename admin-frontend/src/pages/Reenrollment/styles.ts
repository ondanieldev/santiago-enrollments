import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px 48px;

  strong {
    margin-bottom: 24px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      max-width: 350px;
      margin-bottom: 12px;
    }

    button {
      width: 100%;
      max-width: 350px;
    }
  }
`;

export const DataGroup = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const Table = styled.table`
  width: 100%;
  border: 2px solid #013c64;
  border-radius: 4px;
  padding: 0;

  tbody {
    tr {
      transition: background-color 0.15s;

      &:nth-child(even) {
        background-color: #ced4da;
      }

      &:hover {
        background-color: #ffcf00;
      }

      td {
        padding: 12px;
      }
    }
  }
`;

export const DocumentGroup = styled.div`
  display: flex;
  margin-top: 24px;

  > a {
    & + a {
      margin-left: 12px;
    }
  }
`;
