import React, { useState, useEffect } from 'react'
import moment from 'moment'

import ModalButton from './ModalButton'
import Calendar from './Calendar'

const DatePicker = ({ date, onChangeDate }) => (
    <Calendar
        initialValue={date}
        onChangeDate={onChangeDate}
        tableStyle={{ marginBottom: 10, padding: 0 }}
    />
)

const DatePickerModalButton = ({
    date: dateProp = moment().toDate(),
    onChangeDate = () => { },
    ...props
}) => {
    const [date, setDate] = useState(dateProp)
    const [calendarDate, setCalendarDate] = useState(date)

    const onChangeCalendarDate = (propDate) => {
        setCalendarDate(prevState => prevState !== propDate ? propDate : prevState)
    }

    const onConfirm = () => {
        setDate(prevState => prevState !== calendarDate ? calendarDate : prevState)

        onChangeDate(calendarDate)

        return true
    }

    useEffect(() => {
        setDate(prevState => prevState !== dateProp ? dateProp : prevState)

        onChangeCalendarDate(dateProp)
    }, [dateProp])

    return (
        <ModalButton
            onConfirm={onConfirm}
            {...props}
        >
            <ModalButton.Content>
                {() => (
                    <ModalButton.Table>
                        <ModalButton.Row>
                            <DatePicker date={date} onChangeDate={onChangeCalendarDate} />
                        </ModalButton.Row>

                        <ModalButton.Row>
                            <ModalButton.Cell>
                                <ModalButton.CancelButton />
                            </ModalButton.Cell>

                            <ModalButton.Cell>
                                <ModalButton.ConfirmButton />
                            </ModalButton.Cell>
                        </ModalButton.Row>
                    </ModalButton.Table>
                )}
            </ModalButton.Content>
        </ModalButton>
    )
}

export default DatePickerModalButton