
export async function tempAuth(formdata) {
  if (formdata.get('username') === 'james1' && formdata.get('password') === 'beans1') {
    console.log('Good');
    return true;
  } else {
    console.log('not good');
    return false;
  }
}