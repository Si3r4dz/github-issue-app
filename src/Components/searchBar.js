import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const searchBar = ({ placeholder, onChangeInputText }) => (
    <View
        style={styles.view}
    >
        <View style={{ width: '85%' }}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor="#D0D7DE"
                onChangeText={onChangeInputText}
            />
        </View>
    </View>
)

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#D0D7DE',
        width: '80%',
        alignSelf: 'flex-end',
        paddingLeft: '2.5%',
        margin: 5,
        color: '#fff',
    },
    view: {
        width: '100%',
        height: 50,
        backgroundColor: '#24292F',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
    },
});

export default (searchBar)
