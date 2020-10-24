import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/EvilIcons';
import useNotification from './hooks/useNotification';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Loader from 'react-native-multi-loader';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {signalOffData} from './Onboarding/Login/Action/Action';

export default function Notifications() {
  const [view, setView] = React.useState(false);
  const [
    loading,
    setLoading,
    getNotification,
    notification,
    ReadNotification,
    read,
    setRead,
  ] = useNotification();
  const refRBSheet = React.useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  navigation.addListener('focus', () => {
    getNotification();
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        {notification.length <= 0 && (
          <Text style={styles.not}>No Notifications</Text>
        )}
        {notification.map(data => {
          return (
            <TouchableOpacity
              onPress={async () => {
                await ReadNotification(data.id);
                await setView(data);
                await refRBSheet.current.open();
                dispatch(signalOffData('ok'));
              }}
              style={styles.notifyContain}>
              <Icon
                name="envelope"
                size={25}
                style={{marginLeft: 23}}
                color={data.status === 'Unread' ? 'red' : 'grey'}
              />
              <Text style={styles.notify}>{data.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={heightPercentageToDP('50%')}
        closeOnPressMask={false}
        onClose={() => {
          setView({});
          getNotification();
        }}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{padding: 23}}>
          <Text>Title: {view.title}</Text>
          <Text>Message: {view.message}</Text>
        </View>
      </RBSheet>
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
  container: {
    flex: 1,
  },
  notifyContain: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notify: {
    padding: 13,
  },
  not: {
    textAlign: 'center',
    padding: 30,
  },
});
