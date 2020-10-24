import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../Api/Instance';

export default () => {
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);
  const [adults, setAdults] = useState([]);
  const [children, setChildren] = useState([]);
  const [childQuiz, setChildQuiz] = useState([]);
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(false);

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };
  /**toggle visibility online */

  const getAdultQuestions = async () => {
    setLoading(true);
    try {
      const response = await Instance.get('users/quiz/adult/new', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        console.log(response.data.data);
        setAdults(response.data.data);
        setVisible(false);
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

  //**get Child Quix */
  const getChildQuestions = async child_id => {
    setLoading(true);
    try {
      const response = await Instance.get(
        `users/quiz/children/${child_id}/new`,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        console.log(response.data.data);
        setChildQuiz(response.data.data);
        setVisible2(false);
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

  //**this is to return adult answers */
  const answerAdultQuestions = async answer => {
    setLoading(true);
    try {
      const response = await Instance.post('users/quiz/adult/answer', answer, {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        getAdultQuestions();
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
  const answerChildrenQuestions = async answer => {
    setLoading(true);
    try {
      const response = await Instance.post(
        'users/quiz/children/answer',
        answer,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        getChildQuestions();
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

  //**Add child */
  const addChild = async answer => {
    setLoading(true);
    try {
      const response = await Instance.post('users/children/add', answer, {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        getChildren();
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

  //**this is to get all children */
  const getChildren = async () => {
    setLoading(true);
    try {
      const response = await Instance.get('users/children/', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });

      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        console.log(response.data.data);
        setChildren(response.data.data);
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
  ];
};
