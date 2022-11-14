import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import calculateDate from '../Utils/calculateDate';

function IssueListElement({ item }) {
    const daysSinceUpdate = calculateDate(item.updatedAt)

    return (
        <TouchableOpacity
            style={{
                minHeight: 70,
                borderBottomWidth: 1,
                borderBottomColor: '#C4C4C4',
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
            }}
        >
            <View style={{
                flexDirection: 'row',
                padding: 10,
            }}
            >

                <View style={{ justifyContent: 'center', width: '90%' }}>

                    <Text style={styles.repoFullName}>
                        {item.title}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        width: '95%',
                        flexWrap: 'wrap',
                    }}
                    >
                        <View style={{ flexDirection: 'row', marginRight: '1%', alignItems: 'center' }}>
                            <Text style={styles.repoInfoText}>
                                Createds
                                {' '}
                                { new Date(item.createdAt).toLocaleDateString()}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginRight: '1%', alignItems: 'center' }}>
                            <Text style={styles.repoInfoText}>
                                {'Updated '}
                                {daysSinceUpdate}
                                {' '}
                                days ago
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    repoFullName: {
        color: '#166CD7',
        fontFamily: 'Roboto',
        textAlign: 'left',
        marginBottom: 10,
    },
    repoInfoText: {
        fontFamily: 'Segoe UI',
        marginLeft: 2,
        fontSize: 12,
        color: '##6F7781',
        fontWeight: '800',
    },
});

export default (IssueListElement)
