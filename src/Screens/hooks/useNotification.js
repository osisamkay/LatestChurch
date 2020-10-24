import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../Api/Instance';

export default () => {
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);
  const [notification, setNotification] = useState([]);
  const [password, setPassword] = useState('');
  const [read, setRead] = useState(false);

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };
  /**toggle visibility online */

  const getNotification = async () => {
    setLoading(true);
    try {
      const response = await Instance.get('users/notifications/', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        console.log(response.data.data);
        setNotification(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
      }
    } catch (err) {
      Toast.show({
        text: err,
        buttonText: 'Okay',
        position: 'top',
        type: 'danger',
        duration: 5000,
        style: Style,
      });
      setLoading(false);
    }
  };
  const ReadNotification = async id => {
    setLoading(true);
    try {
      const response = await Instance.post(
        'users/notifications/read',
        {notification_id: id},
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        console.log(response.data);

        // setNotification(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
      }
    } catch (err) {
      Toast.show({
        text: err,
        buttonText: 'Okay',
        position: 'top',
        type: 'danger',
        duration: 5000,
        style: Style,
      });
      setLoading(false);
    }
  };

  return [
    loading,
    setLoading,
    getNotification,
    notification,
    ReadNotification,
    read,
    setRead,
  ];
};
