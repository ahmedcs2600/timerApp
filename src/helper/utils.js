import React, {Platform,Keyboard,ToastAndroid,Alert} from 'react-native';

export const isIos = (Platform.OS === "ios");

export const  hideKeyboard =  () => {
    Keyboard.dismiss()
}

export const showMessage = (message, isSuccess = false) => {

    if (Platform.OS == 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
        Alert.alert(
            isSuccess ? "Success" : "Error",
            message
        );
    }

};

export const isEmpty = (str) => {
    return !str.trim().length;
}
