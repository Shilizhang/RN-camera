import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, Alert, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class App extends PureComponent  {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			visible:false,
		};
	}

	// 扫码执行回调
	_barcodeDataReceived = e => {
		console.log("123123123")
      this.setState({
        visible: true,
        value: e.data
      })
	};
		

	
  render() {
    const {visible, value} = this.state
    return (
      <View style={styles.container}>
		  {
			  visible?<></>:
			<RNCamera
				ref={ref => {
				this.camera = ref;
				}}
				style={styles.preview}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.on}
				barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
				onBarCodeRead={e => this._barcodeDataReceived(e)}
				androidCameraPermissionOptions={{
				title: 'Permission to use camera',
				message: 'We need your permission to use your camera',
				buttonPositive: 'Ok',
				buttonNegative: 'Cancel',
			}}
			/>

		  }
			<Modal 
			style= {{flex: 1}}
			visible={visible}
			onRequestClose={()=>{}}
			transparent={true}
			animationType={'slide'}
			presentationStyle={'overFullScreen'}
			>
				<TouchableOpacity
					style={[styles.center,styles.container,{backgroundColor: 'white'}]}
					onPress={()=> this.setState({visible: false}) }
				>
					<Text>{value}</Text>
				</TouchableOpacity>
			</Modal>
      </View>
    );
  }

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	  },
	center: {
		justifyContent: "center",
		alignItems: "center"
	},
	headerContainer: {
		height: 50,
		flexDirection: "row",
		paddingHorizontal: 20
	},
	headerLeft: {
		height: 50,
		width: 50,
		justifyContent: "center",
		height: 50
	},
	headerCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	headerCenterTitle: {
		fontWeight: "400",
		fontSize: 22,
		color: "#fff"
	},
	headerRight: {
		width: 50
	},
	tintText: {
		color: "#fff",
		fontSize: 12
	},
	// border: {
	// 	   flex: 0,
	// 	   width: 200,
	//     height: 2,
	//     backgroundColor: '#00FF00',
	// }
});