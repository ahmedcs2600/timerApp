import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {colors, gradientColor} from '../helper/Colors';
import {addLeadingZeros, secondsToTime} from '../helper/utils';

import BackgroundTimer from 'react-native-background-timer';

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


    _prepareTimer () {
        const {data} = {...this.props}

        let timeLeftVar = secondsToTime(data.timeVal);
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




    componentDidMount() {

        this._prepareTimer()
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = BackgroundTimer.setInterval(this.countDown, 1000);
        }
    }


    componentWillUnmount(): void {
        this.clearInterval(this.timer)
    }

    clearInterval(timeoutId) {
        BackgroundTimer.clearTimeout(timeoutId);
    }

    countDown() {
        const {data,onComplete} = this.props



        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        data.timeVal = seconds;

        this.setState({
            time: secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            this.clearInterval(this.timer);
            data.isComplete = true
            onComplete()
        }
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

        const {onDeleteItem,onPause} = {...this.props}

        const {isRunning} = this.state

        if (data.isExpanded) {
            if (data.isComplete) {


                return (
                    <View style={styles.expandContainerStyle}>
                        {this._renderOptButton("Delete", deleteIcon, () => {
                            onDeleteItem(data.id)
                        })}

                    </View>
                )

            }
            else{
                return (
                    <View style={[styles.expandContainerStyle,{flexDirection : 'row',justifyContent:'space-between',paddingLeft : 20,paddingRight : 20}]}>
                        {this._renderOptButton(isRunning ? "Pause" : "Resume",isRunning ? pauseIcon : playIcon ,() => {

                            if(isRunning){
                                this.clearInterval(this.timer);
                                this.setState({
                                    isRunning : false
                                });

                                data.isRunning = false

                                onPause()
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
                            this.clearInterval(this.timer);
                            onDeleteItem(data.id)
                        })}

                    </View>
                )
            }
        }
    }

    _renderTimeValue(){

        //const {data} = {...this.props}

       /* if(data.isComplete){
            return (
                <Text style={styles.hourColor}>{data.originalTime}</Text>
            )
        }*/

        return(
            <Text style={styles.hourColor}>{addLeadingZeros(this.state.time.h)}:{addLeadingZeros(this.state.time.m)}:{addLeadingZeros(this.state.time.s)}</Text>
        )
    }

    render() {

        const {itemListener,data} = {...this.props};
        return (
            <TouchableOpacity onPress={() => {
                itemListener()

            }}>

                <View style={styles.listItem}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradientColor} style={styles.rowGradientStyle}>
                        <View style={styles.rowItemStyle}>
                            <Text style={styles.titleColor}>{data.timerLabel}</Text>
                            {this._renderTimeValue()}
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

        backgroundColor : colors.whiteColor
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
        borderRadius : 15
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
