import { Pressable, Text } from 'react-native'
import { useState, useEffect } from 'react';
import styles from "../Styles/styles"


export const Card = ({ id, picture,disabled,callback}) => {
    const [text, setText] = useState("?");
    const [same, setSame] = useState(disabled)
    const [disable, setDisable] = useState(false);

    const flipCard = (pic) => {
        if (text == pic) {
            setText("?");
        } else {
            setText(pic);
           setDisable(true);
        }
        
    }
    useEffect(() => {
        
        if (same) {
            setDisable(true);
        }
       
    },[text])


    return (
        <Pressable
            style={styles.card}
            onPress={() => { callback(picture) }}
            onPressIn={() => { flipCard(picture) }}
            disabled={disable }
        ><Text style={styles.text}>{text}</Text>
        </Pressable>
    );

}