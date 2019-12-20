/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,Image,
    StatusBar, TouchableOpacity, FlatList,
} from 'react-native';

import {getData, saveData} from './src/storage/storage';
import Modal from 'react-native-modal';
import AppModal from './src/components/AppModal';
import LinearGradient from 'react-native-linear-gradient';
import {colors, gradientColor} from './src/helper/Colors';
import EmptyListData from './src/components/EmptyListData';
import TimerItemView from './src/components/TimerItemView';

export default class App extends Component {

    state = {
        data: [],
        isModelVisible: false,
    };

    componentWillUnmount(): void {
        console.log('calling');

       this.saveDataToLocal()
    }

    saveDataToLocal() {
        const {data} = this.state;

        let dataToSave = [];


        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            dataToSave.push({
                isComplete: item.isComplete,
                id: item.id,
                timerLabel: item.timerLabel,
                timeVal: item.timeVal,
                originalTime: item.originalTime,

            });
        }

        saveData(dataToSave);
    }

    componentDidMount(): void {
        console.log('Component Did Mound');
        getData((err, result) => {
            let data = JSON.parse(result);


            let newData = [];
            if(data != null){
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    newData.push({
                        id: item.id,
                        timerLabel: item.timerLabel,
                        timeVal: item.timeVal,
                        originalTime: item.originalTime,
                        isRunning: false,
                        isExpanded: false,
                        isComplete: item.isComplete,
                    });
                }
            }


            this.setState({
                data: newData,
            });
        });
    }

    _hideModal() {
        this.setState({isModelVisible: false});
    }

    _renderModal = () => {
        return (
            <Modal
                onBackButtonPress={() => {
                    this._hideModal();
                }}
                onBackdropPress={() => this._hideModal()}
                style={styles.modalStyle}
                animationType={'slide'}
                swipeDirection={['down']}
                isVisible={this.state.isModelVisible}>
                <AppModal
                    onSubmitButton={(time, labelVal) => {

                        let tempData = this.state.data;

                        let id = 1;

                        if (tempData.length > 0) {
                            id = tempData[0].id + 1;
                        }


                        tempData.push({
                            id: id,
                            timerLabel: labelVal,
                            timeVal: time,
                            originalTime : time,
                            isRunning: true,
                            isExpanded: false,
                            isComplete: false,
                        });



                        this.setState({
                            isModelVisible: false,
                            data: tempData,
                        },()=> {
                            this.saveDataToLocal()
                        });
                    }}
                />
            </Modal>
        );
    };

    _renderFloatingButton() {
        return (

            <LinearGradient colors={gradientColor} style={styles.floatingButtonStyle}>
                <TouchableOpacity onPress={() => {
                    this.setState({isModelVisible: !this.state.isModelVisible});
                }}>
                    <Image
                        style={{width: 30, height: 30,tintColor:colors.whiteColor}}
                        source={require('./src/assets/plus_icon.png')}
                    />
                </TouchableOpacity>
            </LinearGradient>

        );
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>

                    {
                        (this.state .data == null || (this.state.data !=null && this.state.data.length <= 0))
                        && <EmptyListData/>
                    }

                    {
                        (this.state .data == null || (this.state.data !=null && this.state.data.length > 0)) &&
                        <FlatList
                            style={{flex: 1, padding: 12, marginTop: 50}}
                            data={this.state.data}
                            renderItem={({item, index}) =>
                                <TimerItemView
                                    data={item}
                                    onPause={() => {
                                        this.saveDataToLocal()
                                    }}
                                    onComplete={() => {
                                        const {data} = this.state;
                                        data[index].isComplete = true;
                                        data[index].isExpanded = false;

                                        this.setState({
                                            data : data
                                        },() => {
                                            this.saveDataToLocal()
                                        })
                                    }}
                                    onDeleteItem={(id) => {
                                        const {data} = this.state
                                        data.splice(index, 1);

                                        this.setState({
                                              data : data
                                        },() => {
                                            this.saveDataToLocal()
                                        })
                                    }}
                                    itemListener={() => {
                                        let tempData = this.state.data;


                                        tempData[index].isExpanded = !tempData[index].isExpanded;

                                        this.setState({
                                            data: tempData,
                                        });
                                    }}
                                />}
                            keyExtractor={(item, index) => index.toString()}
                        />


                    }


                    {this._renderFloatingButton()}

                    {this._renderModal()}

                </View>


            </SafeAreaView>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingButtonStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusTextStyle: {
        color: '#fff',
        fontSize: 40,
    },
    modalStyle: {
        justifyContent: 'flex-end',
        margin: 0,
        height: 100,
    },
});




