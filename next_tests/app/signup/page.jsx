'use client'

import '@/app/App.css';
import '@/app/login/login.css'
import { createuser} from '@/app/lib/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Page() {
  const [errorMessage, dispatch] = useFormState(createuser, undefined)
  const authenticatemode = createuser.bind(null);
  const router = useRouter();

  return (
    <div className='userAuthForm loginSection'>
      <h3>Create User</h3>
      <Form action={authenticatemode}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Username' name="username" required={true}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' name="password" required={true}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='Password' name="password2" required={true}></Form.Control>
        </Form.Group>
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <Button onClick={() => router.push('../login')} variant='primary' type='submit'>Submit</Button>
        <Button onClick={() => router.push('../login')}>Back to Login</Button>
      </Form>
    </div>
  )
}