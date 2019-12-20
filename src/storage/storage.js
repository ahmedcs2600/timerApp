import {AsyncStorage} from 'react-native'



/**
 *
 *  Keys
 * */
export const TIMER_DATA_KEY = 'timer_data_key';


export const saveData = (data) => {

    //console.log("saving obj ==> " + JSON.stringify(userObj));
    AsyncStorage.setItem(TIMER_DATA_KEY, JSON.stringify(data));

};


export const getData = (callBack) => {
    return AsyncStorage.getItem(TIMER_DATA_KEY, (err, result) => {
        callBack(err,result);
    });
};
