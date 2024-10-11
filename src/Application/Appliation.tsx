import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screeens/home/HomeScreen';
import ScheduleScreen from './screeens/schedule/ScheduleScreen';
import ChatScreen from './screeens/chat/ChatScreen';
import StoreScreen from './screeens/store/StoreScreen';
import ProfileScreen from './screeens/profile/ProfileScreen';

interface routesType {
  id: number;
  routeName: string;
  path: string;
  comp: FC;
}

const Application: React.FC = () => {
  // setup the routes
  let btmNavigationRoutes: routesType[] = [
    {id: 1, routeName: 'home', path: 'dashboard', comp: HomeScreen},
    {id: 2, routeName: 'schedule', path: 'schedule', comp: ScheduleScreen},
    {id: 3, routeName: 'store', path: 'store', comp: StoreScreen},
    {id: 4, routeName: 'chat', path: 'chat', comp: ChatScreen},
    {id: 5, routeName: 'profile', path: 'profile', comp: ProfileScreen},
  ];

  let BtmNavStack = createBottomTabNavigator();

  return (
    <BtmNavStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {btmNavigationRoutes &&
        btmNavigationRoutes.map((singleRoute: routesType) => {
          return (
            <BtmNavStack.Screen
              key={singleRoute.id}
              name={singleRoute.path}
              component={singleRoute.comp}
            />
          );
        })}
    </BtmNavStack.Navigator>
  );
};

export default Application;
