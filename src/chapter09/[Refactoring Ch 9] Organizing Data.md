# [Refactoring Ch.9] Organizing Data

## 1. 하나의 변수는 하나의 역할만 담당한다.

```jsx
// Before
calculateCircle(radius) {
	let calulationResult;
	calulationResult = 2 * Math.PI * radius;
	console.log('diameter : ', calulationResult);
	calulationResult = Math.PI * radius**2;
	console.log('area : ', calulationResult);
}

// After
calculateCircle(radius) {
	const diameter = 2 * Math.PI * radius;
	console.log('diameter : ', diameter);
	const area = Math.PI * radius**2;
	console.log('area : ', area);
}
```

## 2. 데이터를 더 잘 이해할 수 있도록 작명해야하며, 필요할 경우 기존 데이터의 이름을 변경한다.

```jsx
// Before
const favoriteMovie = { name: '영화', date: '2000/1/1', actor: '아무개' };

// After
const favoriteMovie = { title: '영화', releaseDate: '2000/1/1', mainActor: '아무개' };
```

- 변경해야할 범위가 제한적이라면(한 함수 내에서만 쓰인다 등) 단순 변경으로 진행한다
- 여러 곳에서 사용되어야하는 데이터라면 해당 데이터를 캡슐화(다시 말해, 오브젝트를 클래스로 변경하고 기존 프로퍼티에 대한 게터와 세터를 생성) 후 변경이 필요한 이름에 대해 진행한다.

## 3. 가변 데이터의 유효 범위는 가능한 한 좁혀야한다.

```jsx
// Before
get discountedTotal() {return this._discountedTotal;}
set discount(aNumber) {
  const old = this._discount;
  this._discount = aNumber;
  this._discountedTotal += old - aNumber;
}

// After
get discountedTotal() {return this._baseTotal - this._discount;}
set discount(aNumber) {this._discount = aNumber;}
```

## 4. 여러 곳에서 동시에 사용(변경)되어야만 하는 데이터가 아니라면 참조보다 값으로 변경한다.

```jsx
// Before
class TelephoneNumber {
  get areaCode() { return this._areaCode }
  set areaCode(arg) { this._areaCode = arg }
  get number() { return this._number }
  set number(arg) { this._number = arg }
}

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get officeAreaCode() { return this._telephoneNumber.areaCode }
  set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg }
  get officeNumber() { return this._telephoneNumber.number }
  set officeNumber(arg) { this._telephoneNumber.number = arg }
}

// After
class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }

  get areaCode() { return this._areaCode }
  get number() { return this._number }

  equals(other) {
    if (!(other instanceof TelephoneNumber)) return false;
    return this.areaCode === other.areaCode && this.number === other.number;
  }
}

class Person {
  get officeAreaCode() { return this._telephoneNumber.areaCode }
  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }
  get officeNumber() { return this._telephoneNumber.number }
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}
```

- 값 객체는 동치성을 기반으로 평가해야한다. 다시 말해, 2개의 new 연산자와 생성자를 통해 생성된 2개의 instance의 데이터가 동일한지 확인한다.(equals 함수)

## 5. 여러 곳에서 동시에 사용(변경)되어야만하는 데이터라면 값보다 참조로 변경한다.

```jsx
// Before
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer);
  }

  get customer() { return this._customer }
}

class Customer {
  constructor(id) {
    this._id = id;
  }

  get id() { return this._id }
}

// After

let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer() {
  if (!_repositoryData.customer.has(id)) {
    _repositoryData.customers.set(id, new Customer(id));
  }

  return findCustomer(id);
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}

class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer);
  }

  get customer() { return this._customer }
}

class Customer {
  constructor(id) {
    this._id = id;
  }

  get id() { return this._id }
}
```

## 6. 소스 코드의 여러 군데에서 사용되는 고정된 값을 나타내는 상수를 사용한다.

```jsx
// Before
this.canvas.setBackgroundImage(this.backImg, 
                               this.canvas.renderAll.bind(this.canvas),
                              {
                                left: 540,
                                top: 540,
                                originX: 'center',
                                originY: 'center',
                                opacity: 0
                              });

// After
this.canvas.setBackgroundImage(this.backImg, 
                               this.canvas.renderAll.bind(this.canvas),
                              {
                                left: CanvasSize.defaultWidth / 2,
                                top: CanvasSize.defaultHeight / 2,
                                originX: 'center',
                                originY: 'center',
                                opacity: 0
                              });
    ```
