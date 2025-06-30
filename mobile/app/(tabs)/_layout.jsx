import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Tabs } from 'expo-router';
import IonIcons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

const TabsLayout = () => {
  const { isSignedIn } = useAuth();

  if(!isSignedIn){
    return(
      <Redirect href={"/(auth)/sign-in"}/>
    );
  }

  return (
  <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.border,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        height: 60,
      },
      tabBarLabelStyle:{
        fontSize: 12,
        fontWeight: '600',
      },
    }}
  >
    <Tabs.Screen 
      name="index"
      options={{
        title: 'Recipes',
        tabBarIcon: ({ color, size }) => <IonIcons name="restaurant" size={size} color={color}/>
      }}
    />

    <Tabs.Screen 
      name="search"
      options={{
        title: 'Search',
        tabBarIcon: ({ color, size }) => <IonIcons name="search" size={size} color={color}/>
      }}
    />

    <Tabs.Screen 
      name="favorites"
      options={{
        title: 'Favorites',
        tabBarIcon: ({ color, size }) => <IonIcons name="heart" size={size} color={color}/>
      }}
    />
  </Tabs>
  )
};

export default TabsLayout;