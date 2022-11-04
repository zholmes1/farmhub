import Head from 'next/head'

export default function MyHead() {
  return (
    <Head>
      <title>FarmHub</title>
      <meta name='og:image' content='/share.png' />
      <meta
        name='og:description'
        content='Where Agriculture Meets Technology'
      />
      <meta name='image' content='/share.png' />
      <meta
        name='description'
        content='Where Agriculture Meets Technology'
      />
    </Head>
  )
}
