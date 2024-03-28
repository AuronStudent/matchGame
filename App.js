import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Vibration,Button } from 'react-native';
import styles from "./Styles/styles";
import { Card } from "./components/card";
import { Audio } from 'expo-av'


export default function App() {
    const localUri = require('./assets/sfx/sound.mp3'); //audio sound effect
    const [cardsFlipped, setCardsFlipped] = useState(0); //check how many cards are flipped
    const [cardOne, setCardOne] = useState(null); // card one value
    const [cardTwo, setCardTwo] = useState(null);// card 2 value
    const [PBO, setPBO] = useState(null);
    const [score, setScore] = useState(0);//score of the game
    let awaitFlip = [false, false, false, false, false, false, false, false, false];
    const [cards, setCards] = useState([]); //array of cards

    //all sounds things go here
    const loadSound = async (uri) => {
        //taken from soundDemo is class
        const { sound } = await Audio.Sound.createAsync(localUri);
        setPBO(sound);
        
    }


    const unloadSound = async () => {
        await PBO.unloadAsync();
        
    }

    const playSound = async () => {
        try {
            await PBO.playAsync();
            
        } catch (e) {
            console.log(e)
        }
    }
    const stopSound = async () => {
        await PBO.stopAsync();
        ;
    }

    //use efffect to see which cards have been flipped
    useEffect(() => {
        
        if ((cardsFlipped != 0) && (cardTwo != null)) {
            if (cardOne === cardTwo) {
                console.log("they match");
                //do something if cards match
                setCardsFlipped(0);
                setCardOne(null);
                setCardTwo(null);
                Vibration.vibrate(); //vibrate is correct
                setScore(score + 100);
                stopSound();
                playSound();
            } else {

                console.log("they dont match");
                //do something if cards dont match
                setCardsFlipped(0);
                setCardOne(null);
                setCardTwo(null);
            }

        }
        

    }, [cardsFlipped])

    useEffect(() => {
        loadSound(localUri);
        return PBO ?
            () => {
                unloadSound();
                
            }
            :undefined
    },[])
    const flipCard = (id) => {
        
        if (cardsFlipped == 0) {
            setCardsFlipped(1);
            setCardOne(id);
            awaitFlip[id] = true;
            
        } else {
            
            setCardsFlipped(2);
            setCardTwo(id)
            awaitFlip[id] = true;
            
        }
        
    }


  

  return (
    <View style={styles.container}>
          <View style={styles.halfScreen}>
              <Text style={{
                  fontSize: 25,
                  borderWidth: 3,
                  padding: 10,
                  marginTop:10,
              }}>Score: {score}</Text>
          </View>
          <View style={styles.grid}>
              
              <Card id={0} picture={1} callback={flipCard} />
              <Card id={1} picture={1} callback={flipCard} />
              <Card id={2} picture={2} callback={flipCard} />
              <Card id={3} picture={2} callback={flipCard} />
              <Card id={4} picture={3} callback={flipCard} />
              <Card id={5} picture={3} callback={flipCard} />
              <Card id={6} picture={4} callback={flipCard} />
              <Card id={7} picture={4} callback={flipCard} />
              <Card id={8} picture={5} callback={flipCard} />
              <Card id={9} picture={5} callback={flipCard} />
              <Card id={10} picture={6} callback={flipCard} />
              <Card id={11} picture={6} callback={flipCard} />

          </View>
          

      <StatusBar style="auto" />
    </View>
  );
}
