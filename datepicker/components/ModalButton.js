import React from "react";
import { Modal as ReactNativeModal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { withModalProvider, withModalConsumer } from '../contexts/withModal'
import Table from "./layout/Table"
import Row from "./layout/Row"
import Cell from "./layout/Cell"

const DefaultOpenModalButtonContent = () => <Text style={styles.textStyle}>Abrir modal</Text>
const DefaultCancelModalButtonContent = () => <Text style={styles.textStyle}>Cancelar</Text>
const DefaultConfirmModalButtonContent = () => <Text style={styles.textStyle}>Salvar</Text>

const CancelModalButton = withModalConsumer(({
    modalProps: {
        onPressCancelModalButton,
    },
    style,
    children = <DefaultCancelModalButtonContent />,
}) => (
    <TouchableOpacity
        style={[styles.cancelModalButton, style]}
        onPress={onPressCancelModalButton}
    >
        {children}
    </TouchableOpacity>
))

const ConfirmModalButton = withModalConsumer(({
    modalProps: {
        onPressConfirmModalButton,
    },
    style,
    children = <DefaultConfirmModalButtonContent />,
}) => (
    <TouchableOpacity
        style={[styles.confirmModalButton, style]}
        onPress={onPressConfirmModalButton}
    >
        {children}
    </TouchableOpacity>
))

const OpenModalButton = withModalConsumer(({
    modalProps: {
        onPressOpenModalButton,
        openModalButtonStyle,
        openModalButtonContent = <DefaultOpenModalButtonContent />,
    },
}) => (
    <TouchableOpacity
        style={[styles.openModalButton, openModalButtonStyle]}
        onPress={onPressOpenModalButton}
    >
        {openModalButtonContent}
    </TouchableOpacity>
))

const Board = ({ boardStyle, ...props }) => <View style={[styles.board, boardStyle]} {...props} />
const ModalBackground = ({ modalBackgroundStyle, ...props }) => <View style={[styles.modalBackground, modalBackgroundStyle]} {...props} />

const ModalContent = withModalConsumer(({
    children,
    modalProps,
}) => (
    <Board>
        {children(modalProps)}
    </Board>
))

const ModalButton = ({
    modalProps: {
        onPressCancelModalButton,
        modalVisible,
    },
    children,
}) => (
    <View>
        <ReactNativeModal
            animationType="fade"
            transparent={false}
            visible={modalVisible}
            statusBarTranslucent={true}
            presentationStyle="fullScreen"
            onRequestClose={onPressCancelModalButton}
        >
            <ModalBackground>
                {children}
            </ModalBackground>
        </ReactNativeModal>

        <OpenModalButton />
    </View>
)

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#00000070',
    },
    board: {
        // margin: 20,
        // backgroundColor: "white",
        backgroundColor: "red",

        borderRadius: 7,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    openModalButton: {
        minWidth: 100,
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    cancelModalButton: {
        minWidth: 100,
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    confirmModalButton: {
        minWidth: 100,
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
});

ModalButton.CancelButton = CancelModalButton
ModalButton.ConfirmButton = ConfirmModalButton
ModalButton.Table = Table
ModalButton.Row = Row
ModalButton.Cell = Cell
ModalButton.Content = ModalContent

export default withModalProvider(withModalConsumer(ModalButton));