'use server';

import { auth } from '@monorepo/core/controllers/better-auth';
import { headers } from 'next/headers';

type Session = typeof auth.$Infer.Session;

export const currentSession = async (): Promise<Session | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === null) {
    return null;
  }

  return session;
};

export const currentSessionWithRedirect = async (): Promise<Session> => {
  const session = await currentSession();

  if (session === null) {
    throw new Error('Session not found');
  }

  return session;
};
