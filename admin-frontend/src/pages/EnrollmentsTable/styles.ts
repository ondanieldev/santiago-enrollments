import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;
`;

export const List = styled.table`
  width: 100%;
  overflow-x: scroll;
  border: 1px solid #212529;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #212529;
    padding: 12px;
  }

  tr {
    transition: 0.1s all linear;

    &:hover {
      background-color: #ffcf00;
    }
  }

  thead {
    tr {
      font-weight: bold;
    }
  }
`;
