import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiLogOut } from 'react-icons/fi';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

interface IProps {
  hideGoBack?: boolean;
  hideGoHome?: boolean;
  hideSignOut?: boolean;
}

const IconBar: React.FC<IProps> = ({ hideGoBack, hideGoHome, hideSignOut }) => {
  const history = useHistory();
  const { signOut } = useAuth();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleGoHome = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  const handleLogOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      {!hideGoBack && (
        <button type="button" onClick={handleGoBack}>
          <FiArrowLeft size={25} color="#4caf50" />
        </button>
      )}

      {!hideGoHome && (
        <button type="button" onClick={handleGoHome}>
          <FiHome size={25} color="#013C64" />
        </button>
      )}

      {!hideSignOut && (
        <button type="button" onClick={handleLogOut}>
          <FiLogOut size={25} color="#f44336" />
        </button>
      )}
    </Container>
  );
};

export default IconBar;
