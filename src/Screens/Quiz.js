import React, {useState} from 'react';
import {Card, ListItem, Button, Icon, Overlay} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import useQuiz from './hooks/useQuiz';
import {Textarea, Form, Item, Input} from 'native-base';
import Loader from 'react-native-multi-loader';
import {useNavigation} from '@react-navigation/native';
import Iconn from 'react-native-vector-icons/Entypo';

export default function Quiz() {
  const [answer, setAnswer] = useState(' ');
  const [add, setAdd] = useState(' ');
  const [child_id, setChild_id] = useState(' ');
  const [
    loading,
    setLoading,
    getAdultQuestions,
    adults,
    visible,
    setVisible,
    visible2,
    setVisible2,
    answerAdultQuestions,
    getChildren,
    children,
    addChild,
    childQuiz,
    getChildQuestions,
    answerChildrenQuestions,
  ] = useQuiz();

  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getChildren();
  });

  const toggleOverlay = () => {
    setVisible2(false);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        {adults.length <= 0 || childQuiz.length <= 0 ? (
          <Text style={{textAlign: 'center'}}>No Question Available</Text>
        ) : (
          ''
        )}
        {adults.map(data => {
          return (
            <Card>
              <View>
                <Text>Question:</Text>
                <Text>{data.question}</Text>
              </View>
              <View style={{marginVertical: 17}}>
                <Text>Answer:</Text>
                <Form>
                  <Textarea
                    rowSpan={5}
                    bordered
                    placeholder=""
                    onChangeText={value => {
                      setAnswer(value);
                    }}
                  />
                </Form>
              </View>
              <Button
                buttonStyle={styles.btn}
                title="Submit"
                onPress={() => {
                  let info = {answer, quiz_id: data.id};
                  answerAdultQuestions(info);
                }}
              />
            </Card>
          );
        })}
        {childQuiz.map(data => {
          return (
            <Card>
              <View>
                <Text>Question:</Text>
                <Text>{data.question}</Text>
              </View>
              <View style={{marginVertical: 17}}>
                <Text>Answer:</Text>
                <Form>
                  <Textarea
                    rowSpan={5}
                    bordered
                    placeholder=""
                    onChangeText={value => {
                      setAnswer(value);
                    }}
                  />
                </Form>
              </View>
              <Button
                buttonStyle={styles.btn}
                title="Submit"
                onPress={() => {
                  let info = {answer, child_id, quiz_id: data.id};
                  answerChildrenQuestions(info);
                }}
              />
            </Card>
          );
        })}
      </ScrollView>
      <Overlay
        overlayStyle={styles.Overlay}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <Text>Choose your category</Text>
        <Button
          buttonStyle={styles.btn}
          title="Adults"
          onPress={() => {
            getAdultQuestions();
          }}
        />
        <Button
          buttonStyle={styles.btn}
          title="Children"
          onPress={() => {
            setVisible(false);
            setVisible2(true);
          }}
        />
      </Overlay>
      <Overlay
        overlayStyle={styles.Overlay}
        isVisible={visible2}
        onBackdropPress={toggleOverlay}>
        <View>
          <ScrollView contentContainerStyle={{paddingVertical: 10}}>
            <Text>Select a child</Text>
            {children.map(data => {
              return (
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => {
                    getChildQuestions(data.id);
                    setChild_id(data.id);
                  }}>
                  <View style={styles.child}>
                    <Iconn name="user" />
                    <Text
                      style={{
                        fontSize: heightPercentageToDP('2.7%'),
                        marginLeft: 10,
                      }}>
                      {data.child_name}
                    </Text>
                  </View>
                  <Iconn name="arrow-right" size={20} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={{borderTopWidth: 5, paddingTop: 10}}>
          <Text>Add a Child :</Text>
          <Item>
            <Input
              placeholder="Child Name"
              onChangeText={val => {
                setAdd(val);
              }}
            />
          </Item>
          <Button
            buttonStyle={styles.btn}
            title="Add Child"
            onPress={() => {
              let info = {child_name: add};
              addChild(info);
            }}
          />
        </View>
      </Overlay>
      <Loader
        visible={loading}
        loaderType="bars"
        textType="none"
        sizeLoader="small"
        sizeText={heightPercentageToDP('1.75%')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Overlay: {
    width: widthPercentageToDP('80%'),
    maxHeight: heightPercentageToDP('75%'),
  },
  btn: {
    marginVertical: 10,
    backgroundColor: 'black',
    height: heightPercentageToDP('8%'),
  },
  child: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
});
