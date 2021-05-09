import moment from 'moment'

const MONTHS = () => {
  console.log('inside months function')
  const months = []
  const dateStart = moment()
  const dateEnd = moment().add(12, 'month')
  while (dateEnd.diff(dateStart, 'months') > 0) {
    months.push({
      month: dateStart.format('MMM YY'),
      id: dateStart.format('M'),
    })
    console.log(months)
    dateStart.add(1, 'month')
  }
  console.log(months)
  return months
}
export default MONTHS()
