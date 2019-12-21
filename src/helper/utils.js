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

export const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
        value = '0' + value;
    }
    return value;
}

export const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}
