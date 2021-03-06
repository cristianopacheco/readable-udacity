import moment from 'moment'

export const timeStampToHuman = timestamp => {
  return moment
    .unix(timestamp / 1000)
    .format('YYYY-MM-DD HH:mm')
}

export const timeStampToNow = timestamp => {
  return moment
    .unix(timestamp / 1000)
    .fromNow()
}
