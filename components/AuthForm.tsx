import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaTractor } from 'react-icons/fa'
import { useAuth } from 'reactfire'

export default function AuthForm({ signIn }: { signIn: boolean }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const auth = useAuth()
  const router = useRouter()

  return (
    <Container maxW='container.sm' py={5}>
      <form
        onSubmit={async e => {
          e.preventDefault()

          setLoading(true)
          try {
            if (signIn) {
              await signInWithEmailAndPassword(auth, email, password)
            } else {
              await createUserWithEmailAndPassword(auth, email, password)
            }
            router.replace('/')
          } catch (e: any) {
            toast({
              title: 'Error',
              status: 'error',
              description: e.message
            })
          } finally {
            setLoading(false)
          }
        }}
      >
        <Stack spacing={5}>
          <VStack align='center' spacing={0}>
            <FaTractor size={72} color='#183052' />
            <Heading textAlign='center'>FarmHub</Heading>
          </VStack>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>{' '}
              <Input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='password'
              />
            </FormControl>

            <Button isDisabled={loading} isLoading={loading} type='submit'>
              {signIn ? 'Sign In' : 'Sign Up'}
            </Button>
            <Flex justify='space-between'>
              {signIn ? (
                <AuthLink href='sign-up' />
              ) : (
                <AuthLink href='sign-in' />
              )}
              {signIn && <ForgotPassword email={email} />}
            </Flex>
          </Stack>
        </Stack>
      </form>
    </Container>
  )
}

const ForgotPassword = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  return (
    <Button
      color='blue.600'
      variant='link'
      isLoading={loading}
      isDisabled={loading}
      onClick={async () => {
        setLoading(true)
        try {
          sendPasswordResetEmail(getAuth(), email)
          toast({
            status: 'success',
            title: 'Success',
            description: 'Reset link sent. Please check your inbox.'
          })
        } catch (e: any) {
          toast({
            status: 'error',
            title: 'Error',
            description: e.message
          })
        } finally {
          setLoading(false)
        }
      }}
    >
      Forgot password?
    </Button>
  )
}

const AuthLink = ({ href }: { href: 'sign-up' | 'sign-in' }) => {
  return (
    <HStack spacing={1}>
      <Text size='sm'>
        {href === 'sign-up'
          ? "Don't have an account?"
          : 'Already have an account?'}
      </Text>
      <NextLink href={href} passHref>
        <Button variant='link' color='blue.600'>
          {href === 'sign-up' ? 'Sign Up' : 'Sign In'}
        </Button>
      </NextLink>
    </HStack>
  )
}
