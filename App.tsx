import {FC, useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//screens
import Application from './src/Application/Appliation';
import LoadingScreen from './libs/loading/LoadingScreen';
import Onboarding from './onBoarding/onBoarding';
import {Provider} from 'react-redux';
import {store} from './publicStore/store';

interface routesType {
  id: number;
  routeName: string;
  path: string;
  comp: FC;
}

const App = () => {
  // vars
  const [showOnBoarding, setShowOnboarding] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setError] = useState<boolean>(false);
  // init value in memeory
  let memInit = new MMKV();
  // check if user first time and show onboarding
  async function checkFristTimeRegister() {
    try {
      let onboardingValue = memInit.getString('apiKey');
      console.log(onboardingValue);
      if (onboardingValue === null || !onboardingValue) {
        setLoading(false);
        setShowOnboarding(true);
      } else {
        setLoading(false);
        setShowOnboarding(false);
      }
    } catch (e) {}
  }
  // register ontime fucntion
  useEffect(() => {
    checkFristTimeRegister();
  }, []);

  // set the stack navigation
  let StackNav = createNativeStackNavigator();
  let stackRoutes: routesType[] = [
    {id: 1, routeName: 'app', path: 'app', comp: Application},
  ];
  // main appliation return
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNav.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {loading && (
            <StackNav.Screen name="loading" component={LoadingScreen} />
          )}
          {
            //!loading && showOnBoarding && (<StackNav.Screen name="onboarding" component={Onboarding} />)
          }
          {!loading &&
            stackRoutes &&
            stackRoutes.map((singleRoute: routesType) => (
              <StackNav.Screen
                key={singleRoute.id}
                name={singleRoute.path}
                component={singleRoute.comp}
              />
            ))}
        </StackNav.Navigator>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
