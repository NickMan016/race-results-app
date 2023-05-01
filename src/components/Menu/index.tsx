import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Link, useLocation } from "react-router-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faUser, faPeopleGroup, faHouse, faPalette } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    const location = useLocation();
    const Routes = [
        { name: 'Home', route: '/', icon: faHouse },
        { name: 'Drivers', route: '/drivers', icon: faUser },
        { name: 'Teams', route: '/teams', icon: faPeopleGroup },
        { name: 'Schedule', route: '/schedule', icon: faCalendarDays },
        { name: 'Theme', route: '/theme', icon: faPalette },
    ]


    return (
        <View style={{
            flex: 1,
            borderTopColor: '#000',
            borderTopWidth: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            {
                Routes.map((value, index) => (
                    <Link to={value.route} underlayColor="#bbbbbb" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }} key={index}>
                        <>
                            <FontAwesomeIcon icon={value.icon} size={18} style={{ color: `${location.pathname === value.route ? '#ee0000' : '#000'}` }} />
                            <Text style={{ fontSize: 12, paddingTop: 2, color: `${location.pathname === value.route ? '#ee0000' : '#000'}` }}>{value.name}</Text>
                        </>
                    </Link>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({

});