import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StartScreen = () => {
    const navigation = useNavigation();

    console.log('Start Screen Rendered');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.heroSection}>
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                        style={styles.heroImage}
                    />
                    <View style={styles.heroOverlay} />
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Welcome to Your Wedding Planner
                        </Text>
                        <Text style={styles.subtitle}>
                            Plan your perfect day with ease.
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Pressable
                    onPress={() => navigation.navigate('Register')}
                    style={styles.getStartedButton}>
                    <Text style={styles.getStartedButtonText}>
                        Get Started
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.loginPressable}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>
                        Already have an account? Login
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    heroSection: {
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'white',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    subtitle: {
        marginTop: 10,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    footer: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    getStartedButton: {
        backgroundColor: '#C5A653',
        padding: 15,
        borderRadius: 7,
    },
    getStartedButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginPressable: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        color: 'gray',
        fontSize: 16,
    },
});
