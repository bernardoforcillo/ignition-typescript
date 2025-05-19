import type { Metadata } from 'next';
import type { ReactNode } from 'react';
type Props = {
  params: Promise<{
    organizationId: string;
  }>;
  views: ReactNode;
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Layout({ views, children }: Props) {
  return (
    <>
      <div className='flex h-full w-full flex-col'>
        <div className='flex h-full w-full flex-row'>
          <div className='flex w-1/4'>{children}</div>
          <div className='flex w-3/4'>{views}</div>
        </div>
      </div>
    </>
  );
}
