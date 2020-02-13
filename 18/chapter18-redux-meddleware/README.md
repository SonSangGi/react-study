# 리덕스 미들웨어를 통한 비동기 작업 관리

### 미들웨어란?

리덕스 미들웨어는 액션을 디스패치 했을 때 리듀서에서 이를 처리하기 전 실행되는 작업이다.
액션과 리듀서 사이의 중간자라고 볼 수 있다.

```
액션 -> 미들웨어 -> 리듀서 -> 스토어
```

예를 들면 전달받은 액션을 콘솔에 기록하거나, 전달받은 액션 정보를 취소하거나, 다른 종류의 액션을 추가로 디스패치할 수 있다.

## 미들웨어 만들기

실제 프로젝트에서 미들웨어를 직접 만들 일은 많지 않다. 다른 개발자가 만들어 놓은 미들웨어를 사용하면 되기 때문이다. 하지만 어떻게 작동하는지 이해하려면 만들어보는 것이 효과적이기 때문에 간단한 미들웨어를 만들어보도록 하자.

```js
const loggerMiddleware = store => next => action => {
  //미들웨어 기본 구조
};

export default loggerMiddleware;
```

일반적인 미들웨어 구조는 다음과 같은데, 화살표 함수를 연달아 사용한것을 일반 function으로 작성한다면 이렇게 된다.

```js
const loggerMiddleware = function loggerMiddleware(store) {
    return function(next) {
        return (action) {
            // 미들웨어 기본 구조
        }
    }
}
```

미들웨어는 결국 함수를 반환하는 함수를 반환하는 함수이다. 파라미터는 이전 장에서 배운 redux에서 보낸 store, action이다.
반면 생소한 next는 store.dispath와 비슷한 역할을 하는 함수형태의 파라미터이다. 하지만 dispath와 큰 차이점이 있는데, 이는 next(action)을 호출하면 그다음 처리해야 할 미들웨어에게 액션을 넘겨주고, 그다음 미들웨어가 없다면 리듀서에게 액션을 넘겨주는 것이다.

```
액션 -> 미들웨어1 -> next -> 미들웨어2 -> next -> 리듀서 -> 스토어
```

이제 이전 상태, 액션정보, 업데이트된 상태를 보여주는 미들웨어를 구현해보자.

`lib/loggerMiddleware.js`

```js
const loggerMiddleware = store => next => action => {
  console.group(action && action.type); //액션 타입으로 log를 그룹화함
  console.log('이전 상태', store.getState());
  console.log('액션', action);
  next(action); // 다음 미들웨어 혹은 리듀서에게 전달
  console.log('다음 상태', store.getState()); // 업데이트된 상태
  console.groupEnd(); //그룹 끝
};

export default loggerMiddleware;
```

`src/index.js`

```js
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './modules';
import loggerMiddleware from './lib/loggerMiddleware.js';
...

const store = createStore(rootReducer, applyMidleware(loggerMiddleware));

ReactDOM.render(...);
```

`결과`

<img src="logger-result.png" width="400"/>

위와 같이 액션 정보와 업데이트 전후의 상태가 나타난다.
미들웨어에서는 여러 종류의 작업을 처리할 수 있다. 특정 조건에 따라 액션을 무시하거나, 액션정보를 가로채서 변경한 후 리듀서에게 전달해 줄 수도 있다.
이런 미들웨어의 특징으로 네트워크 요청과 같은 비동기 작업을 관리하기에 매우 유용하다.

## redux-logger

위에서 만들었던 logger 미들웨어는 이미 잘 만들어진 오픈소스가 있다.

```shell
$ yarn add redux-logger
```

`src/index.js`

```js
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './modules';
import {createLogger} from 'redux-logger';
...

const logger = createLogger();
const store = createStore(rootReducer, applyMidleware(logger));

ReactDOM.render(...);
```

`결과`

<img src="redux-logger.png" width="400"/>

위처럼 미들웨어는 오픈소스가 많아 라이브러리로 설치해서 사용하는 경우가 많다.

## 비동기 작업을 처리하는 미들웨어

비동기 작업을 처리할 때 도움을 주는 미들웨어는 정말 다양하다.
책에서는

- redux-thunk: 비동기 작업을 처리할 때 가장 기본적으로 상용되는 미들웨어
- redux-saga: 두번째로 많이 사용되는 미들웨어다. 특정 액션이 디스패치되었을 때 정해진 로직에 따라 다른 액션을 디스패치 시키는 규칙을 작성하여 비동기 작업을 처리할 수 있게 해준다.

책에서는 두가지를 이용해 비동기 작업을 구현한다.

### redux-thunk

thunk란?<br>
특정 작업을 나중으로 미루기 위해 함수 형태로 감싼 것을 의미한다.

연산 작업을 나중으로 미루기 위한 코드이다.

```js
// 주어진 파라미터에 1을 더하는 함수
const addOne = x => x + 1;

function addOneThunk(x) {
  const thunk = () => addOne(x);
  return thunk;
}

const fn = addOneThunk(1);
setTimeout(() => {
  const value = fn();
  console.log(value);
}, 1000);
```

위를 화살표 함수로만 사용한다면 다음과 같이 구현할 수 있다.

```js
const addOne = x => x + 1;
const addOneThunk = x => () => addOne(x);

const fn = addOneThunk(1);
setTimeout(() => {
  const value = fn();
  console.log(value);
}, 1000);
```

redux-thunk 라이브러리를 사용하면 thunk함수를 만들어서 디스패치할 수 있다.
리덕스 미들웨어가 thunk함수를 전달받아 store의 dispath와 getState를 파라미터로 넣어서 호출한다.

다음은 redux-thunk에서 사용할 수 있는 예시 thunk함수이다.

```js
const sampleThunk = () => (dispath,getState) =>> {
  // 현재 상태를 참조할 수 있고,
  // 새 액션을 디스패치할 수도 있다.
}
```

### redux-saga

redux-thunk는 함수 형태의 액션을 디스패치하여 미들웨어에서 해당 함수에 스토어의 dispath와 getState를 파라미터로 넣어서 사용하는 원리였다.
대부분의 경우에는 redux-chunk로도 충분히 기능을 구현할 수 있다.

redux-saga는 좀 더 까다로운 상황에서 유용하다.

- 기존 요청을 취소 처리해야할 때(불필요한 중복 요청 방지)
- 특정 액션이 발생했을 때 다른 액션을 발생시키거나, API 요청 등 리덕스와 관계없는 코드를 실행할 때
- 웹소켓을 사용할 때
- API 요청 실패 시 재요청해야 할 때

#### 제네레이터 함수 이해하기

redux-saga는 ES6의 제네레이터 함수 문법을 사용한다. 일반적인 상황에서 사용하지 않기 때문에 초반 진입장벽이 높을 수 있다.

제네레이터 함수 문법의 핵심 기능은 함수를 작성할 때 함수를 특정 구간에 멈춰 놓을 수도 있고, 원할 때 다시 돌아가게 할 수도 있다는 것이다.

```js
function weirdFunction() {
  return 1;
  return 2;
  return 3;
  return 4;
  return 5;
}
```

하나의 함수에서 값을 여러 개 반환하는 것은 불가능하므로 이 코드는 제대로 작동하지 않는다. 호출할 때 마다 맨 위에 return 1;이 반환 될 것이다.

제네레이터 함수를 사용하면 함수에서 값을 순차적으로 반환할 수 있고, 함수의 흐름을 도중에 멈춰 놓았다가 다시 이어서 진행시킬 수도 있다.

```js
function* generatorFunction() {
  console.log('Hi');
  yield 1;
  console.log('generation function');
  yield 2;
  console.log('function*');
  yield 3;
  return 4;
}

const generator = generatorFunction();

generator.next();
// {value: 1, done: false}
generator.next();
// {value: 2, done: false}
generator.next();
// {value: 3, done: false}
generator.next();
// {value: 4, done: true}
generator.next();
// {value: undefind, done: true}
```

제네레이터 함수 사용 시 `function*` 키워드를 사용한다.

제네레이터가 처음 만들어지면 함수는 멈춰있는 상태가 된다.
next()가 호출되면 다음 `yield`까지 호출되고 다시 함수가 멈춘다.
제네레이터 함수를 ㅏㅅ용하면 함수를 도중에 멈출 수 있고, 순차적으로 여러개 값을 반환시킬 수도 있다.

```js
function* sumGenerator() {
  console.log('sumGenetator가 만들어졌습니다.');
  let a = yield;
  let b = yield;
  yield a + b;
}

const sum = sumGenerator();

sum.next();
// sumGenetator가 만들어졌습니다.
// {value: undefined, done: false}
sum.next(1);
// {value: undefined, done: false}
sum.next(2);
// {value: 3, done: false}
sum.next(3);
// {value: undefined, done: true}
```

redux-saga는 제네레이터 함수 문법을 기반으로 비동기 작업을 관리해 준다.
우리가 디스패치하는 액션을 모니터링해서 그에 따라 필요한 작업을 따로 수행할 수 있는 미들웨어이다.

```js
function* watchGenerator() {
  console.log('모니터링 중...');
  let prevAction = null;
  while (true) {
    const action = yield;
    console.log('이전 액션', prevAction);
    prevAction = action;
    if (action.type === 'HELLO') {
      console.log('안녕하세요!');
    }
  }
}

const watch = watchGenerator();

watch.next();
// 모니터링 중...
// {value: undefined, done: false}
watch.next({ type: 'TEST' });
// 이전 액션 null
// {value: undefined, done: false}
watch.next({ type: 'HELLO' });
// 이전 액션 {type: "TEST"}
// 안녕하세요!
// {value: undefined, done: false}
```

redux-saga는 위와 비슷한 원리로 작동한다.
제네레이터함수의 작동 방식만 기본적으로 파악한다면 redux-saga에서 제공하는 여러 유용한 유틸 함수를 사용하여 액션을 쉽게 처리할 수 있다.
