import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 24px;

  > div {
    width: 100%;
    overflow-x: scroll;
  }
`;

export const List = styled.table`
  border: 1px solid #212529;
  border-collapse: collapse;
  text-align: center;

  tr {
    transition: 0.1s all linear;

    td {
      padding: 12px;
      white-space: nowrap;
    }

    > td {
      border: 1px solid #212529;
    }

    &:hover {
      background-color: #ffcf00;
    }
  }

  thead {
    tr {
      font-weight: bold;
      background-color: #013c64;
      color: #f7f6fc;

      &:hover {
        background-color: #013c64;
      }
    }
  }
`;
