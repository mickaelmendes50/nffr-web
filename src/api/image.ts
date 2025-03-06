import { baseApiURL } from '@/api/config.ts'

export function getImage(archetypeId: number, imageId: number): string {
  // return `${baseApiURL}/static/${archetypeId}/${imageId}.jpg` // prod
  return `${baseApiURL}/${archetypeId}/${imageId}.jpg`
}
