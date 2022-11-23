import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import calculateDate from '../Utils/calculateDate';

function IssueListElement({ item, onPress }) {
    const daysSinceUpdate = calculateDate(item.updatedAt)

    return (
        <TouchableOpacity
            style={styles.issueContainer}
            onPress={() => onPress(item)}
        >
            <View style={styles.container}>
                <View style={styles.containerBox}>

                    <Text style={styles.issueTitle}>
                        {item.title}
                    </Text>

                    <View style={styles.issueInfoBox}>
                        <View style={styles.box}>
                            <Text style={styles.issueInfoText}>
                                Created at
                                {' '}
                                { new Date(item.createdAt).toLocaleDateString()}
                            </Text>
                        </View>

                        <View style={styles.box}>
                            <Text style={styles.issueInfoText}>
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
    issueContainer: {
        minHeight: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#C4C4C4',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    issueTitle: {
        color: '#166CD7',
        fontFamily: 'Roboto',
        textAlign: 'left',
        marginBottom: 10,
    },
    issueInfoBox: {
        flexDirection: 'row',
        width: '95%',
        flexWrap: 'wrap',
    },
    issueInfoText: {
        fontFamily: 'Segoe UI',
        marginLeft: 2,
        fontSize: 12,
        color: '##6F7781',
        fontWeight: '800',
    },
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    containerBox: {
        justifyContent: 'center',
        width: '90%',
    },
    box: {
        flexDirection: 'row',
        marginRight: '1%',
        alignItems: 'center',
    },
});

export default (IssueListElement)
