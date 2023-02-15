import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image as ImageCompressor } from 'react-native-compressor';
import RNFetchBlob from 'rn-fetch-blob';

const CompressImage = () => {
    const [fileName, setFileName] = useState("No file choosen")
    const [imageUri, setImageUri] = useState()
    const [compImageUri, setCompImageUri] = useState()
    const [progress, setProgress] = useState(false)
    const {config, fs} = RNFetchBlob;

    const loadImage = async () => {
        const result = await launchImageLibrary()
        if (result && result.assets) {
            setFileName(result.assets[0].fileName)
            setImageUri(result.assets[0].uri)
        }
    }

    const compressImage = async () => {
        setProgress(true)
        const result = await ImageCompressor.compress(imageUri, {
            quality: 0.2
        })
        setCompImageUri(result)
        console.log(result)
        setProgress(false)
    }

    const downloadImage = () => {
        let pictureDir = fs.dirs.PictureDir
        let options = {
            fileCache: true,
            addAndroidDownloads:{
                useDownloadManager:true,
                notificaiton:true,
                path: pictureDir + '/image_.png',
                description:'Image'
            }
        }
        // config(options)
        // .fetch("GET",imageUri)
        // .then(res => {
        //     Alert('Image Download Successfuly')
        // })
        alert("Image saved in gallery")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    loadImage()
                }}
                style={styles.btnLoadImage}
            >
                <Text style={{ fontSize: 18, color: 'black' }}>Choose File</Text>
                <Text style={{ fontSize: 14, color: 'black', height: 20 }}>{fileName}</Text>
            </TouchableOpacity>
            {
                imageUri != null ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={{ height: 200, width: 200, margin: 30 }}
                    />
                ) : <View />
            }
            {
                imageUri != null ? (
                    <TouchableOpacity
                        style={styles.btnCompress}
                        onPress={() => {
                            compressImage()
                        }}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Compress Image</Text>
                    </TouchableOpacity>
                ) : <View />
            }
            {
                compImageUri != null ? (
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
                        <Image
                            source={{ uri: compImageUri }}
                            style={{ height: 200, width: 200, margin: 30 }}
                        />
                        <TouchableOpacity
                            style={{ width: 200, height: 40, backgroundColor: 'white', borderRadius: 10, flexDirection: 'column', justifyContent: 'center' }}
                            onPress={() => {
                                downloadImage()
                            }}
                        >
                            <Text style={{ color: "black", textAlign: "center" }}>Download</Text>
                        </TouchableOpacity>
                    </View>
                ) : <View />
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'blue',
        paddingVertical: 30
    },

    btnLoadImage: {
        width: 200,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 3
    },

    btnCompress: {
        width: 200,
        height: 40,
        backgroundColor: 'magenta',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 3,
        marginTop: 30
    }

});

export default CompressImage;
