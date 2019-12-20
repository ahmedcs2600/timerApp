import React, {Component} from 'react';
import {
    View,Text
} from 'react-native';
import {colors} from '../helper/Colors';

export default class EmptyListData extends Component {

    render() {
        return (
            <View style={{justifyContent:"center",alignItems: 'center',flex:1}}>
                <Text style={{
                    color:colors.primaryColor,
                    fontSize:18
                }}>No Data Found</Text>
            </View>
        );
    }
}
