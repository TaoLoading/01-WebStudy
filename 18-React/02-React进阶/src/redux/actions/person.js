import { ADD_PERSON } from '../constant'

export const addPersonAction = (data) => {
  return { type: ADD_PERSON, data }
}
