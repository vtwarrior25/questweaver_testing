'use server'

import { tempAuth } from '@/app/lib/tempauth';
import { redirect } from 'next/navigation';

export async function authenticate(formdata) {
  'use server'
  try {
    console.log(formdata.get('username'));
    await tempAuth(formdata)
    .then((result) => {
      console.log(result);
      if (result == true) {
        console.log('this should redirect beans');
        redirect('/main');
      } else {
        console.log("This shouldn't redirect");
        redirect('/login');
      }
    }).catch(() => {
      console.log("This shouldn't redirect 2");
      redirect('/login');
    });
  } catch (error) {
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
  
}