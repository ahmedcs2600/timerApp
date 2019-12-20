import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {colors, gradientColor, simpleGradient} from '../helper/Colors';
import AppButton from './AppButton';
import LinearGradient from 'react-native-linear-gradient';
import AppTextInput from './AppTextInput';
import {hideKeyboard, isEmpty, isIos, showMessage} from '../helper/utils';

const hourSelected = 'hour';
const minutesSelected = 'minutes';
const secondsSelected = 'seconds';
const none = 'none';

export default class AppModal extends Component {

    state = {
        selectedType: 'minutes',
        timeVal : '',
        timerLabel : ''

    };

    _renderTimeBox = (label, isSelected, listener) => {
        return (
            <TouchableOpacity onPress={listener} style={{
                flexDirection: 'column',
                padding: 16,
                alignItems: 'center',
                flex: 1,

            }}>

                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={isSelected ? gradientColor : simpleGradient}
                                style={{
                                    width: 100, marginTop: 8,
                                    borderColor: colors.primaryColor,
                                    borderWidth: 1,
                                    borderRadius: 6,
                                }}>

                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 6,
                        paddingBottom: 6,
                        color: isSelected ? colors.whiteColor : colors.primaryColor,
                    }}>{label}</Text>

                </LinearGradient>

            </TouchableOpacity>
        );
    };

    _updateCheckBox(type) {
        this._focusTextInput()
        this.setState({
            selectedType: type,
        });
    }

    _focusTextInput = () => {
       // this.myInputRef.focus()
    };

    _renderContent = () => {

        const {selectedType} = this.state;

        return (
            <View style={styles.containerStyle}>
                <AppTextInput
                    placeholder={'Enter Timer Label'}
                    onChangeText={text => this.setState({timerLabel : text})}
                />


                <AppTextInput
                    placeholder={'Enter Time'}
                    onChangeText={text => this.setState({timeVal : text})}
                    ref={(input) => { this.myInputRef = input; }}
                    keyboardType={'number-pad'}
                    customTextInputStyle={{
                        color: colors.primaryColor,
                        fontSize: 45,
                        fontWeight: 'bold',
                    }}/>

                <View style={{flexDirection: 'row'}}>
                    {this._renderTimeBox('Hours', selectedType === hourSelected, () => {
                        this._updateCheckBox(hourSelected)
                    })}
                    {this._renderTimeBox('Minutes', selectedType === minutesSelected, () => {
                        this._updateCheckBox(minutesSelected)
                    })}
                    {this._renderTimeBox('Seconds', selectedType === secondsSelected, () => {
                        this._updateCheckBox(secondsSelected)
                    })}
                </View>


                <AppButton onPress={() => {
                    this._onSubmitPress()


                }}/>
            </View>
        );
    };


    _onSubmitPress() {
        const {onSubmitButton} = {...this.props};
        const {timeVal,timerLabel,selectedType} = this.state;


        if(isEmpty(timerLabel)){
            showMessage("Please Enter Timer label");
            return
        }
        else if(isEmpty(timeVal)){
            showMessage("Please enter time");
            return
        }

        let hour = 0;
        let min = 0;
        let seconds = 0;

        if(selectedType === hourSelected){
            hour = parseInt(timeVal) * 60 * 60
        } else if(selectedType === minutesSelected){
            min = parseInt(timeVal) * 60
        }else if(selectedType === secondsSelected){
            seconds = parseInt(timeVal)
        }


        let totalTime = hour + min + seconds;


        hideKeyboard();
        if(onSubmitButton != null){
            onSubmitButton(totalTime,timerLabel)
        }

    }

    _renderIosView() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                {
                    this._renderContent()
                }

            </KeyboardAvoidingView>

        );
    }

    render() {


        if (isIos) {
            return this._renderIosView();
        }


        return (
            this._renderContent()
        );

    }
}

export const styles = StyleSheet.create({
    containerStyle: {backgroundColor: '#fff', flexDirection: 'column', padding: 16},
});
