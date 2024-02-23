'use client'

import { signUp } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const authenticatemode = authenticate.bind(null);

  return (
    <form action={authenticatemode}>
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