'use client';

import type { FC } from 'react';
import {
  CurrentSessionContext,
  type CurrentSessionContextType,
} from '~/features/account/contexts/current-account-context';

type Props = {
  children: React.ReactNode;
  session: CurrentSessionContextType;
};

export const AccountProvider: FC<Props> = ({ children, session }) => {
  return (
    <CurrentSessionContext.Provider value={session}>
      {children}
    </CurrentSessionContext.Provider>
  );
};
