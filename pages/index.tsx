import { Button, Flex, Spinner } from '@chakra-ui/react'
import { useAuth, useSigninCheck } from 'reactfire'
import AuthForm from '../components/AuthForm'
import MyHead from '../components/MyHead'

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
        <MyHead />
        <Spinner />
      </Flex>
    )
  }

  if (data.signedIn) {
    return (
      <Flex h='100vh' w='100vw' justifyContent='center' py={5}>
        <MyHead />
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
    return (
      <>
        <MyHead />
        <AuthForm signIn={false} />
      </>
    )
  }
}
