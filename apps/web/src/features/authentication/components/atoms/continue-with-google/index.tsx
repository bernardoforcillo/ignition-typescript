'use client';

import { type FC, useState } from 'react';
import { auth } from '~/scripts/better-auth';

const ContinueWithGoogle: FC = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsLoading(true);
    auth.signIn.social({
      provider: 'google',
    });
  };

  return (
    <button type='button' onClick={handleClick}>
      {IsLoading ? 'loading' : 'Continue With Google'}
    </button>
  );
};
export default ContinueWithGoogle;
