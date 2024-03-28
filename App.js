import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Vibration } from 'react-native';
import styles from "./Styles/styles";
import { Card } from "./components/card";

export default function App() {
    const [cardsFlipped, setCardsFlipped] = useState(0);
    const [cardOne, setCardOne] = useState(null);
    const [cardTwo, setCardTwo] = useState(null);
    const vibrationMS = 1000;
    
    const flipCard = (picture) => {
        
        if (cardsFlipped == 0) {
            setCardsFlipped(1);
            setCardOne(picture);
            
        } else {
            setCardsFlipped(2);
            setCardTwo(picture)

        }
        
    }
    useEffect(() => {
        if ((cardsFlipped != 0) && (cardTwo!=null)) {
            if (cardOne === cardTwo) {
                console.log("cards match");
                //do something if cards match
                setCardsFlipped(0);
                setCardOne(null);
                setCardTwo(null);
                Vibration.vibrate();
            } else {

                console.log("cards do not match");
                //do something if cards dont match
                setCardsFlipped(0);
                setCardOne(null);
                setCardTwo(null);
            }
            
        }
    },[cardsFlipped])

  return (
    <View style={styles.container}>
          <View style={styles.halfScreen}>

          </View>
          <View style={styles.grid}>
              <Card id={1} picture={1}  callback={flipCard} />
              <Card id={2} picture={1} callback={flipCard} />
              <Card id={3} picture={2}  callback={flipCard} />
              <Card id={4} picture={2} callback={flipCard} />
              <Card id={5} picture={3} callback={flipCard} />
              <Card id={6} picture={3} callback={flipCard} />
              <Card id={7} picture={4} callback={flipCard} />
              <Card id={8} picture={4} callback={flipCard} />
              <Card id={9} picture={5} callback={flipCard} />
          </View>
          

      <StatusBar style="auto" />
    </View>
  );
}
