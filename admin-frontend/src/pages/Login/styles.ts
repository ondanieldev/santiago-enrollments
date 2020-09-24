import styled from 'styled-components';

import Logo from '../../assets/images/logo.png';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${Logo});
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.2);

  form {
    margin-top: 24px;

    div {
      & + div {
        margin-top: 12px;
      }
    }

    button {
      margin-top: 12px;
      width: 100%;
    }
  }
`;
