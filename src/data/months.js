import moment from 'moment'

const months = () => {
  console.log('inside months function')
  const months = []
  const dateStart = moment()
  const dateEnd = moment().add(12, 'month')
  while (dateEnd.diff(dateStart, 'months') > 0) {
    months.push({
      month: dateStart.format('MMM YY'),
      id: dateStart.format('M'),
    })
    dateStart.add(1, 'month')
  }
  return months
}
export default months()
