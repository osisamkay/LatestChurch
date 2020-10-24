import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../Api/Instance';

export default () => {
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);
  const [ministers, setMinisters] = useState([]);
  const [password, setPassword] = useState('');

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };
  /**toggle visibility online */

  const grtMinisters = async () => {
    setLoading(true);
    try {
      const response = await Instance.get('users/ministers/', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        setMinisters(response.data.data);
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

  return [loading, setLoading, grtMinisters, ministers];
};
