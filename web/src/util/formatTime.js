import moment from 'moment'
moment.locale('zh-cn')
const formatTime = {
  getTime: (date) => {
    return moment(date).format('YYYY年MM月DD日 hh:mm')
  }
}
export default formatTime
