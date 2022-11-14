/* eslint-disable no-console */
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
import { AddIssueToList } from '../redux/slices/issueSlice';
import SearchBar from '../Components/searchBar';
import ResultsBar from '../Components/resultsBar';
import useApi from '../Hooks/useApi';
import fromIssueApi from '../Adapters/IssueApiAdapter';
import IssueListElement from '../Components/issueListElement';
import isCloseToBottom from '../Utils/isCloseToBottom';

function Home({ navigation }) {
    const repositoryName = 'facebook/react-native'

    const dispatch = useDispatch()
    const issuesList = useSelector((state) => state.issue.issueList)

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(1)

    const fetchIssues = useApi({
        url: `/search/issues?q=is:issue%20repo:${repositoryName}&page=${page}&per_page=10`,
        queryName: ['Issues'],
        fromApiAdapter: fromIssueApi,
    })

    useEffect(() => {
        if (fetchIssues.isSuccess && !fetchIssues.isFetching) {
            dispatch(AddIssueToList(fetchIssues.data))
        }
        if (fetchIssues.isError) {
            console.log('error validation')
        }
    }, [fetchIssues.isFetching])

    useEffect(() => {
        const fetchTimeOut = setTimeout(() => {
            if (searchText.length > 2) {
                let dupa = 'asd'
                // eslint-disable-next-line no-unused-vars
                dupa = searchText
            }
        }, 200)
        return () => {
            clearTimeout(fetchTimeOut)
        }
    }, [searchText])

    useEffect(() => {
        const backhandler = BackHandler.addEventListener('hardwareBackPress', () => false)
        return () => backhandler.remove()
    }, [navigation])

    useEffect(() => {
        fetchIssues.refetch()
    }, [page])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar
                placeholder={repositoryName}
                onChangeInputText={setSearchText}
            />
            <ResultsBar
                resultsCount={Object.keys(issuesList).length}
            />
            {fetchIssues.status === 'success'
                ? (
                    <ScrollView
                        onMomentumScrollEnd={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent) && !fetchIssues.isFetching && Object.keys(issuesList).length > 0) {
                                // eslint-disable-next-line no-return-assign
                                setPage((number) => number += 1)
                            }
                        }}
                    >
                        {/* eslint-disable-next-line no-console */}
                        {Object.entries(issuesList).map(([key, value]) => (
                            <IssueListElement item={value} key={key} />
                        ))}
                    </ScrollView>

                )
                : (

                    <View style={{ alignSelf: 'center', marginTop: 10 }}>
                        <Text>Loading dataaa</Text>
                    </View>

                )}
            {fetchIssues.isRefetching
            && (
                <ActivityIndicator size="large" color="#24292F" style={{ padding: 10 }} />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

export default Home;
