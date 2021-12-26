import moment from 'moment'
import 'moment/locale/es'

export const REGEX = {
  // For login
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"/,
  // For sign up
  emailStronger: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  username: /^[a-zA-Z0-9]{3,}/,
  // min 6 chars, at least 1 letter & 1 number & 1 special character
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
  // eslint-disable-next-line
  urlFile: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
}


export const formatDateFromNow = (time: any, milliseconds?: boolean) => {

  try {
    const timeRect = !isNaN(time)
      ? milliseconds
        ? parseInt(time) * 1000
        : parseInt(time)
      : 0

    return moment(timeRect).fromNow()

  } catch (error) {
    console.warn(error)
  }
}

export const formatFullDate = (time: any) => {
  try {
    return moment(time).format('LLLL')
  }
  catch (err) {
    console.warn(err)
  }
}