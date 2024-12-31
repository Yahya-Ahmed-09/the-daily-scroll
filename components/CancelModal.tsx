import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'

import { Colors } from '@/constants/Colors'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';




const CancelModal = () => {
  const { modalVisibility, isModalVisible } = useContext<any>(AuthContext);
  const router = useRouter()



  const onCancel = () => {
    modalVisibility(false)
  }
  const onDiscard = () => {
    modalVisibility(false)
    router.navigate('/(tabs)/account')
  }
  return (
    // <View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          {/* Dark overlay */}
          <View style={styles.overlay} />

          <View style={styles.modalContent}>
            <Text style={styles.text} numberOfLines={2}>
              Are You Sure You Want to Discard Changes?
            </Text>
            <View style={styles.btnContainer}>
              <View>
                <TouchableOpacity activeOpacity={0.6} onPress={onCancel} style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View>
              <TouchableOpacity activeOpacity={0.6} onPress={onDiscard} style={styles.discardBtn}>
                  <Text style={styles.discardText}>Discard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    // </View>
  )
}

export default React.memo(CancelModal)


const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    gap: 20,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(2),
    borderRadius: 20,
    padding: 30,
    gap: 20,
    width: wp(90)
  },
  text: {
    fontFamily: 'poppinsBold',
    textAlign: 'center',
    fontSize: hp(1.5)
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discardBtn: {
    paddingHorizontal: '8%',
    paddingVertical: '4%',
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY
  },
  discardText: {
    textAlign: 'center',
    fontFamily: 'poppinsRegular',
    paddingTop: 5,
    color: Colors.WHITE
  },
  cancelBtn: {
    paddingHorizontal: '8%',
    paddingVertical: '4%',
    borderWidth: 2,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: 10
  },
  cancelText: {
    textAlign: 'center',
    fontFamily: 'poppinsRegular',
    paddingTop: 5,
    color: Colors.LIGHT_GREY
  },
})