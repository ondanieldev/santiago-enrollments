import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  margin-top: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #013c64;
  border-radius: 4px;

  strong {
    font-size: 1.25rem;
    margin-bottom: 12px;

    b {
      color: #4caf50;
    }
  }

  a {
    text-decoration: underline;
    margin-bottom: 6px;

    &:hover {
      color: ${shade(0.2, '#013C64')};
    }
  }
`;
