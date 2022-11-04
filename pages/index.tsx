import { Button, Flex, Spinner } from '@chakra-ui/react'
import { useAuth, useSigninCheck } from 'reactfire'
import AuthForm from '../components/AuthForm'

export default function Home() {
  const { data, status } = useSigninCheck()
  const auth = useAuth()

  if (status === 'loading') {
    return (
      <Flex
        h='100vh'
        w='100vw'
        justifyContent='center'
        alignItems='center'
      >
        <Spinner />
      </Flex>
    )
  }

  if (data.signedIn) {
    return (
      <Flex h='100vh' w='100vw' justifyContent='center' py={5}>
        <Button
          colorScheme='red'
          onClick={() => {
            auth.signOut()
          }}
        >
          Sign Out
        </Button>
      </Flex>
    )
  } else {
    return <AuthForm signIn={false} />
  }
}
