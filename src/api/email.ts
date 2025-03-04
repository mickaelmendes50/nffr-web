import { baseApiURL } from '@/api/config.ts'

export const sendEmail = async (profile: number[], name: string) => {
  return (await fetch(`${baseApiURL}/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      profile,
    })
  })).json()
}
