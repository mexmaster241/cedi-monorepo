import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/app/constants/colors';

export default function DepositScreen() {
  const [amount, setAmount] = useState('0');

  const handleNumberPress = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(prev => prev + num);
    }
  };

  const handleDeletePress = () => {
    setAmount(prev => {
      if (prev.length === 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleContinue = () => {
    router.push({
      pathname: '/deposit/select-recipient',
      params: { amount }
    });
  };

  const formatAmount = (value: string) => {
    const number = parseFloat(value);
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number / 100);
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Depositar</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <Text style={styles.amount}>{formatAmount(amount)}</Text>
          </View>

          <View style={styles.keypad}>
            {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['.', '0', 'del']].map((row, i) => (
              <View key={i} style={styles.keypadRow}>
                {row.map((key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.keypadButton}
                    onPress={() => key === 'del' ? handleDeletePress() : handleNumberPress(key)}
                  >
                    {key === 'del' ? (
                      <Feather name="delete" size={24} color={colors.black} />
                    ) : (
                      <Text style={styles.keypadButtonText}>{key}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.continueButton,
              amount === '0' && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={amount === '0'}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'ClashDisplay',
    fontSize: 20,
    color: colors.black,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  currencySymbol: {
    fontFamily: 'ClashDisplay',
    fontSize: 56,
    color: colors.black,
    marginRight: 8,
  },
  amount: {
    fontFamily: 'ClashDisplay',
    fontSize: 56,
    color: colors.black,
  },
  keypad: {
    flex: 0.8,
    justifyContent: 'center',
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  keypadButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonText: {
    fontFamily: 'ClashDisplay',
    fontSize: 24,
    color: colors.black,
  },
  continueButton: {
    backgroundColor: colors.black,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  continueButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
  continueButtonText: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.white,
  },
});