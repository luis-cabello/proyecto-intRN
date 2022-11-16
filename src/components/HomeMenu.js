import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'
import OthersProfile from '../screens/OthersProfile';
import Search from '../screens/Search';


const Tab = createBottomTabNavigator()

function HomeMenu() {
    return (

        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }} />
            <Tab.Screen name='Search' component={Search} options={{ tabBarIcon: () => <Ionicons name="person" size={24} color="black" /> }} />
            <Tab.Screen name='OthersProfile' component={OthersProfile} options={{ tabBarIcon: () => <Ionicons name="person" size={24} color="black" /> }} />
            <Tab.Screen name='NewPost' component={NewPost} options={{ tabBarIcon: () => <MaterialIcons name="add-a-photo" size={24} color="black" /> }} />
            <Tab.Screen name='Profile' component={Profile} options={{ tabBarIcon: () => <Ionicons name="person" size={24} color="black" /> }} />
        </Tab.Navigator>
    )

}


export default HomeMenu