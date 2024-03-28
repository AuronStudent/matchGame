import { Pressable, Text } from 'react-native'
import { useState } from 'react';
import styles from "../Styles/styles"


export const Card = ({ id, picture,callback }) => {
    const [text, setText] = useState("?");
    const flipCard = (pic) => {
        setText(pic);
    }



    return (
        <Pressable
            style={styles.card}
            onPress={() => { callback(picture) }}
            onPressIn={() => {flipCard(picture) } }
        ><Text style={styles.text}>{text}</Text>
        </Pressable>
    );

}