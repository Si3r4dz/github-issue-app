import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { store, persistor } from './src/redux/store'
import Home from './src/Views/Home.view';
import IssueView from './src/Views/Issue.view';

function App() {
    const isDarkMode = useColorScheme() === 'dark';
    const Stack = createNativeStackNavigator();
    const queryClient = new QueryClient()

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <StatusBar
                            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                            backgroundColor={backgroundStyle.backgroundColor}
                            translucent={false}
                            hidden={false}
                        />
                        <NavigationContainer>
                            <Stack.Navigator>
                                <Stack.Screen name="Home" component={Home} options={{ animation: 'fade', headerShown: false }} />
                                <Stack.Screen name="IssueView" component={IssueView} options={{ animation: 'fade', headerShown: false }} />

                            </Stack.Navigator>
                        </NavigationContainer>
                    </SafeAreaView>
                </QueryClientProvider>
            </PersistGate>
        </Provider>

    )
}

const styles = StyleSheet.create({ });

export default App;
