'use client'

import '@/app/App.css';
import { signup } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'

export default function Page() {
  const [errorMessage, dispatch] = useFormState(signup, undefined)
  const authenticatemode = signup.bind(null);

  return (
    <form className='userAuthForm' action={authenticatemode}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <LoginButton />
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button aria-disabled={pending} type="submit">
      Login
    </button>
  )
}