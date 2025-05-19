import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import type { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { InterFont } from '~/assets/fonts';
import { currentSession } from '~/features/account/actions/current-session';

import { AccountProvider } from '~/features/account/providers/account-provider';

import '~/styles/global.css';
export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  width: 'device-width',
};

export const metadata: Metadata = {
  title: {
    default: 'Monorepo',
    template: '%s - Monorepo',
  },
  description: '',
  manifest: '/manifest.webmanifest',
  authors: [{ name: 'Bernardo Forcillo', url: 'https://bernardoforcillo.com' }],
  creator: 'Monorepo Developers',
  publisher: 'Bernardo Forcillo',
  robots: 'index, follow',
  generator: 'Monorepo Developers use Next.js',
  appleWebApp: {
    capable: true,
    title: 'Monorepo',
    statusBarStyle: 'black-translucent',
    startupImage: [],
  },
  applicationName: 'Monorepo',
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = async ({ children }) => {
  performance.mark('start');
  const locale = await getLocale();
  const messages = await getMessages();

  const Content: FC = async () => {
    const current = await currentSession();
    if (current === null || current === undefined) {
      return <>{children}</>;
    }

    return <AccountProvider session={current}>{children}</AccountProvider>;
  };

  performance.mark('end');
  console.log(performance.measure('request', 'start', 'end'));
  return (
    <html lang={locale}>
      <body
        className={`${InterFont.className} bg-white text-black antialiased dark:bg-zinc-900 dark:text-white`}
      >
        <ThemeProvider storageKey='theme' defaultTheme='system' enableSystem>
          <NextIntlClientProvider
            locale={locale}
            now={new Date()}
            messages={messages}
          >
            <Content />
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
