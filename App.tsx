import React, {useState, useEffect, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import vCard from 'vcard-parser';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function ScannerScreen({navigation}) {
  // Sélectionne la caméra arrière du smartphone
  const device = useCameraDevice('back');

  // variable de l'état de la caméra
  const [isScanningEnabled, setIsScanningEnabled] = useState(true);

  const timeoutIdRef = useRef(null);

  // caractéristiques du scanneur
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async data => {
      console.log(data);
      // au scan d'un QR Code on désactive la caméra
      setIsScanningEnabled(false);
      setTimeout(() => {
        setIsScanningEnabled(true);
      }, 2000);

      const qrCodeType = data[0].type;

      // vérifie le type de QR Code et si c'est bien un VCard et vérifie que la requête renvoie bien un objet https://www.nosdeputes.fr/depute/photo/${id}/200
      if (data[0].value.startsWith('BEGIN:VCARD')) {
        //vérifie que la requête renvoie bien un objet https://www.nosdeputes.fr/depute/photo/${id}/200
        const vCardObject = vCard.parse(data[0].value);
        navigation.navigate('Data', {vCardObject});
      } else {
        navigation.navigate('Refus');
      }
    },
  });

  // gestion de l'état de la caméra
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setIsScanningEnabled(true); // Set isActive to true when navigating away from DataScreen
    });

    return unsubscribe;
  }, [navigation]);

  // **Gérer les changements de focus de navigation pour réactiver le scan**
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setIsScanningEnabled(true);
    });

    return focusListener;
  }, [navigation]);

  useEffect(() => {
    return () => {
      // Effacer le délai d'expiration lors du démontage
    };
  }, []);
  if (device == null) {
    return <View />;
  }

  return (
    // écran de scan
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        codeScanner={codeScanner}
        isActive={isScanningEnabled}
      />
    </View>
  );
}



function DataScreen({navigation, route}) {

  // fonction supprimant tous les accents et caractères spéciaux (ex: ç|à|é)
  function removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const {vCardObject} = route.params;
  // remplace les espaces par des tirets
  const nomSansAccents = removeAccents(vCardObject.fn[0].value);
  // le nom sans accents (pour récupérer la photo de profil)
  const id = nomSansAccents.replace(/\s+/g, '-');


  return (
    // vue affichant les informations sur le parlementaire
    <View style={styles.container}>
      <Image
        source={{
          // récupère la photo de profil du parlementaire
          uri: `https://www.nosdeputes.fr/depute/photo/${id}/200`,
        }}
        style={styles.profilePhoto}
      />
      {/* Affichage des informations de la carte VCard */}
      <View>
        <Text style={styles.title}>Nom complet:</Text>
        <Text style={styles.data}>{vCardObject.fn[0].value}</Text>
      </View>
      <View>
        <Text style={styles.title}>Adresse email:</Text>
        <Text style={styles.data}>{vCardObject.email[0].value}</Text>
      </View>
      <View>
        <Text style={styles.title}>Organisation:</Text>
        <Text style={styles.data}>{vCardObject.org[0].value}</Text>
      </View>
      <View>
        <Text style={styles.title}>Autorisation:</Text>
        <Text style={styles.autorisation}>Autorisé</Text>
      </View>
    </View>
  );
}

function RefusScreen({navigation, route}) {
  // affiche l'écran de refus
  return (
    // vue affichant les informations sur le parlementaire
    <View style={styles.container}>
      <View>
        <Text style={styles.autorisationRefus}>Autorisation refusée : La personne n'est pas reconnue comme étant parlementaire</Text>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    // Route de l'application
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen name="Scan du QR Code" component={ScannerScreen} />
        <Stack.Screen
          name="Data"
          component={DataScreen}
          options={{
            headerTitle: 'Informations sur le parlementaire',
            headerTitleStyle: {
              width: 350,
              marginLeft: -15, // Augmenter la largeur du titre en pixels
            },
          }}
        />
        <Stack.Screen
          name="Refus"
          component={RefusScreen}
          options={{
            headerTitle: 'Personne non autorisée',
            headerTitleStyle: {
              width: 350,
              marginLeft: -15, // Augmenter la largeur du titre en pixels
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// partie mise en forme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,

    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
  },
  data: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    flexDirection: 'row', // Organiser les éléments à l'horizontale
    // justifyContent: 'flex-start', // Déjà appliqué par défaut pour aligner à gauche
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  dataRow: {
    flexDirection: 'row', // Organiser les éléments à l'horizontale
    // justifyContent: 'flex-start', // Déjà appliqué par défaut pour aligner à gauche
    marginBottom: 10,
  },
  autorisation: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'green',
    fontWeight: 'bold',
    fontSize: 50,
  },
  autorisationRefus: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default App;
