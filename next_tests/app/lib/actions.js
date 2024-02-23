'use server'

import { tempAuth } from '@/app/lib/tempauth';
import { redirect } from 'next/navigation';

export async function authenticate(formdata) {
  let redirecturl = '../login';
  try {
    console.log(formdata.get('username'));
    await tempAuth(formdata)
    .then((result) => {
      console.log(result);
      console.log('We are in the good part');
      if (result == true) {
        console.log('this should redirect beans');
        //redirect('/main');
        redirecturl = '../main';
      } else {
        console.log("This shouldn't redirect");
        //redirect('/login');
      }});
  } catch (error) {
    console.log('We are in the error place');
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
  console.log(redirecturl);
  redirect(redirecturl);
}

export async function signUp(formdata) {
  await createUser(formdata)
  .then((result) => {
    if (results === true) {
      // Redirect to character picker
      redirect('/main');
    } else {
      redirect('/signUp');
    }});
}