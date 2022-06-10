import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const key = route.params.key;

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   getDataBarang();
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = (y) => {
    setLoading(true);
    axios.post(urlAPI + '/1data_barang.php', {
      key: route.params.key,
      key2: y,
      id_user: route.params.id_user
    }).then(res => {
      console.warn(res.data);
      setLoading(false);
      setData(res.data);
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Pinjam', item);
      }}
      style={{
        flex: 1,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
        marginHorizontal: 2,
        marginVertical: 2,

        backgroundColor: 'white',
      }}>

      <View style={{
        paddingVertical: 5,
        flexDirection: 'row',
      }}>
        <View style={{
          flex: 1,
        }}>

          <Text
            style={{

              fontSize: windowWidth / 35,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            {item.nama_barang}
          </Text>
          <Text
            style={{
              marginTop: 5,
              backgroundColor: colors.primary,
              maxWidth: '50%',
              fontSize: windowWidth / 35,
              color: colors.white, borderRadius: 2,
              textAlign: 'center',
              fontFamily: fonts.secondary[400],
            }}>
            {item.nama_kategori}
          </Text>
        </View>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.primary,
            fontFamily: fonts.secondary[600],
          }}>
          Rp. {new Intl.NumberFormat().format(item.harga_barang)}
        </Text>

      </View>


    </TouchableOpacity>
  );

  return (
    <SafeAreaView

      style={{
        padding: 10,
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View>
        <TextInput autoCapitalize='none' onSubmitEditing={(x) => {
          console.warn(x.nativeEvent.text);
          getDataBarang(x.nativeEvent.text)
        }} placeholder='Masukan kata kunci' style={{
          fontFamily: fonts.secondary[400],
          paddingLeft: 10,
          fontSize: windowWidth / 25,
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 10,
        }} />

      </View>
      {loading && <View style={{
        flex: 1,
        marginTop: '50%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={colors.primary} /></View>}
      {!loading && <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
