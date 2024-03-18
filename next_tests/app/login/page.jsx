'use client'

import '@/app/App.css';
import { auth2, authenticate, gotosignup } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  //const authenticatemode = auth2.bind();

  return (
    <div className='loginsection'>
      <h3>Questweaver D&D System</h3>
      <Form action={auth2}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Username' name="username" required={true}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' name="password" required={true}></Form.Control>
        </Form.Group>
        {/*
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        */}
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <Button variant='primary' type='submit'>Submit</Button>
        <Button variant='secondary' type='button' onClick={() => gotosignup()}>Sign Up</Button>
      </Form>
    </div>
  )
}