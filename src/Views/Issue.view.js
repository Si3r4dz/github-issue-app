import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import calculateDate from '../Utils/calculateDate';
import { AddCommentToSelectedIssue, CleanSelectedIssue, SaveIssue } from '../redux/slices/issueSlice';

function IssueView({ navigation }) {
    const dispatch = useDispatch()
    const selectedIssue = useSelector((state) => state.issue.selectedIssue)
    const commendtedIssuesList = useSelector((state) => state.issue.commendtedIssuesList)

    const scrollViewRef = useRef()

    const [commentedText, setCommentedText] = useState('')

    const handleCommentSubmitEditingPress = () => {
        dispatch(AddCommentToSelectedIssue([commentedText]))
        setCommentedText('')
        scrollViewRef.current.scrollToEnd()
    }
    const handleSaveButtonClick = () => {
        dispatch(SaveIssue(selectedIssue))
    }

    useEffect(() => {
        Object.entries(commendtedIssuesList).forEach(([key, value]) => {
            if (parseInt(key, 10) === selectedIssue.id) {
                dispatch(AddCommentToSelectedIssue(value.comments))
            }
        });
    }, [])

    useEffect(() => {
        const backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
            dispatch(CleanSelectedIssue())
            return false
        })
        return () => backhandler.remove()
    }, [navigation])
    return (
        <SafeAreaView style={styles.safeAreaStyles}>
            <KeyboardAvoidingView style={styles.safeAreaStyles} behavior={Platform.OS === 'ios' && 'padding'}>
                <ScrollView contentContainerStyle={styles.scrollViewStyles} ref={scrollViewRef}>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleBox}>
                            <Text style={styles.titleText}>
                                {selectedIssue?.title}
                            </Text>
                            <View style={styles.infoBox}>
                                <Text style={styles.info}>
                                    Updated
                                    {' '}
                                    {calculateDate(selectedIssue?.updatedAt)}
                                    {' '}
                                    Day ago
                                    {' || '}
                                </Text>
                                <Text style={styles.info}>
                                    State
                                    {' '}
                                    {selectedIssue?.state}

                                </Text>
                            </View>

                        </View>
                        <View
                            style={styles.descriptionBox}
                        >
                            <Text>
                                {selectedIssue?.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.commentsBox}>
                        <View style={styles.commentsHeader}>
                            <Text>
                                {' '}
                                Comments :
                            </Text>
                            <TouchableOpacity onPress={handleSaveButtonClick} style={styles.saveButtonStyle}>
                                <Text> Save Issue</Text>
                            </TouchableOpacity>
                        </View>

                        {/* eslint-disable-next-line array-callback-return */}
                        {selectedIssue?.comments?.map((comment) => (
                            <Text style={styles.commentsText}>
                                {comment}
                            </Text>
                        ))}
                    </View>
                </ScrollView>
                <View>
                    <TextInput
                        placeholder="Add comment to issue..."
                        value={commentedText}
                        style={styles.textInput}
                        onChangeText={setCommentedText}
                        onSubmitEditing={handleCommentSubmitEditingPress}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaStyles: {
        felx: 1,
    },
    scrollViewStyles: {
        felxGrow: 1,
    },
    mainContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '5%',
    },
    titleBox: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#D0D7DE',
        width: '95%',
        alignSelf: 'center',
        margin: 5,
        color: '#000',
    },
    descriptionBox: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    titleText: {
        color: 'black',
        fontSize: 26,
        fontFamily: 'Roboto',
        fontWeight: '600',
    },
    infoBox: {
        flexDirection: 'row',
    },
    info: {
        color: '#6F7781',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '600',
        marginTop: 5,
        marginBottom: 15,
    },
    commentsBox: {
        marginBottom: 5,
    },
    commentsText: {
        padding: 3,
        marginLeft: 5,
    },
    commentsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'flex-end',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#D0D7DE',
    },
    saveButtonStyle: {
        backgroundColor: '#6F7781',
        borderRadius: 10,
        paddingHorizontal: 12,
        width: '30%',
        alignItems: 'center',
    },
});

export default IssueView;
