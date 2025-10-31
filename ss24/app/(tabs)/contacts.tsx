import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const FRIENDS = [
  { key: 'B', data: [
    { name: 'Ba Nam', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Bảo Ngọc', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Bee', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { name: 'Boss', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ]},
  { key: 'C', data: [
    { name: 'Cường', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
  ]},
  { key: 'D', data: [
    { name: 'Duy', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
  ]},
];

export default function ContactsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f5fa' }}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBarRow}>
        <Text style={styles.searchBarIconL}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm bạn bè,tin nhắn...."
          placeholderTextColor="#bdf2fd"
        />
        <TouchableOpacity style={styles.searchBarIconR}><Text style={{fontSize:17,color:'#a0e6fa'}}>👤</Text></TouchableOpacity>
        <TouchableOpacity style={styles.searchBarIconR}><Text style={{fontSize:19,color:'#a0e6fa',marginRight:3}}>＋</Text></TouchableOpacity>
      </View>
      {/* Tab menu ngang */}
      <View style={styles.menuTabRow}>
        <View style={styles.menuTabActive}><Text style={styles.menuTabTextActive}>BẠN BÈ</Text></View>
        <View style={styles.menuTab}><Text style={styles.menuTabText}>NHÓM</Text></View>
        <View style={styles.menuTab}><Text style={styles.menuTabText}>OA</Text></View>
      </View>
      {/* Underline cho active tab */}
      <View style={{flexDirection:'row',height:3,marginBottom:2}}>
        <View style={{flex:1,backgroundColor:'#19b4ee',borderTopLeftRadius:2,borderTopRightRadius:2}}/>
        <View style={{flex:2,backgroundColor:'transparent'}}/>
      </View>
      {/* Top feature blocks*/}
      <View style={styles.featureBlocksOuter}>
        <View style={styles.featureBlock}>
          <View style={[styles.featureIcon, {backgroundColor:'#198cf9'}]}><Text style={{color:'#fff',fontSize:16}}>👫</Text></View>
          <View>
            <Text style={styles.featureLabel}>Lời mời kết bạn</Text>
          </View>
        </View>
        <View style={styles.featureBlock}>
          <View style={[styles.featureIcon, {backgroundColor:'#198cf9'}]}><Text style={{color:'#fff',fontSize:18}}>📱</Text></View>
          <View>
            <Text style={styles.featureLabel}>Danh bạ máy</Text>
            <Text style={styles.featureSubLabel}>Các liên hệ có dùng Zalo</Text>
          </View>
        </View>
      </View>
      {/* Tabs nhỏ */}
      <View style={{flexDirection:'row',alignItems:'center',marginTop:5,marginHorizontal:10}}>
        <View style={styles.subtabActive}><Text style={styles.subtabTextActive}>Tất cả</Text></View>
        <View style={styles.subtab}><Text style={styles.subtabText}>Mới truy cập</Text></View>
      </View>
      {/* Danh sách bạn bè */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
            {FRIENDS.map((group)=> (
              <View key={group.key}>
                <Text style={styles.alphaLabel}>{group.key}</Text>
                {group.data.map((f, idx)=>(
                  <View key={idx} style={styles.friendRow}>
                    <Image source={{uri:f.avatar}} style={styles.friendAvatar}/>
                    <Text style={styles.friendName}>{f.name}</Text>
                    <View style={{flexDirection:'row',marginLeft:'auto'}}>
                      <TouchableOpacity style={styles.callBtn}><Text>📞</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.callBtn}><Text>🎥</Text></TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
          {/* Index column chữ cái */}
          <View style={styles.indexCol}>
            {['A','B','C','D','H','K','L','M','N','P','Q','R','T','V','Z','#'].map(letter=>
              <Text style={styles.indexItem} key={letter}>{letter}</Text>
            )}
          </View>
        </View>
        <View style={{height:30}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19b4ee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  searchBarIconL: { fontSize:17, color:'#b2ebf4', marginRight:4 },
  searchBarIconR: { marginLeft: 6, paddingHorizontal: 2, paddingVertical: 2 },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal:9,
    backgroundColor:'#09a4e5',
    borderRadius:7,
    fontSize:14,
    color:'#fff',
    marginRight:3
  },
  menuTabRow: {
    flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#d9edf8',paddingHorizontal:0
  },
  menuTab: { flex:1, paddingVertical:8, alignItems:'center' },
  menuTabActive: { flex:1, paddingVertical:8, alignItems:'center'},
  menuTabText: { color:'#7f7f7f', fontSize:13, fontWeight:'500' },
  menuTabTextActive: { color:'#222', fontWeight:'bold', fontSize:13 },
  featureBlocksOuter: { marginHorizontal:0, backgroundColor:'#f9fafe',paddingVertical:2 },
  featureBlock: { flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderRadius:10, marginTop:10, paddingVertical:11, paddingHorizontal:14, marginHorizontal:10 },
  featureIcon:{ width:32, height:32, borderRadius:16, alignItems:'center', justifyContent:'center', marginRight:11,},
  featureLabel: { fontSize:15, color:'#1b1b22', fontWeight:'600' },
  featureSubLabel: { fontSize:12, color:'#b7b7bb', marginTop:2 },
  subtabActive:{ backgroundColor:'#e6f5fd', paddingVertical:7,paddingHorizontal:14, borderRadius:13, marginRight:8 },
  subtab:{ paddingVertical:7,paddingHorizontal:14, borderRadius:13 },
  subtabTextActive:{color:'#19b4ee',fontWeight:'bold',fontSize:13},
  subtabText:{color:'#8a8a8a',fontSize:13},
  alphaLabel:{marginTop:16,marginBottom:3,marginLeft:20,fontSize:12,fontWeight:'bold',color:'#7f9aad'},
  friendRow:{ flexDirection:'row',alignItems:'center',backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#ededed',paddingVertical:12,paddingHorizontal:16 },
  friendAvatar:{width:43,height:43,borderRadius:22,marginRight:15 },
  friendName:{fontSize:15,color:'#222',fontWeight:'500',maxWidth:150},
  callBtn:{marginLeft:9, padding:7, borderRadius:8},
  indexCol:{ width:21,alignItems:'center',paddingTop:19 },
  indexItem:{ color:'#b6bac6', fontSize:11, paddingVertical:0 },
});
