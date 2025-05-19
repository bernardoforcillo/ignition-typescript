import Link from 'next/link';
import type { FC } from 'react';
import { currentSession } from '~/features/account/actions/current-session';

const Page: FC = async () => {
  const current = await currentSession();
  if (current === null || current === undefined) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='font-bold text-4xl'>You are un authenticated</h1>
        <p className='mt-4 text-lg'>This is a simple web application.</p>
        <Link href={'/auth'} className='mt-4 text-blue-500 text-lg'>
          Go to Auth Page
        </Link>
      </div>
    );
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='font-bold text-4xl'>Welcome to the Web App</h1>
      <p className='mt-4 text-lg'>This is a simple web application.</p>
    </div>
  );
};

export default Page;
