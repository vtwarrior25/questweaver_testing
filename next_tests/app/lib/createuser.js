
export async function createuser(formdata) {
  // Insert username and password into db
  console.log(`${formdata.get('username')} - ${formdata.get('password')}`);
  return true;
}