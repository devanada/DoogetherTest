/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, ScrollView, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {IconButton, Icon, View} from 'native-base';

import {reducer, initialState} from '../Utils/reducer';
import {CustomTextInput} from '../Components/CustomTextInput';
import {CustomLoading} from '../Components/CustomLoading';

const ToDoScreen = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const getStorage = async () => {
      const local = await AsyncStorage.getItem('ToDoList');
      const parsed = JSON.parse(local);
      if (parsed) {
        dispatch({type: 'GET_TASK', tasks: parsed});
      } else {
        dispatch({type: 'GET_TASK', tasks: []});
      }
    };
    getStorage();
  }, []);

  const addItem = title => {
    const add = [
      ...state.dataTask,
      {
        title: title,
        isCompleted: false,
      },
    ];
    AsyncStorage.setItem('ToDoList', JSON.stringify(add));
    dispatch({type: 'ADD_TASK', addTask: add});
  };

  const handleDelete = index => {
    const temp = state.dataTask.filter((_, itemI) => itemI !== index);
    AsyncStorage.setItem('ToDoList', JSON.stringify(temp));
    dispatch({type: 'DELETE_TASK', delTask: temp});
  };

  const handleStatusChange = index => {
    const temp = state.dataTask.map((item, itemI) =>
      itemI !== index
        ? item
        : {
            ...item,
            isCompleted: !item.isCompleted,
          },
    );
    AsyncStorage.setItem('ToDoList', JSON.stringify(temp));
    dispatch({type: 'CHANGE_TASK', changeTask: temp});
  };

  if (state.isReady) {
    return (
      <>
        <ScrollView style={styles.container}>
          <Text style={styles.textStyle}>ToDo</Text>
          <CustomTextInput
            placeholder="Add item"
            iconName="plus"
            onChangeText={e => setInputValue(e)}
            value={inputValue}
            onPress={() => {
              addItem(inputValue);
              setInputValue('');
            }}
          />
          {state.dataTask.map((item, index) => (
            <View
              key={item.title + index.toString()}
              style={{flex: 1, flexDirection: 'row'}}>
              <CheckBox
                checked={item.isCompleted}
                onPress={() => handleStatusChange(index)}
                title={item.title}
                containerStyle={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                textStyle={{
                  textDecorationLine: item.isCompleted
                    ? 'line-through'
                    : 'none',
                }}
              />
              <IconButton
                colorScheme="emerald"
                icon={<Icon as={FontAwesome5} name="trash" size={5} />}
                onPress={() => handleDelete(index)}
              />
            </View>
          ))}
        </ScrollView>
      </>
    );
  } else {
    return (
      <>
        <CustomLoading visible={true} text={'Loading'} />
      </>
    );
  }
};

export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#121212',
  },
});
