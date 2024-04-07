# WeatherApp

## 소개 

openWeather API를 사용하여 만든 간단한 현재 날씨를 알려주는 앱입니다.

## 교육

노마드 코더의 "왕초보를 위한 React Native 101"을 보고 만든 ToDoApp입니다.

## 배운점

1. React Native는 웹 사이트가 아니다.
	- HTML이 아니기 때문에 `div` 같은 태그는 사용할 수 없다. ❌
	- 대신 `View`라는 컨테이너가 있다.
		- 항상 `Import` 해줘야 한다.
```jsx
import { View } from 'react-native'

<View></View>
```

2. React Native에 있는 모든 text는 `Text` 컴포넌트에 들어있어야 한다.
	- `span`, `p`같은 태그는 사용할 수 없다. ❌
	- 항상 `Import` 해줘야 한다.
```jsx
import { Text } from 'react-native'

<Text>text</Text>
```

3. 일부 style을 사용할 수 없다. ❌
	- `ex` border같은 일부 style은 사용할 수 없다.
	- `StyleSheet.create`로 `object`를 생성
	- `StyleSheet`를 사용하는 이유
		- 좋은 성능의 자동 완성 기능 제공
	- `StyleSheet`가 꼭 필요한 것은 아니다.
```jsx
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
```

4. `StatusBar`는 React Native에서 import하는 패키지가 아니라 **다른 패키지다,**
	- `StatusBar`는 와이파이 시계 같은 것들을 말한다.
	- 운영체제와 소통하는 component라는 증거이다.

- 모든 `View`는 flex container이다.
- 웹의 기본값은 `Row` <-> 모바일의 기본값은 `Column`

```jsx
    <View style={{flexDirection: 'row'}}>
      <View style={{width: 200, height: 200, backgroundColor: 'tomato'}}></View>
      <View style={{width: 200, height: 200, backgroundColor: 'teal'}}></View>
      <View style={{width: 200, height: 200, backgroundColor: 'orange'}}></View>
    </View>
```

- `witdh`와 `height`에 기반해서 레이아웃을 만들지 않음
	- 반응형을 생각해서 레이아웃을 구현해야 함
	- 아이콘이나 아바타의 경우에는 사용

- `flex`를 사용하여 컨테이너에 각각에 비율을 지정할 수 있다.
   - 부모 태그에 있는 `flex`는 1이든 50이든 변화 없이 똑같다. 

ScrollView`는 스크롤을 할 수 있게 해주는 뷰다.

```jsx
<ScrollView></ScrollView>
```

- `ContainerStyle`을 써야 스타일을 입힐 수 있다.
- `flex`를 줄 필요가 없다.
	- `ScrollView`는 스크린보다 더 나아가야 하기 때문

- 디바이스 width, height 크기 가져오는 API
```jsx
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
```

- `pagingEnabled` 속성을 사용하면 페이지 별로 스크롤 가능하다.

터치를 하고 싶은 뷰를 만들고 싶으면 다음과 같은 컴포넌트를 사용해야 하낟.

- `TouchableOpacity` 
	- View가 터치에 적절하게 반응하도록 하는 래퍼.  
	- 아래로 누르면 래핑된 View의 opacity가 감소하여 흐리게 표시됩니다.
- `TouchableHighlight`
	- View가 터치에 적절하게 반응하도록 하는 래퍼.  
	- 아래로 누르면 래핑된 View의 background를 표시합니다.
- `TouchableWithoutFeedback`
	- 합당한 이유가 없는 한 사용하지 마십시오.  
	- Press에 반응하는 모든 요소는 만졌을 때 시각적 피드백이 있어야 합니다.
- `Pressable` 
	- Pressable은 정의된 자식에 대한 다양한 Press 상호 작용 단계를 감지할 수 있는 핵심 구성 요소 래퍼입니다.

각각 속성으로 `onPress` 가 있으며 해당 터치 이벤트가 존재한다.

`TextInput`으로 텍스트를 입력할 수 있다.

- `onChangeText`로 텍스트 저장 할 수 있음
- `onSubmitEditing`는 버튼을 눌렀을 때 호출되는 콜백이다.

```jsx
const onChangeText = (event: string) => setValue(event);
const addToDo = () => {
    if (value === '') {
      return;
    }
    // save to do
    const newToDos = Object.assign({}, toDos, {[Date.now()]: {value, working}});
    setToDos(newToDos);
    setValue('');
};

<TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={value}
        multiline
        style={styles.input}
        placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
      />
```

## 화면

![image](https://github.com/springhana/RN_weatherApp/assets/97121074/7c19ab45-a092-4fa5-89f9-acf94e0abd14)
