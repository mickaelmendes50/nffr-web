import { baseApiURL } from '@/api/config.ts'

export function getImage(archetypeId: number, imageId: number): string {
  return `${baseApiURL}/static/${archetypeId}/${imageId}.JPG`
}
