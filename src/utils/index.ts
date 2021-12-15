const compareSortValues = (a: string, b: string) => a.localeCompare(b) > 0 ? 1 : -1

const checkIfSortedByTerm = (list: any[], sortTerm: string) => list.every((value: any, index, array) => !index || array[index - 1][sortTerm] >= value[sortTerm])

export const customSort = (list: any[], sortTerm: string) => {
  if (list.length > 0 && sortTerm in list[0]) {
    return !checkIfSortedByTerm(list, sortTerm)
      ? list.sort((a: any, b: any) => compareSortValues(a[sortTerm], b[sortTerm]))
      : list.reverse()
  }

}


export const REGEX = {
  // For login
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"/,
  // For sign up
  emailStronger: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  username: /^[a-zA-Z0-9]{3,}/,
  // min 6 chars, at least 1 letter & 1 number & 1 special character
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/

}