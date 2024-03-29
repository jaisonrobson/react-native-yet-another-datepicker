import React, { createContext, useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import hoistNonReactStatic from 'hoist-non-react-statics'
import moment from 'moment'

import { getDisplayName } from '../util/hoc'
import {
    isSameDay,
    isSameMonth,
    getMonthFirstDate,
} from '../util/date'

export const CalendarContext = createContext({})

export const withCalendarConsumer = (WrappedComponent) => {
    const WithCalendarConsumer = (props) => (
        <CalendarContext.Consumer>
            {(calendarProps) => <WrappedComponent {...props} calendarProps={calendarProps} />}
        </CalendarContext.Consumer>
    )

    hoistNonReactStatic(WithCalendarConsumer, WrappedComponent)

    WithCalendarConsumer.displayName = `WithCalendarConsumer(${getDisplayName(WrappedComponent)})`

    return WithCalendarConsumer
}

export const withCalendarProvider = (WrappedComponent) => {
    const WithCalendarProvider = ({
        initialValue = moment().toDate(),
        onChangeDate = () => { },
        ...props
    }) => {
        const parentProps = {
            selectedDate: initialValue,
            selectedMonth: getMonthFirstDate(initialValue),
            screenData: Dimensions.get('window').width,
            ...props
        }

        const [state, setState] = useState(parentProps)

        const onChangeScreenData = () => setState(prevState => ({
            ...prevState,
            screenData: Dimensions.get('window').width,
        }))

        const onChangeSelectedDate = (date) => {
            setState({
                ...state,
                selectedDate: !isSameDay(state.selectedDate, date) ? date : state.selectedDate,
            })

            onChangeDate(date)
        }

        const onChangeSelectedMonth = (date) => {
            const firstMonthDate = getMonthFirstDate(date)

            setState({
                ...state,
                selectedMonth: !isSameMonth(state.selectedMonth, firstMonthDate) ? firstMonthDate : state.selectedMonth
            })
        }

        useEffect(() => {
            var subscription = Dimensions.addEventListener('change', onChangeScreenData)

            return () => { subscription.remove() }
        })


        const value = {
            ...state,
            onChangeSelectedDate,
            onChangeSelectedMonth,
        }

        return (
            <CalendarContext.Provider value={value}>
                <WrappedComponent {...props} />
            </CalendarContext.Provider>
        )
    }

    hoistNonReactStatic(WithCalendarProvider, WrappedComponent)

    WithCalendarProvider.displayName = `WithCalendarProvider(${getDisplayName(WrappedComponent)})`

    return WithCalendarProvider
}