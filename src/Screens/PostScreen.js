/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useReducer} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import axios from 'axios';

import {reducer, initialState} from '../Utils/reducer';
import {CustomTextInput} from '../Components/CustomTextInput';
import {CustomLoading} from '../Components/CustomLoading';

const DEVICE = Dimensions.get('screen');

const PostScreen = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        const fetch = res.data;
        dispatch({type: 'GET_POST', posts: fetch.slice(0, 6)});
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createPost = async () => {
    setLoading(true);
    const params = {
      title,
      body,
      userId: 666,
    };
    axios
      .post('https://jsonplaceholder.typicode.com/posts', params)
      .then(res => {
        const newArr = [];
        const fetch = res.data;
        newArr.push(fetch, ...state.dataPost);
        dispatch({type: 'ADD_POST', addPost: newArr});
        setVisible(false);
        setLoading(false);
        setTitle('');
        setBody('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (state.isReady) {
    return (
      <>
        <View style={styles.container}>
          {visible && (
            <Modal
              transparent
              animationType="fade"
              visible={visible}
              onRequestClose={() => setVisible(false)}>
              <View style={styles.modalBackground}>
                <Card
                  containerStyle={[styles.card, {width: DEVICE.width - 20}]}>
                  <Card.Title>Create new post</Card.Title>
                  <CustomTextInput
                    placeholder="Title Post"
                    onChangeText={e => setTitle(e)}
                    value={title}
                  />
                  <CustomTextInput
                    placeholder="Body Post"
                    onChangeText={e => setBody(e)}
                    value={body}
                  />
                  <Button
                    title="Solid Button"
                    containerStyle={{marginTop: 10}}
                    onPress={() => createPost()}
                    loading={loading}
                  />
                </Card>
              </View>
            </Modal>
          )}
          <FlatList
            data={state.dataPost}
            contentContainerStyle={{paddingBottom: 20}}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Card containerStyle={styles.card} key={item.id}>
                <Card.Title>{item.title}</Card.Title>
                <Text style={styles.textStyle1}>{item.body}</Text>
              </Card>
            )}
          />
          <TouchableOpacity
            title="Solid Button"
            style={styles.button}
            onPress={() => setVisible(true)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
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

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000090',
  },
  button: {
    right: 0,
    bottom: 0,
    width: 50,
    margin: 10,
    height: 50,
    borderWidth: 3,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    borderColor: '#0f4c75',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0f4c75',
  },
  textStyle1: {
    fontSize: 15,
    color: '#121212',
  },
  card: {
    borderWidth: 0,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
