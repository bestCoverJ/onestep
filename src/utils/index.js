const getWeekDay = (weekNum) => {
  let week
  switch (weekNum) {
    case 'Monday': {
      week = '星期一'
      break
    }
    case 'Tuesday': {
      week = '星期二'
      break
    }
    case 'Wednesday': {
      week = '星期三'
      break
    }
    case 'Thursday': {
      week = '星期四'
      break
    }
    case 'Friday': {
      week = '星期五'
      break
    }
    case 'Saturday': {
      week = '星期六'
      break
    }
    case 'Sunday': {
      week = '星期日'
      break
    }
    default: {
      week = ''
      break
    }
  }
  return week
}

export { getWeekDay }
