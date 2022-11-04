import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme
} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import type { AppProps } from 'next/app'
import React from 'react'
import {
  AuthProvider,
  FirebaseAppProvider,
  useFirebaseApp
} from 'reactfire'
import '../styles/globals.css'

const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'whatsapp' })
)

const firebaseConfig = {
  apiKey: 'AIzaSyATcXc5srePPJrSgiSufb8IS3Xnz7Gjgl4',
  authDomain: 'farm-hub-1.firebaseapp.com',
  projectId: 'farm-hub-1',
  storageBucket: 'farm-hub-1.appspot.com',
  messagingSenderId: '1098148833682',
  appId: '1:1098148833682:web:4a7ba8331b9464b94bb94b',
  measurementId: 'G-MJ4P30LWRV'
}

const Providers: React.FC<{ children: any }> = ({ children }) => {
  const app = useFirebaseApp()
  const auth = getAuth(app)

  return <AuthProvider sdk={auth}>{children}</AuthProvider>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </FirebaseAppProvider>
    </ChakraProvider>
  )
}
