import { getSession } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0/client'
import { GetServerSideProps } from 'next'

const AppPage = () => {
  const user = useUser()

  return (
    <div>
      <h1>Hello {user.user?.name}</h1>
      <p>Suas informações:</p>
      <pre>{JSON.stringify(user.user, null, 2)}</pre>
      <p>
        <a href="/api/auth/logout">Logout</a>
      </p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = getSession(context.req, context.res)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default AppPage
