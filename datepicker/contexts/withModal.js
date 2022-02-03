import React, { createContext, useState, useEffect } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const ModalContext = createContext({})

export const withModalConsumer = (WrappedComponent) => {
    const WithModalConsumer = (props) => (
        <ModalContext.Consumer>
            {(modalProps) => <WrappedComponent {...props} modalProps={modalProps} />}
        </ModalContext.Consumer>
    )

    hoistNonReactStatic(WithModalConsumer, WrappedComponent)

    WithModalConsumer.displayName = `WithModalConsumer(${getDisplayName(WrappedComponent)})`

    return WithModalConsumer
}

export const withModalProvider = (WrappedComponent) => {
    const WithModalProvider = ({
        openModalButtonStyle = {},
        openModalButtonContent = undefined,
        onOpen = () => { },
        onCancel = () => { },
        onConfirm = () => true,
        modalVisible = false,
        ...props
    }) => {
        const parentProps = {
            openModalButtonStyle,
            openModalButtonContent,
            onOpen,
            onCancel,
            onConfirm,
            modalVisible,
        }

        const [state, setState] = useState(parentProps)

        const openModal = () => setState({
            ...state,
            modalVisible: true,
        })

        const closeModal = () => setState({
            ...state,
            modalVisible: false,
        })

        const onPressOpenModalButton = () => {
            onOpen()

            openModal()
        }

        const onPressCancelModalButton = () => {
            onCancel()

            closeModal()
        }

        const onPressConfirmModalButton = () => {
            const result = onConfirm()

            if (result)
                closeModal()
        }

        const value = {
            ...state,
            closeModal,
            openModal,
            onPressOpenModalButton,
            onPressCancelModalButton,
            onPressConfirmModalButton,
        }

        useEffect(() => {
            setState(prevState => ({ ...prevState, onConfirm, openModalButtonContent }))
        }, [onConfirm, openModalButtonContent])

        return (
            <ModalContext.Provider value={value}>
                <WrappedComponent {...props} />
            </ModalContext.Provider>
        )
    }

    hoistNonReactStatic(WithModalProvider, WrappedComponent)

    WithModalProvider.displayName = `WithModalProvider(${getDisplayName(WrappedComponent)})`

    return WithModalProvider
}