import {Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext} from 'react'

import { Colors } from '@/constants/Colors'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';




const CancelModal = () => {
    const { modalVisibility, isModalVisible } = useContext<any>(AuthContext);
    const router  = useRouter()


    const onCancel = () => {
        modalVisibility(false)
    }
    const onDiscard =()=>{
        modalVisibility(false)
        router.navigate('/(tabs)/account')
    }
    return (
        <View>
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
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.cancelBtn}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.discardBtn}
                onPress={onDiscard}
              >
                <Text style={styles.discardText}>Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    )
}

export default React.memo(CancelModal)

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
        width: wp(90), 
      },
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(2),
        borderRadius: 20,
        padding: 30,
        gap: 20,
        flex: 1
        
    },
    text: {
        fontFamily: 'poppinsBold',
        textAlign: 'center',
        fontSize: hp(1.5)
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
    },
    discardBtn: {
        paddingHorizontal: wp(6),
        paddingVertical: hp(1),
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.PRIMARY,
    },
    discardText: {
        fontFamily: 'poppinsRegular',
        paddingTop: 5,
        color: Colors.WHITE
    },
    cancelBtn: {
      paddingHorizontal: wp(6),
      paddingVertical: hp(1),
        borderWidth: 2,
        borderColor: Colors.LIGHT_GREY,
        borderRadius: 10
    },
    cancelText: {
        fontFamily: 'poppinsRegular',
        paddingTop: 5,
        color: Colors.LIGHT_GREY
    },
})