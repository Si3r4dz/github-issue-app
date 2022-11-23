import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    BackHandler,
    ActivityIndicator,
} from 'react-native';
import { AddIssues, AddSelectedIssue } from '../redux/slices/issueSlice';
import SearchBar from '../Components/searchBar';
import ResultsBar from '../Components/resultsBar';
import useApi from '../Hooks/useApi';
import fromIssueApi from '../Adapters/IssueApiAdapter';
import IssueListElement from '../Components/issueListElement';
import isCloseToBottom from '../Utils/isCloseToBottom';
import { DEFAULT_REPOSITOTY } from '../../variable';

function Home({ navigation }) {
    const repositoryName = 'facebook/react-native'
    const dispatch = useDispatch()
    const issuesList = useSelector((state) => state.issue.issueList)

    const [searchText, setSearchText] = useState('')
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [resultsCount, setResultsCount] = useState(0)

    const fetchIssues = useApi({
        url: `/search/issues?q=is:issue%20repo:${DEFAULT_REPOSITOTY}&page=${page}&per_page=20`,
        queryName: ['Issues'],
        fromApiAdapter: fromIssueApi,
    })

    const handleOnIssuePress = (item) => {
        dispatch(AddSelectedIssue(item))
        navigation.navigate('IssueView')
    }
    useEffect(() => {
        if (fetchIssues.isSuccess && !fetchIssues.isFetching) {
            dispatch(AddIssues(fetchIssues.data))
        }
        if (fetchIssues.isError) {
            setError(fetchIssues.error.message)
        }
    }, [fetchIssues.isFetching])

    useEffect(() => {
        const backhandler = BackHandler.addEventListener('hardwareBackPress', () => false)
        return () => backhandler.remove()
    }, [navigation])

    useEffect(() => {
        fetchIssues.refetch()
    }, [page])

    useEffect(() => {
        setResultsCount(Object.keys(issuesList).length)
    }, [issuesList])

    return (
        <SafeAreaView style={styles.safeArea}>
            <SearchBar
                placeholder={DEFAULT_REPOSITOTY}
                onChangeInputText={setSearchText}
            />
            <ResultsBar
                resultsCount={resultsCount}
            />
            {fetchIssues.status === 'success'
                ? (
                    <ScrollView
                        onMomentumScrollEnd={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent) && !fetchIssues.isFetching && resultsCount > 0) {
                                // eslint-disable-next-line no-return-assign
                                setPage((number) => number += 1)
                            }
                        }}
                    >
                        {/* eslint-disable-next-line no-console */}
                        {Object.entries(issuesList).reverse().map(([key, value]) => (
                            <IssueListElement item={value} key={key} onPress={handleOnIssuePress} />
                        ))}
                    </ScrollView>

                )
                : (
                    <View style={styles.infoBox}>
                        <Text>{error.length > 0 ? error : 'Loading Data' }</Text>
                    </View>

                )}
            {fetchIssues.isRefetching
            && (
                <ActivityIndicator size="large" color="#24292F" style={styles.activity} />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    infoBox: { alignSelf: 'center', marginTop: 10 },
    activity: { padding: 10 },
});

export default Home;
