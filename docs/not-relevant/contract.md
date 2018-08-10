# Smart-Contract
*Недоизученное предложение, необходимо детально исследовать.*

Каждая сущность смарт-контракта по сути является неким контейнером с данными для взаимодействия относительно состояний. Для DApp будет удобно работать с смарт-контрактом не только как с сущностью к которой можно обращаться для различных операций или для прямого получения данных относительно текущего состояния.

Предложение заключается в разборе структуры и AST дерева смарт-контракта, для создания реактивного store с данными, которые обновляются в режиме реального времени. 

Достоинства подхода подразумевают высокоуровневую абстракцию для простой интеграции с фронтендом, чтобы работать в конечном итоге только с высокоуровневыми сгенерированными методами, где можно не заботиться о том как подписываться и обрабатывать данные - а работать уже с оформленной реактивной сущностью. 

В современных фреймворках вроде React & Angular подобный подход с реактивными сущностями - где упор визуализации и конечного представления работает для живого обновления, подход и его удобство хорошо себя зарекомендовал.

Мы всегда имеем актуальные данные для работы с отрисовкой, а также инстансы обхъектов вроде Address для произведения платежей, вызова методов контракта и тд - из нашего DApp без лишних уровней абстракций.

### Пример
``` solidity
// Простая схема смарт-контракта по игре в шахматы на деньги 
contact ChessGame {
  // Данные адреса получателя денег - победитель
  address public winner;
  // Сумма конечная сумма награды
  uint public reward;
  
  // Адреса игроков
  address public playerFirst;
  address public platerSecond;

  // Холд - где хранятся деньги с пополнения для награды
  address public hold;
  
  // Событие - игрок оплатил свой взнос
  event UserPaidFee(address payer, uint amount);
  // Игра закончена - деньги достаются игроку
  event GameEnded(address winner, uint amount);

  function changeWinner(address winner) {
    // ....
  }
}
```

``` js
// Declarative event based version
import Chess from "./chessContract.sol" 

// Instanse
let game = new Chess("hash")
game.connect("UserPaidFee", (payed, amount) => {
  // ....
})

game.connect("GameEnded", (winner, amount) => {
  // ....
})

// Call function as meta-proxy
game.changeWinner("address-of-winner")

```


``` js
// REACTIVE REDUX VERSION

// Метод импорта контракта, работает как модуль webpack
// тоесть на этапе компиляции, плагин для webpack - сам создает генерацию и репрезентацию 
// нашего контракта как объекта JS
import ChessScheme from "./chessContract.sol"

import {
  // Функция регистратор демона отслеживания событий контракта и изменения данных
  reactiveContractMiddleware,
  // Функция которая генерирует схему реактивного store для redux
  createContractReducer,
} from "arrayio-react-reactive-contract"

// Address - класс репрезентации типа address из solidity
// http://solidity.readthedocs.io/en/v0.4.24/units-and-global-variables.html#address-related
// Он имеет теже методы что и оригинальный метод + дополнительные методы помощники что мы даем сами
// Внутри имеет ссылку на действия к нашему серверу для манипуляций: 
// с адресами, и тд - например для платежей, проверок активности, баланса и тд
// Сама схема генерируется из AST репрезентации нашего исходника контракта

// Chess instanse
let chess = new ChessScheme("block_hash")

// Показываем базовую репрезентацию экземпляра контракта
console.log(chess)
/*
{
  __name__: 'ChessGame',
  
  winner: Address,
  reward: 100.5,
  
  playerFirst: Address,
  platerSecond: Address,

  hold: Address
}
*/

// Создаем реактивное хранилище для контракта
let gameReducer = createContractReducer(ChessScheme)
// Создаем целевое хранилище redux
let store = createStore(reducers, compose(
  applyMiddleware(chess, reactiveContractMiddleware(ChessScheme))
))

// Реактивный компонент, который отслеживает и перерисосывает UI относительно данных в хранилище
@connect((store) => ({
  // Подключаем кусок реактивных данных контракта
  game: store.ChessGame
}))

class GameScreen {
  render() {
    // Регистрируем динамичные данные в обработчике отрисовки
    let { winner, reward, hold } = this.props.game
    
    // Если обозначен счет победителя, и он не null и активен (это проверяет метод isActive)
    // а также если на холде есть необходимая сумма награды - показать на экран элемент поздравления победителя
    return (
      <div>
        { (winner.isActive() && hold.getAmount() == reward)
          ? <h1>Congratulations {winner}!!!</h1>
          : null
        }
      </div>
    )
  }
}
```