'use client';

import { FC, createContext } from 'react';

import type { auth } from '@monorepo/core/controllers/better-auth';
export type CurrentSessionContextType = typeof auth.$Infer.Session;

export const CurrentSessionContext = createContext<CurrentSessionContextType>(
  {} as CurrentSessionContextType,
);
