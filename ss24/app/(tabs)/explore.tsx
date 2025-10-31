import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const TIEN_ICH = [
  { label: 'Shop', icon: '🛒' },
  { label: 'Home & Car', icon: '🏠' },
  { label: 'Sticker', icon: '😆' },
  { label: 'eGovernment', icon: '🏛️' },
  { label: 'Ví ZaloPay', icon: '💸' },
  { label: 'Nạp tiền ĐT', icon: '💳' },
  { label: 'Trả Hóa Đơn', icon: '🧾' },
  { label: 'Fiza', icon: '🔑' },
  { label: 'Tích lũy', icon: '📈' },
  { label: 'Mini Apps', icon: '⚡' },
];

const XO_SO = [
  { location: 'Đà Lạt', code: '440765' },
  { location: 'Tiền Giang', code: '864379' },
  { location: 'Kiên Giang', code: '556519' },
];

const MON_NGON = [
  { label: 'Gần bạn', icon: '📍' },
  { label: 'Thực phẩm', icon: '🍖' },
  { label: 'Đồ ăn vặt', icon: '🍟' },
  { label: 'Đặc sản', icon: '🦐' },
];

export default function ExploreScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f8' }}>
      {/* Search bar trên cùng */}
      <View style={styles.searchBarContainer}>
        <Text style={{ color: '#a6e7fb', fontSize: 23, marginRight: 4 }}>🔍</Text>
        <Text style={styles.searchBarText}>Tìm kiếm</Text>
        <View style={{flex:1}}/>
        <Text style={{ color: '#a6e7fb', fontSize: 20, marginLeft: 8 }}>☰</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tiện ích cho bạn */}
        <View style={{backgroundColor: '#fff', borderRadius: 16, margin: 12, marginBottom: 0, paddingTop: 8}}>
          <Text style={styles.label}>Tiện ích cho bạn</Text>
          <View style={styles.tienichPanel}>
            {TIEN_ICH.map((item, idx) => (
              <View key={idx} style={styles.iconCol}>
                <View style={styles.iconCircle}><Text style={{ fontSize: 22 }}>{item.icon}</Text></View>
                <Text style={styles.iconLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Line phân cách lớn */}
        <View style={styles.bigLine} />
        {/* Khối Dò vé số */}
        <View style={{paddingHorizontal: 12}}>
        <View style={styles.xosoOuter}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontSize: 17, marginRight: 3, color: '#ff8f23' }}>🔥</Text>
            <Text style={styles.xosoTitle}>Xem chi tiết kết quả hôm nay</Text>
            <Text style={styles.xosoRegion}>. Miền Nam</Text>
          </View>
          {XO_SO.map((item, idx) => (
            <View key={idx} style={styles.xosoRow}>
              <Text style={styles.xosoLocation}>{item.location}</Text>
              <Text style={styles.xosoCode}>{item.code}</Text>
            </View>
          ))}
          <View style={styles.xosoBtnRow}>
            <TouchableOpacity style={styles.xosoBtnOutline}><Text style={styles.xosoBtnOutlineText}>Dò kết quả xổ số hằng ngày</Text></TouchableOpacity>
            <TouchableOpacity style={styles.xosoBtnFilled}><Text style={styles.xosoBtnFilledText}>Dò ngay</Text></TouchableOpacity>
          </View>
        </View>
        </View>
        <View style={styles.bigLine} />
        {/* Món ngon gần bạn trên Zalo Connect */}
        <View style={styles.monngonOuter}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10, marginLeft: 3 }}>Món ngon gần bạn trên Zalo Connect</Text>
          <View style={styles.mgSearchRow}>
            <Text style={{ fontSize: 18, marginHorizontal: 7, color: '#878787' }}>🔍</Text>
            <TextInput style={styles.mgSearchInput} placeholder="Mật ong" placeholderTextColor="#bebebe"/>
          </View>
          <View style={styles.monngonPanel}>
            {MON_NGON.map((item, idx) => (
              <View key={idx} style={styles.monngonCol}>
                <View style={styles.iconCircleSmall}><Text style={{ fontSize: 20 }}>{item.icon}</Text></View>
                <Text style={styles.monngonLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ height: 28 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15b4e5',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  searchBarText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 2,
  },
  label: {
    fontSize: 13,
    color: '#242423',
    fontWeight: '500',
    marginLeft: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  tienichPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 2,
    marginBottom: 9,
    marginTop: 5,
  },
  iconCol: {
    width: '20%',
    alignItems: 'center',
    marginVertical: 12,
  },
  iconCircle: {
    backgroundColor: '#e7f5fa',
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconLabel: { textAlign: 'center', fontSize: 12, color: '#444', marginTop: 1 },
  bigLine: { height: 8, backgroundColor: '#ededed', marginHorizontal: 0, marginVertical: 8 },
  // Xổ số
  xosoOuter: {
    backgroundColor: '#fff8ed',
    borderRadius: 13,
    padding: 15,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 6,
    shadowOffset: { height: 1, width: 0},
    elevation: 2,
  },
  xosoTitle: { color: '#ff8f23', fontWeight: '600', fontSize: 13 },
  xosoRegion: { color: '#a8a8a8', fontSize: 12, marginLeft: 7 },
  xosoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
    paddingHorizontal: 2,
  },
  xosoLocation: { color: '#784509', fontSize: 14 },
  xosoCode: { color: '#e47e43', fontWeight: 'bold', fontSize: 15 },
  xosoBtnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  xosoBtnOutline: {
    borderWidth: 1, borderColor: '#e47e43', borderRadius: 7, paddingHorizontal: 12, paddingVertical: 5, marginRight: 7, backgroundColor:'transparent'
  },
  xosoBtnOutlineText: { color: '#e47e43', fontWeight: 'bold', fontSize: 13 },
  xosoBtnFilled: { backgroundColor: '#e47e43', borderRadius: 7, paddingHorizontal: 20, paddingVertical: 5 },
  xosoBtnFilledText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  // Món ngon gần bạn
  monngonOuter: { backgroundColor:'#fff', borderRadius:13, margin:12, marginTop: 0, padding:14 },
  mgSearchRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f3f6', borderRadius: 7, marginBottom: 14, height: 37, marginHorizontal: 0, paddingHorizontal: 4
  },
  mgSearchInput: { flex: 1, backgroundColor: 'transparent', fontSize: 14, color: '#222', padding: 0 },
  monngonPanel: { flexDirection: 'row', marginLeft: 10, marginTop: 3 },
  monngonCol: { alignItems: 'center', marginRight: 29, marginTop: 1 },
  monngonLabel: { fontSize: 12, color: '#444', marginTop: 3 },
  iconCircleSmall: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#e7f5fa', alignItems: 'center', justifyContent: 'center',
  },
});

