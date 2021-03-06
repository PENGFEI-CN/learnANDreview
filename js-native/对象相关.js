/* *
*  1. 访问对象属性的方法
* */

var obj1 = {a:1,b:2};
let test = Object.create(obj1);
// 以obj1为原型对象
console.log(JSON.stringify(test));
obj1 === test.__proto__ // true
for(let key in test){
    console.log(key);
} //遍历对象 不含Symbol
console.log(Object.keys(test)); //不含
console.log(Object.getOwnPropertyNames(test)); //不含Symbol属性
console.log(Object.getOwnPropertySymbols(test)); //包含对象自身的所有Symbol属性
console.log(Object.keys(obj1)); //不含
console.log(Object.getOwnPropertyNames(obj1)); //不含Symbol属性
console.log(Object.getOwnPropertySymbols(obj1)); //包含对象自身的所有Symbol属性

/* *
*  2. 拦截JavaScript惭怍的方法  reflect,Proxy,getter/setter
* */

//2.1 Proxy 新的proxy对象会对target进行“浅拷贝”,即proxy、target两个对象会相互影响。
//2.2 Reflect
//2.3 get/set方法

