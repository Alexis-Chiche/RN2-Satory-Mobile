import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button, IconButton } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import * as Permissions from 'expo-permissions';
import { StyleSheet, View, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  cameraScreen: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
    height: 350
  },
  cameraTouchable: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: 10
  },
  button: {
    marginVertical: 15
  }
});

function CameraPicker({ setImage }) {
  const [permission, setPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [newImage, setNewImage] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [cam, setCam] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          return;
        }
      }
      const { status } = await Camera.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  async function takePicture() {
    if (cam) {
      const image = await cam.takePictureAsync({
        quality: 1
      });
      const CompressImage = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 240, height: 160 } }],
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.PNG,
          base64: true
        }
      );
      setNewImage(true);
      setOpenCamera(false);
      setImage(CompressImage.base64);
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.1
    });
    if (!result.cancelled) {
      setOpenCamera(false);
      setNewImage(true);
      setImage(result.base64);
    }
  }

  return (
    <>
      {openCamera ? (
        <View style={styles.cameraScreen}>
          <Camera
            style={styles.cameraScreen}
            type={type}
            ref={ref => {
              setCam(ref);
            }}
          >
            <View style={styles.cameraTouchable}>
              <TouchableOpacity onPress={() => pickImage()}>
                <IconButton icon="image-search" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => takePicture()}>
                <IconButton icon="camera-outline" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <IconButton icon="camera-switch" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : null}
      {permission ? (
        <Button
          style={styles.button}
          icon="camera-account"
          disabled={!permission}
          onPress={() => {
            setImage(null);
            setOpenCamera(!openCamera);
          }}
        >
          {newImage ? 'Modifiez la photo' : 'Ajoutez une photo'}
        </Button>
      ) : null}
    </>
  );
}

CameraPicker.propTypes = {
  setImage: PropTypes.func.isRequired
};

export default CameraPicker;
