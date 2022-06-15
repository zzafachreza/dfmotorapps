import React, { useState, useEffect } from 'react';
import {
  View,
  Linking,
} from 'react-native';
import { getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function Wa() {

  const isFocused = useIsFocused();
  useEffect(() => {

    if (isFocused) {
      axios.get(urlAPI + '/wa.php').then(res => {

        Linking.openURL(
          res.data,
        )

      });
    }
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}>

    </View>
  );
}

