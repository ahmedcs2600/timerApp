import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {colors, gradientColor} from '../helper/Colors';
import LinearGradient from "react-native-linear-gradient";

export default class AppButton extends Component {
    render() {
        return (
            <TouchableOpacity {...this.props}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradientColor} style={styles.containerStyle}>

                    <Text style={styles.textStyle}>
                        START
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

        );
    }
}
const styles = StyleSheet.create({
    containerStyle : {
        padding : 12,
        alignItems : 'center',
        borderRadius : 14
    },
    textStyle : {
        color : colors.whiteColor,
        fontSize : 18

    }
});
