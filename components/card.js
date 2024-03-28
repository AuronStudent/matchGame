import { Pressable, Text } from 'react-native'
import { useState } from 'react';
import styles from "../Styles/styles"


export const Card = ({ id, picture,disabled,callback}) => {
    const [text, setText] = useState("?");
    const [disable, setDisable] = useState(disabled);

    const flipCard = (pic) => {
        setText(pic);
        //setDisable(true);
    }



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