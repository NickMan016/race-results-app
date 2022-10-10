import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Link } from "react-router-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faUser, faPeopleGroup, faHouse, faPalette } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    const Routes = [
        { name: 'Home', route: '/', icon: faHouse },
        { name: 'Drivers', route: '/drivers', icon: faUser },
        { name: 'Teams', route: '/teams', icon: faPeopleGroup },
        { name: 'Schedule', route: '/schedule', icon: faCalendarDays },
    ]

    return (
        <View style={{
            flex: 1,
            borderTopColor: '#000',
            borderTopWidth: 1,
        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                {
                    Routes.map((value, index) => (
                        <Link to={value.route} underlayColor="#bbbbbb" style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }} key={index}>
                            <>
                                <FontAwesomeIcon icon={value.icon} size={20} style={{ color: "#000" }} />
                                <Text style={{ fontSize: 12, paddingTop: 2 }}>{value.name}</Text>
                            </>
                        </Link>
                    ))
                }
                <TouchableHighlight style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }} underlayColor="#bbbbbb" onPress={() => Alert.alert('Touch')}>
                    <>
                        <FontAwesomeIcon icon={faPalette} size={20} style={{ color: "#000" }} />
                        <Text style={{ fontSize: 12, paddingTop: 2 }}>Theme</Text>
                    </>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

});