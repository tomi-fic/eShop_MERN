import moment from 'moment'

export const getFormattedDate = (date) => {
  return moment(date).format('DD.MM.YYYY')
}

export const getFormattedDatetime = (date) => {
  return moment(date).format('DD.MM.YYYY hh:mm:ss')
}

export const getFormattedTime = (date) => {
  return moment(date).format('hh:mm:ss')
}
