import { User } from './user';

export interface PostScheme {
  lvl?: string
  trophies?: string
  brawlers?: string
  legendary?: string
  gems?: string
  gold?: string
  price?: string
}

export interface GetterPost {
  data: PostScheme
  user: User
}