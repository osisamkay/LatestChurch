import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Avatar, CheckBox, Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Inputs from '../Components/Inputs';
import EditInfo from './EditInfo';
import EditPassWord from './EditPassword';
import useProfile from './hooks/useProfile';
import ImagePicker from 'react-native-image-picker';
import Instance from '../Api/Instance';
import {useSelector, useDispatch} from 'react-redux';
import {Toast} from 'native-base';
import Loader from 'react-native-multi-loader';

export default function Settings() {
  const [not, setNot] = useState(false);
  const [view, setView] = useState(false);
  const [image, setImage] = useState({});
  const [images, setImages] = useState(false);
  const [data, setData] = useState(null);
  const [values, setValues] = useState({});
  const [password, setPassword] = useState(' ');
  const [
    loading,
    setLoading,
    getProfile,
    profile,
    changePassword,
    changeInfo,
  ] = useProfile();
  const refRBSheet = useRef();

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleImagePicker();
      } else {
        alert('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const options = {mediaType: 'Photo'};

  const handleImagePicker = async () => {
    return await ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response);
        // const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        const source = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        console.log(source, access_token);
        setImage(source);
        setImages(true);
        setData(response.data);
        setValues({...values, image: source});
        upload();
      }
    });
  };

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const upload = async () => {
    setLoading(true);

    try {
      let AddData = new FormData();
      AddData.append('image', image);
      console.log(image);
      const response = await Instance.post(
        'users/profile/avatar/upload',
        AddData,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
            // 'Content-Type': 'multipart/form-data',
          },
        },
      );
      let s = response.data.status;
      let m = response.data.message;
      // console.log(response, s, m);
      if (s) {
        setValues({});
        // setImage({});
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        setLoading(false);
      } else {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        setLoading(false);
      }
    } catch (err) {
      Toast.show({
        text: 'Something went wrong',
        buttonText: 'Okay',
        position: 'top',
        type: 'danger',
        duration: 5000,
        style: Style,
      });
      console.log(err);
      setLoading(false);
    }
  };
  console.log(values);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View>
        <Avatar
          size={120}
          rounded
          icon={{
            name: 'user',
            type: 'font-awesome',
            color: 'black',
          }}
          activeOpacity={0.7}
          containerStyle={styles.Avatar}
          onAccessoryPress={requestCameraPermission}
          showAccessory
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.group}>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>Change Info</Text>
            <TouchableOpacity
              onPress={() => {
                setView(false);
                refRBSheet.current.open();
              }}>
              <Icon name="edit" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>Change Password</Text>
            <TouchableOpacity
              onPress={() => {
                setView(true);
                refRBSheet.current.open();
              }}>
              <Icon name="edit" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>Notification</Text>
            <CheckBox
              checked={not}
              iconRight
              containerStyle={styles.check}
              checkedColor="#fff"
              onPress={() => {
                setNot(!not);
              }}
            />
          </View>
        </View>
        <Text style={styles.titleb}>Suspend or delete account</Text>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={heightPercentageToDP('50%')}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {!view && (
          <EditInfo
            TextInput={(value, val) => {
              setValues({
                ...values,
                [value]: val,
              });
            }}
            close={() => {
              changeInfo(values);
              refRBSheet.current.close();
            }}
          />
        )}
        {view && (
          <EditPassWord
            textInput={val => {
              setPassword(val);
            }}
            close={() => {
              changePassword(password);
              refRBSheet.current.close();
            }}
          />
        )}
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
    justifyContent: 'space-between',
  },
  image: {
    height: heightPercentageToDP('25%'),
    width: widthPercentageToDP('100%'),
    alignSelf: 'center',
    backgroundColor: 'black',
    resizeMode: 'contain',
  },
  imageContainer: {
    height: heightPercentageToDP('25%'),
    // width: widthPercentageToDP('100%'),
    // alignSelf: 'center',
    backgroundColor: 'black',
  },
  group: {
    // alignItems: 'center',
    paddingVertical: 25,
  },
  Avatar: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
  },
  titleb: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
    textAlign: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    width: widthPercentageToDP('60%'),
    alignSelf: 'center',
  },
  titletxt: {
    color: 'grey',
    fontSize: heightPercentageToDP('2.5%'),
    width: widthPercentageToDP('60%'),
    textAlign: 'right',
  },
  bodyContainer: {
    // marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Button: {
    backgroundColor: '#fff',
    height: heightPercentageToDP('8%'),
    marginHorizontal: 23,
    marginBottom: 10,
  },
  check: {
    padding: 0,
    margin: 0,
    position: 'relative',
    left: widthPercentageToDP('2.5%'),
  },
});
