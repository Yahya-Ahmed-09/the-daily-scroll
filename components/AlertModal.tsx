import { Modal, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
    visibility: boolean,
    email: string,
    onClose: ()=> void
}
const AlertModal: React.FC<Props> = ({ visibility,email, onClose }) => {
    const onOkBtn =()=>{
        onClose()
        // router.navigate('/Login')
    }
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visibility}
        >
            <View style={styles.modalContainer}>
                {/* Dark overlay */}
                <View style={styles.overlay} />
                <View style={styles.modalContent}>
                    <View style={styles.main}>
                        <Text style={styles.heading}>Check Your Inbox</Text>
                        <Text style={styles.text}>Please check the email address <Text style={styles.emailtext}>{email}</Text> for instructions to rest your password</Text>
                        <View>
                            <Text style={styles.text}>If you don't get the link, check your spam folder</Text>
                        </View>


                        <TouchableOpacity onPress={onOkBtn} style={styles.btn}>
                            <Text style={styles.btnText}>OK</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default React.memo(AlertModal)

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
        width: wp(80),
    },
    main:{
        gap: 10
    },
    heading:{
        fontFamily:"poppinsBold",
        fontSize: hp(2)
    },
    text:{
        fontSize: hp(1.2),
        fontFamily: 'poppinsRegular'
    },
    emailtext:{
        fontFamily: 'poppinsBold'
    },
    btn:{
        width: '100%',
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15
    },
    btnText:{
        textAlign: 'center',
        paddingTop: 5,
        fontFamily: 'poppinsRegular',
        color: Colors.WHITE
    }
})