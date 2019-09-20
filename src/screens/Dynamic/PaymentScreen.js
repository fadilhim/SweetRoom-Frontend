/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { View, Icon, Header, Left, Body, Right, Button, Title, Item } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'

class PaymentScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            item: props.navigation.getParam('item'),
            retail: props.navigation.getParam('retail'),
            atm: false,
            ibank: false,
            mbank: false,
        }
    }

    render() {
        console.log(this.state.retail, 'retail')
        const {item, retail} = this.state
        return(
            <Fragment>
                <Header style={{backgroundColor: '#fb8691'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('DetailPayment')}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{item ? item.bank_code : retail ? retail.retail_outlet_name : 'wait'}</Title>
                    </Body>
                </Header>
                {item ?
                <ScrollView style={{ flex: 1, paddingTop: 15, }}>
                    <View style={styles.containerView}>
                        <Text style={styles.textheader}>Virtual Account # <Text style={styles.textdecoration}> {item.bank_account_number} </Text></Text>
                        <Text style={styles.textheader}>Virtual Account Name <Text style={styles.textdecoration}> {item.account_holder_name}</Text></Text>
                        <Text style={styles.pleaseread}>Please read the instructions below to complete your transactions.</Text>
                        <TouchableOpacity activeOpacity={1} style={{backgroundColor: '#fb8691', width: '100%', height: 40, borderTopLeftRadius: 10, borderTopRightRadius: 10}} onPress={() => this.setState({atm: !this.state.atm})}>
                            <Text style={styles.collapsetext}>ATM {item.bank_code}</Text>
                        </TouchableOpacity>
                        { this.state.atm ?
                            <View style={styles.collapsebody}>
                                <Text style={styles.contenttext}> 1. Insert your ATM card and select "English"</Text>
                                <Text style={styles.contenttext}> 2. Enter PIN, then select "ENTER"</Text>
                                <Text style={styles.contenttext}> 3. Select "PAYMENT", then select "MULTI PAYMENT"</Text>
                                <Text style={styles.contenttext}> 4. Enter company code "88608" (88608 XENDIT), then press "CORRECT"</Text>
                                <Text style={styles.contenttext}> 5. Enter Virtual Account Number {item.bank_account_number}, then press "CORRECT"</Text>
                                <Text style={styles.contenttext}> 6. Enter the amount to transfer, then press "CORRECT"</Text>
                                <Text style={styles.contenttext}> 7. Customer details will be displayed, Choose number 1 according to the amount billed and then press "YES"</Text>
                                <Text style={styles.contenttext}> 8. Payment confirmation will be displayed. Select "YES", to proceed</Text>
                                <Text style={styles.contenttext}> 9. Keep your receipt as prood of payment</Text>
                                <Text style={styles.contenttext}> 10. Your transaction is successful</Text>
                                <Text style={styles.contenttext}> 11. Once the payment transaction is completed, this invoice will be updated automatically. This may take up to 5 minutes.</Text>
                            </View>
                            :
                            <View></View>
                        }
                        <TouchableOpacity activeOpacity={1} style={{backgroundColor: '#fb8691', width: '100%', height: 40, borderTopColor: 'red', borderTopWidth: 0.5}} onPress={() => this.setState({ibank: !this.state.ibank})}>
                            <Text style={styles.collapsetext}>I-BANKING</Text>
                        </TouchableOpacity>
                        { this.state.ibank ?
                            <View style={styles.collapsebody}>
                                <Text style={styles.contenttext}> 1. Go to Mandiri Internet Banking website https://ib.bankmandiri.co.id</Text>
                                <Text style={styles.contenttext}> 2. Login with your USER ID and PIN</Text>
                                <Text style={styles.contenttext}> 3. Go to the Home page, then select "Payment"</Text>
                                <Text style={styles.contenttext}> 4. Select "Multi Payment"</Text>
                                <Text style={styles.contenttext}> 5. Select "My Account Number"</Text>
                                <Text style={styles.contenttext}> 6. Select 88608 XENDIT as service provider</Text>
                                <Text style={styles.contenttext}> 7. Select "Virtual Account Number"</Text>
                                <Text style={styles.contenttext}> 8. Enter your Virtual Account Number {item.bank_account_number}</Text>
                                <Text style={styles.contenttext}> 9. Go to confirmation page 1</Text>
                                <Text style={styles.contenttext}> 10. Click on TOTAL if all details are correct and then click on "CONTINUE"</Text>
                                <Text style={styles.contenttext}> 11. Go to confirmation page 2</Text>
                                <Text style={styles.contenttext}> 12. Enter Challenge Code from your Internet Banking Token, then click on "Send"</Text>
                                <Text style={styles.contenttext}> 13. You will be directed to the confirmation page once your payment has been completed</Text>
                                <Text style={styles.contenttext}> 14. Once the payment transaction is completed, this invoice will be updated automatically. This may take up to 5 minutes.</Text>
                            </View>
                            :
                            <View></View>
                        }
                        <TouchableOpacity activeOpacity={1} style={{backgroundColor: '#fb8691', width: '100%', height: 40, borderTopColor: 'red', borderTopWidth: 0.5}} onPress={() => this.setState({mbank: !this.state.mbank})}>
                            <Text style={styles.collapsetext}>M-BANKING</Text>
                        </TouchableOpacity>
                        { this.state.mbank ?
                            <View style={styles.collapsebody}>
                                <Text style={styles.contenttext}> 1. Open M-Banking Mandiri, then enter your PIN</Text>
                                <Text style={styles.contenttext}> 2. Select "Payment"</Text>
                                <Text style={styles.contenttext}> 3. Select "Make New Payment"</Text>
                                <Text style={styles.contenttext}> 4. Select "Multi Payment"</Text>
                                <Text style={styles.contenttext}> 5. Select 88608 XENDIT as service provider</Text>
                                <Text style={styles.contenttext}> 6. Enter the Virtual Account Number {item.bank_account_number}</Text>
                                <Text style={styles.contenttext}> 7. Input amount to transfer as shown on the invoice. Mismatched amount may result in a failed and bounced transaction</Text>
                                <Text style={styles.contenttext}> 8. Review and confirm the transaction details</Text>
                                <Text style={styles.contenttext}> 9. Complete the transaction by entering your MPIN</Text>
                                <Text style={styles.contenttext}> 10. Upon successful payment, save the transaction receipt or screenshot the screen as a proof of payment</Text>
                                <Text style={styles.contenttext}> 11. Once the payment transaction is completed, this invoice will be updated automatically. This may take up to 5 minutes.</Text>
                            </View>
                            :
                            <View></View>
                        }
                    </View>
                </ScrollView>
                :
                <View>
                    <Text style={styles.textheader}>Your payment code is</Text>
                    <Text style={styles.textdecoration2}>{retail.payment_code}</Text>
                    <Text style={styles.textheader}>Your bill is</Text>
                    <Text style={styles.textdecoration2}>{retail.transfer_amount}</Text>
                    <Text style={styles.pleaseread}>Please read the instructions below to complete your transactions.</Text>
                    <View style={styles.collapsebody}>
                        <Text style={styles.contenttext}> 1. Visit your nearest Alfamart or Alfamidi stores before the time on the invoice runs out</Text>
                        <Text style={styles.contenttext}> 2. Tell the Cashier you would like to make payment to "XENDIT"</Text>
                        <Text style={styles.contenttext}> 3. If the Cashier is unaware of "XENDIT", show the Cashier the name "XENDIT" on the invoice.</Text>
                        <Text style={styles.contenttext}> 4. Quote or present the payment code on the invoice to the Cashier and confirm the amount is correct.</Text>
                        <Text style={styles.contenttext}> 5. Proceed to make payment with the amount on your invoice.</Text>
                        <Text style={styles.contenttext}> 6. Receive your proof of payment from Alfamart.</Text>
                        <Text style={styles.contenttext}> 7. Congratulations! You have successfully completed your transaction.</Text>
                    </View>
                </View>
                }
                
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    containerView:{
        paddingLeft: 13,
        paddingRight: 13,
    },
    textheader: {
        margin: 5,
        fontSize: 17
    },
    textdecoration: {
        color: '#111E6C',
        fontWeight: 'bold'
    },
    collapsetext: {
        color: 'white',
        margin: 10
    },
    collapsebody: {
        backgroundColor: '#e5e6eb'
    },
    contenttext: {
        margin: 5
    },
    pleaseread: {
        margin: 8,
        fontSize: 13
    },
    textdecoration2: {
        color: '#111E6C',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 5
    }
})

export default PaymentScreen