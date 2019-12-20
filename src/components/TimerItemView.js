import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {colors, gradientColor} from '../helper/Colors';


const pauseIcon = require('./../assets/pause_icon.png');
const deleteIcon = require('./../assets/delete_icon.png');
const playIcon = require('./../assets/play_icon.png');

export default class TimerItemView extends Component {


    constructor(props){
        super(props)
        this.state = { time: {}, seconds: 0,isRunning : false };
        this.timer = 0;


        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }


    secondsToTime(secs){
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



    componentDidMount() {
       const {data} = {...this.props}

        let timeLeftVar = this.secondsToTime(data.timeVal);
        this.setState({
            time: timeLeftVar,
            seconds : data.timeVal,
            isRunning : data.isRunning
        },() => {

            if(data.isRunning){
                this.startTimer()
            }
        });
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }


    componentWillUnmount(): void {
        clearInterval(this.timer)
    }

    countDown() {
        const {data} = this.props

        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;

        data.timeVal = seconds;

        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
            data.isComplete = true
        }
    }


    addLeadingZeros(value) {
        value = String(value);
        while (value.length < 2) {
            value = '0' + value;
        }
        return value;
    }

    _renderOptButton(title,icon,listener) {
        return (
            <TouchableOpacity onPress={listener}>
                <View style={{flexDirection : 'row',justifyContent : 'center',alignItems : 'center',marginRight : 3,marginLeft : 3 }}>
                    <Image
                        source={icon}
                        style={{
                        marginRight : 6,
                            width: 23,
                            height : 23
                    }}/>
                    <Text style={styles.optTextStyle}>{title}</Text>
                </View>
            </TouchableOpacity>

        )
    }

    _renderExpandedView(data) {

        const {onDeleteItem} = {...this.props}

        const {isRunning} = this.state

        if(data.isComplete){

            if (data.isExpanded){
                return (
                    <View style={styles.expandContainerStyle}>
                        {this._renderOptButton("Delete",deleteIcon,() => {
                            onDeleteItem(data.id)
                        })}

                    </View>
                )
            }
        }else{
            return (
                <View style={[styles.expandContainerStyle,{flexDirection : 'row',justifyContent:'space-between',paddingLeft : 20,paddingRight : 20}]}>
                    {this._renderOptButton(isRunning ? "Pause" : "Resume",isRunning ? pauseIcon : playIcon ,() => {

                        if(isRunning){
                            clearInterval(this.timer);
                            this.setState({
                                isRunning : false
                            });

                            data.isRunning = false
                        }else{
                            this.timer = 0;
                            this.startTimer();
                            this.setState({
                                isRunning : true
                            });
                            data.isRunning = true
                        }




                    })}
                    {this._renderOptButton("Delete",deleteIcon,() => {
                        clearInterval(this.timer);
                        onDeleteItem(data.id)
                    })}

                </View>
            )
        }
    }





    render() {

        const {itemListener,data} = {...this.props}

        return (
            <TouchableOpacity onPress={itemListener}>

                <View style={styles.listItem}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradientColor} style={styles.rowGradientStyle}>
                        <View style={styles.rowItemStyle}>
                            <Text style={styles.titleColor}>{data.timerLabel}</Text>
                            <Text style={styles.hourColor}>{this.addLeadingZeros(this.state.time.h)}:{this.addLeadingZeros(this.state.time.m)}:{this.addLeadingZeros(this.state.time.s)}</Text>
                        </View>
                    </LinearGradient>
                    {this._renderExpandedView(data)}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    listItem : {
        flexDirection : 'column',
        margin : 20,
        width : 320,
        alignSelf : 'center',
        borderColor : colors.primaryColor,
        borderWidth : 1,
        borderRadius:20,
    },
    titleColor : {
        color : '#fff',
        fontWeight: 'bold',
        fontSize : 20
    },
    hourColor : {
        color : '#fff',
        fontSize : 18
    },
    floatingButtonStyle : {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    plusTextStyle : {
        color : '#fff',
        fontSize : 40
    },
    rowItemStyle: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '100%',
        padding : 20,
    },
    rowGradientStyle: {
        borderColor : colors.primaryColor,
        borderWidth : 1,
        borderRadius : 20
    },
    expandContainerStyle : {
        padding : 16,
        alignItems : 'center',
    },
    optTextStyle : {
        color : '#000',
        fontSize : 20
    },
    modalStyle : {
        justifyContent: 'flex-end',
        margin: 0,
        height : 100
    }
});
