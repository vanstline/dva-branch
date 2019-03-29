import { Base64 } from 'js-base64';
const sessionKey = Base64.encode('imscart');
export function setCart(cart) {
  let cartData = getCart() || [];
  if (cart && cart.taskId) {
    if (cartData.length > 1) {
      //  cartData.push(item)
      cartData.map(item => {
        if (item.taskId === cart.taskId) {
          item = cart;
        }
      });
      const hasCart = cartData.find(item => {
        return item.taskId == cart.taskId;
      });
      if (!hasCart) {
        cartData.push(cart);
      }
    } else {
      cartData = [cart];
    }

    const baseString = Base64.encode(JSON.stringify(cartData));
    sessionStorage.setItem(sessionKey, baseString);
  }
}
export function getCart(taskId) {
  const data = sessionStorage.getItem(sessionKey);
  if (data) {
    const soundCode = data ? Base64.decode(data) : '';

    const cartList = JSON.parse(soundCode ? soundCode : 'null');
    return taskId
      ? cartList.find(item => {
          return item.taskId == taskId;
        })
      : cartList;
  }
  return null;
}
export function deleteCart() {
  sessionStorage.removeItem(sessionKey);
}
function uniq(array) {
  var temp = [];
  var index = [];
  var l = array.length;
  for (var i = 0; i < l; i++) {
    for (var j = i + 1; j < l; j++) {
      if (array[i] === array[j]) {
        i++;
        j = i;
      }
    }
    temp.push(array[i]);
    index.push(i);
  }
  console.log(index);
  return temp;
}
