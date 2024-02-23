'use client'

import { authenticate } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import './login.css';

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const authenticatemode = authenticate.bind(null);

  return (
    <div className='loginsection'>
      <h3>Welcome to Questweaver login page</h3>
      <form action={authenticatemode}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <LoginButton />
      </form>
    </div>
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