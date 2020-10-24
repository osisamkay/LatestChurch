import * as React from 'react';
import {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CustomDrawerContent from './CustomDrawerContent';
import Main from './Routes/MainRoute';
import {NavigationContainer} from '@react-navigation/native';
import {
  ToastBannerProvider,
  ToastBannerPresenter,
  useToastBannerToggler /* or withToastBannerToggler */,
  Transition,
} from 'react-native-toast-banner';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import saga from './src/saga/rootSaga';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './src/reducer/rootReducer';
import {Root} from 'native-base';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import OneSignal from 'react-native-onesignal';
import useOnesignal from './useOnesignal';

const Drawer = createDrawerNavigator();

function App({navigation}) {
  const [notificationPush] = useOnesignal();
  OneSignal.setLogLevel(6, 0);

  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init('91ef96ec-2b78-4e4e-bef6-507dc5600603', {
    kOSSettingsKeyAutoPrompt: false,
    kOSSettingsKeyInAppLaunchURL: false,
    kOSSettingsKeyInFocusDisplayOption: 2,
  });
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

  // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);

  // useEffect(() => {
  //   OneSignal.addEventListener('received', onReceived);
  //   OneSignal.addEventListener('opened', onOpened);
  //   OneSignal.addEventListener('ids', onIds);
  // }, []);

  function onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    // this.props.navigation.navigate('Request Notification');
    notificationPush(openResult);
  }

  function onIds(device) {
    console.log('Device info: ', device);
  }

  function myiOSPromptCallback(permission) {
    // do something with permission value
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: 'rgba(0,0,0,.45)',
          width: widthPercentageToDP('80%'),
        }}
        drawerPosition="right"
        drawerContent={props => <CustomDrawerContent {...props} />}
        statusBarAnimation="fade">
        <Drawer.Screen
          name="HomePages"
          component={Main}
          options={{drawerLabel: 'Home Page', headerTitle: 'Dashboard'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['SignUpReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root>
          <SafeAreaProvider>
            <ToastBannerProvider>
              <ApplicationProvider {...eva} theme={eva.light}>
                <App />
                <ToastBannerPresenter />
              </ApplicationProvider>
            </ToastBannerProvider>
          </SafeAreaProvider>
        </Root>
      </PersistGate>
    </Provider>
  );
};
