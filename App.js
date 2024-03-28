import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Vibration,Button } from 'react-native';
import styles from "./Styles/styles";
import { Card } from "./components/card";
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av'



export default function App() {
    const localUri = require('./assets/sfx/sound.mp3'); //audio sound effect
    const [cardsFlipped, setCardsFlipped] = useState(0); //check how many cards are flipped
    const [cardOne, setCardOne] = useState(0); // card one value
    const [cardTwo, setCardTwo] = useState(null);// card 2 value
    const [PBO, setPBO] = useState(null);
    const [score, setScore] = useState(0);//score of the game
    const scoreKeeperFile = 'score.json'; //score file

    //instructor referenced code
    const loadState = async () => {
        try {
            
            //get string of the state
            const currentStateString = await FileSystem.readAsStringAsync(
                FileSystem.documentDirectory + scoreKeeperFile
            );
            // convert it to an object
            currentState = JSON.parse(currentStateString)
            // extract score from state
            setScore(currentState.score);
            
        } catch (e) {
            console.log(e);
            
            saveState();
        }
    }
    //instructor referenced code
    const saveState = async () => {
        const currentScore = { "score": score };
        try {
            await FileSystem.writeAsStringAsync(
                FileSystem.documentDirectory + scoreKeeperFile,
                JSON.stringify(currentScore)
            );
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        
        loadState();
        return () => {saveState }
    },[])

    //all sounds things go here
    const loadSound = async (uri) => {
        //taken from soundDemo in class
        const { sound } = await Audio.Sound.createAsync(localUri);
        setPBO(sound);
        
    }

    useEffect(() => {
        saveState();
    }, [score])

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
                setCardOne(0);
                setCardTwo(null);
                Vibration.vibrate(); //vibrate if correct
                setScore(score + 100);
                stopSound(); //make sure there is not a sound playing
                playSound(); //play the sound if correct
            } else {
                
                console.log("they dont match");
                //do something if cards dont match
                setCardsFlipped(0);
                setCardOne(0);
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
    const flipCard = (pic) => {
        
        if (cardsFlipped == 0) {
            setCardsFlipped(1);
            setCardOne(pic);
            
            
        } else {
            
            setCardsFlipped(2);
            setCardTwo(pic)
            
            
        }
        
        console.log(pic)
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
              
              <Card id={0} picture={3} disabled={cardOne===cardTwo}  callback={flipCard} />
              <Card id={1} picture={1} disabled={cardOne === cardTwo } callback={flipCard} />
              <Card id={2} picture={4} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={3} picture={7} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={4} picture={5} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={5} picture={2} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={6} picture={4} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={7} picture={3} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={8} picture={7} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={9} picture={2} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={10} picture={6} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={11} picture={6} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={12} picture={1} disabled={cardOne === cardTwo} callback={flipCard} />
              <Card id={13} picture={5} disabled={cardOne === cardTwo} callback={flipCard} />

          </View>
          

      <StatusBar style="auto" />
    </View>
  );
}
