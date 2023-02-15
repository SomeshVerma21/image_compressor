import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoadImage from './src/views/CompressImage';

const App = () => {
    return (
        <View style={styles.container}>
            <LoadImage/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default App;
