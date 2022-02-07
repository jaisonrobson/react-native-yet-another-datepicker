import React from 'react'
import moment from 'moment'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import { withCalendarProvider, withCalendarConsumer } from '../contexts/withCalendar'
import { getWeekFirstDate, getPreviousMonthDate, getNextMonthDate } from '../util/date'
import Table from "./layout/Table"
import Row from "./layout/Row"
import Cell from "./layout/Cell"

const PreviousSign = () => <Text>{'<'}</Text>
const NextSign = () => <Text>{'>'}</Text>
const TopItem = withCalendarConsumer(
    ({ style = {}, calendarProps: { screenData }, ...props }) =>
        <View style={{ ...styles.topItem, ...style, width: Math.floor(screenData / 3) }} {...props} />
)
const TopItemLabel = ({ style = {}, ...props }) => <Text style={{ ...styles.topItemLabel, ...style }} {...props} />
const HeaderItem = withCalendarConsumer(
    ({ style = {}, calendarProps: { screenData }, ...props }) =>
        <View style={{ ...styles.headerItem, ...style, width: Math.floor(screenData / 10) }} {...props} />
)
const HeaderItemLabel = ({ style = {}, ...props }) => <Text style={{ ...styles.headerItemLabel, ...style }} {...props} />
const TouchableItem = withCalendarConsumer(
    ({ style = {}, calendarProps: { screenData }, ...props }) =>
        <TouchableOpacity style={{ ...styles.touchableItem, ...style, width: Math.floor(screenData / 10) }} {...props} />
)
const TouchableItemLabel = ({ style = {}, ...props }) => <Text style={{ ...styles.touchableItemLabel, ...style }} {...props} />
const HR = ({ style = {}, ...props }) => <View style={{ ...styles.hr, ...style }} {...props} />
const weekDays = [...Array.from(Array(7).keys())]

const DayButton = withCalendarConsumer(({
    calendarProps: {
        onChangeSelectedDate,
        selectedDate,
        notMonthlyTouchableItemLabelStyle = {},
        touchableItemLabelStyle: labelStyleProp = {},
        touchableItemStyle: itemStyle = {},
    },
    day,
}) => {
    const onPress = () => onChangeSelectedDate(day)
    const touchableItemStyle = moment(day).isSame(selectedDate, 'day') && styles.selectedTouchableItem
    const labelStyle = !moment(day).isSame(selectedDate, 'month') && { color: '#b3b3b3', ...notMonthlyTouchableItemLabelStyle }

    return (
        <TouchableItem onPress={onPress} style={{ ...itemStyle, ...touchableItemStyle }}>
            <TouchableItemLabel style={{ ...labelStyleProp, ...labelStyle }}>{moment(day).format('DD')}</TouchableItemLabel>
        </TouchableItem>
    )
})

const MonthDisplay = withCalendarConsumer(({
    calendarProps: {
        topItemStyle,
        topItemLabelStyle,
        selectedMonth,
    },
}) => (
    <TopItem style={topItemStyle}>
        <TopItemLabel style={topItemLabelStyle}>
            {moment(selectedMonth).format('MMMM YYYY')}
        </TopItemLabel>
    </TopItem>
))

const PreviousMonthButton = withCalendarConsumer(({
    calendarProps: {
        onChangeSelectedMonth,
        previousMonthButtonContent = <PreviousSign />,
        selectedMonth,
        previousMonthButtonStyle
    },
}) => {
    const onPressPreviousMonth = () => onChangeSelectedMonth(getPreviousMonthDate(selectedMonth))

    return <TouchableItem style={previousMonthButtonStyle} onPress={onPressPreviousMonth}>{previousMonthButtonContent}</TouchableItem>
})

const NextMonthButton = withCalendarConsumer(({
    calendarProps: {
        onChangeSelectedMonth,
        nextMonthButtonContent = <NextSign />,
        selectedMonth,
        nextMonthButtonStyle,
    },
}) => {
    const onPressNextMonth = () => onChangeSelectedMonth(getNextMonthDate(selectedMonth))

    return <TouchableItem style={nextMonthButtonStyle} onPress={onPressNextMonth}>{nextMonthButtonContent}</TouchableItem>
})

const ControlsRow = ({ style }) => (
    <Row style={style}>
        <Cell><MonthDisplay /></Cell>

        <Cell style={{ flexGrow: 0 }}>
            <PreviousMonthButton />
        </Cell>

        <Cell style={{ flexGrow: 0 }}>
            <NextMonthButton />
        </Cell>
    </Row>
)

const HeaderRow = () => (
    <Row>
        {
            weekDays
                .map((weekDayNumber) => (
                    <Cell key={weekDayNumber}>
                        <HeaderItem><HeaderItemLabel>{moment().day(weekDayNumber).format("ddd").toUpperCase()[0]}</HeaderItemLabel></HeaderItem>
                    </Cell>
                ))
        }
    </Row>
)

const HRRow = ({ style }) => (
    <Row style={{ ...style, marginVertical: 8 }}>
        <HR />
    </Row>
)

const DaysRow = ({ rowFirstDay }) => (
    <Row>
        {
            weekDays
                .map((weekDayNumber) => (
                    <Cell key={weekDayNumber}>
                        <DayButton day={moment(rowFirstDay).add(weekDayNumber, 'd').toDate()} />
                    </Cell>
                ))
        }
    </Row>
)

const DaysRows = withCalendarConsumer(({ calendarProps: { selectedMonth } }) =>
    [...Array.from(Array(6).keys())]
        .map((rowStartingDayNumber) => {
            const rowFirstDay = getWeekFirstDate(moment(selectedMonth).add(rowStartingDayNumber * 7, 'd').toDate())

            return <DaysRow key={rowStartingDayNumber} rowFirstDay={rowFirstDay} />
        })
)

const Calendar = ({ calendarProps: { tableStyle } }) => (
    <Table style={tableStyle}>
        <ControlsRow />

        <HRRow />

        <HeaderRow />

        <HRRow />

        <DaysRows />

        <HRRow />
    </Table>
)

const styles = StyleSheet.create({
    headerItem: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 20,
        height: 35,
    },
    headerItemLabel: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    topItem: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 20,
        height: 35,
    },
    topItemLabel: {
        fontSize: 16,
    },
    touchableItem: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 20,
        height: 35,
    },
    touchableItemLabel: {
        color: 'black',
    },
    selectedTouchableItem: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 20,
        height: 35,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'black',
    },
    hr: {
        flex: 1,
        flexGrow: 1,
        borderColor: '#DDDDDD',
        borderBottomWidth: 1,
    },
})

export default withCalendarProvider(withCalendarConsumer(Calendar))
