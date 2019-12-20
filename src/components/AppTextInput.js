import React, {Component} from 'react';
import {TextInput, View,StyleSheet} from 'react-native';
import {colors} from '../helper/Colors';

export default class AppTextInput extends Component {
    render() {
        return (
            <TextInput
                {...this.props}
                underlineColorAndroid="transparent"
                style={[styles.textInputStyle,this.props.customTextInputStyle]}
            />
        );
    }
}
const styles = StyleSheet.create({
    textInputStyle : {width: '100%',textAlign: 'center',color: colors.primaryColor,padding: 12,fontSize : 18,fontWeight: 'bold'}
})
