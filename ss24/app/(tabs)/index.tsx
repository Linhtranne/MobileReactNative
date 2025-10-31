import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const CHATS = [
  {
    name: 'Media Box',
    subtitle: 'Zing MP3: [APP] Hãy để KAKA khai...',
    time: '',
    avatar: require('@/assets/images/react-logo.png'),
    unread: true,
    icon: '🎵',
  },
  {
    name: 'Thời Tiết',
    subtitle: 'Chất lượng không khí Sài Gòn ổ...',
    time: '5 giờ',
    avatar: require('@/assets/images/react-logo.png'),
    unread: true,
    icon: '⛅',
  },
  {
    name: 'Cộng đồng Game Online',
    subtitle: 'Thư Giãn Sảng Khoái Cùng Crazy...',
    time: 'T4',
    avatar: require('@/assets/images/react-logo.png'),
    unread: true,
    icon: '🎮',
  },
  {
    name: 'ZaloPay',
    subtitle: 'Bạn có voucher Hóa đơn! Giảm 50K...',
    time: 'T2',
    avatar: require('@/assets/images/react-logo.png'),
    unread: true,
    icon: '💳',
  },
  {
    name: 'Zalo Sticker',
    subtitle: 'ỦA ĐANG CHƠI DZUI TỰ NHIÊN KỊA?...',
    time: 'T2',
    avatar: require('@/assets/images/react-logo.png'),
    unread: true,
    icon: '🤣',
  },
];

export default function MessageListScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f5fa' }}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBarRow}>
        <Text style={{fontSize:18,color:'#a0e6fa',marginLeft:5,marginRight:3}}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#bdf2fd"
        />
        <TouchableOpacity style={styles.searchBarIcon}><Text style={{fontSize:18, color:'#a0e6fa'}}>☰</Text></TouchableOpacity>
        <TouchableOpacity style={styles.searchBarIcon}><Text style={{fontSize:21, color:'#a0e6fa',lineHeight:24}}>＋</Text></TouchableOpacity>
      </View>
      {/* Cloud của tôi */}
      <View style={styles.cloudWrap}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={styles.cloudIcon}>☁️</Text>
          <View style={{marginLeft:9}}>
            <Text style={styles.cloudTitle}>Cloud của tôi</Text>
            <Text style={styles.cloudSub}>Cuộc trò chuyện này đang được ghim</Text>
          </View>
        </View>
        <Text style={styles.pinIcon}>📌</Text>
      </View>
      <ScrollView>
        {CHATS.map((item, idx) => (
          <View key={idx} style={styles.chatRow}>
            <View style={styles.avatarWrap}>
              <Text style={{fontSize:25}}>{item.icon}</Text>
            </View>
            <View style={styles.chatContent}>
              <View style={{flexDirection:'row',alignItems:'center',marginBottom:2}}>
                <Text numberOfLines={1} style={styles.chatName}>{item.name}</Text>
                {item.time ? (
                  <Text style={styles.timeText}>{item.time}</Text>
                ) : null}
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text numberOfLines={1} style={styles.chatSubtitle}>{item.subtitle}</Text>
                {item.unread ? (
                  <View style={styles.unreadBadge}><Text style={styles.newText}>N</Text></View>
                ) : null}
              </View>
            </View>
          </View>
        ))}
        <View style={{height:12}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Thanh tìm kiếm
  searchBarRow: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#19b4ee',
    borderBottomColor:'#daf6fd',
    borderBottomWidth:1,
    paddingHorizontal:6,
    paddingVertical:4,
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
  },
  searchInput:{
    flex:1,
    paddingVertical:6,
    paddingHorizontal:7,
    color:'#fff',
    fontSize:15,
    backgroundColor:'#09a4e5',
    borderRadius:6,
    marginHorizontal:3,
  },
  searchBarIcon: {
    marginLeft: 5,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  // Cloud
  cloudWrap: {
    backgroundColor:'#fff',
    margin:6,
    marginTop:9,
    borderRadius:11,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:7,
    paddingHorizontal:11,
    borderColor:'#e5e5e7',
    borderWidth:1,
  },
  cloudIcon:{fontSize:24,marginRight:3},
  cloudTitle:{fontWeight:'bold',color:'#1b1b22',fontSize:15},
  cloudSub:{color:'#b6bcc6',fontSize:12,marginTop:1},
  pinIcon:{fontSize:20,marginLeft:16,opacity:0.9},
  // Chat
  chatRow:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    borderBottomColor:'#edefee',
    borderBottomWidth:1.2,
    paddingLeft:14,
    paddingRight:9,
    paddingVertical:13,
  },
  avatarWrap:{
    width:42,
    height:42,
    borderRadius:21,
    backgroundColor:'#ebefff',
    alignItems:'center',
    justifyContent:'center',
    marginRight:13,
  },
  chatContent:{flex:1,overflow:'hidden'},
  chatName:{fontWeight:'bold',color:'#222',fontSize:15,flexShrink:1,maxWidth:'70%' },
  chatSubtitle:{fontSize:13,color:'#545252',maxWidth:'80%',flexShrink:1},
  timeText:{fontSize:12,color:'#a7afba',marginLeft:7},
  unreadBadge:{backgroundColor:'#e24040',borderRadius:8,marginLeft:7,paddingHorizontal:5,marginTop:1,paddingVertical:1},
  newText:{color:'#fff',fontSize:10},
});
