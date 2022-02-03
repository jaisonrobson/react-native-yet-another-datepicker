import moment from "moment"

//Date Return
export const getWeekFirstDate = (date) => moment(date).day(0).toDate()
export const getMonthFirstDate = (date) => moment(date).date(1).toDate()
export const getPreviousMonthDate = (date) => moment(date).month(moment(date).month() - 1).toDate()
export const getNextMonthDate = (date) => moment(date).month(moment(date).month() + 1).toDate()

//Boolean return
export const isSameDay = (date1, date2) => moment(date1).isSame(date2, 'day')
export const isSameMonth = (date1, date2) => moment(date1).isSame(date2, 'month')