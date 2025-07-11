import { Outfit } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '@/context/AppContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

export const metadata = {
  title: 'QuickCart',
  description: 'E-Commerce with Next.js ',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased text-gray-700`}
        >
          <Toaster />
          <Provider store={store}>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
