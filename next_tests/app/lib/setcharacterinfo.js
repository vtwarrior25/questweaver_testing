'use server'

export async function setCharacterHealth(playercharacterid, health) {
  console.log(`${playercharacterid} - ${health}`);
  return `Set health to ${health}`;
}