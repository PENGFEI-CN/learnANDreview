/*
*  函数柯里化
*   就是可以通过传递给函数一部分参数来调用它返回的是处理剩余参数的函数
*
* */

// 简单实现
function add(a,b){
    return a+b;
}
var currying = fn => {
    const len = fn.length
    return function curr (...args1) {
        debugger
        if (args1.length >= len) {
            return fn(...args1)
        }
        return (...args2) => curr(...args1, ...args2)
    }
}
currying(add)(1);
console.log(currying(add));

//面试题：命名函数表达式sum(100,200)(300)();得到600a
function factorial (n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
}
var result =[1,2,3,4,5].map(factorial)
console.log(result);
//匿名函数如何递归-callee
var callee = [1,2,3,4,5].map(function (n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
console.log(callee)
//多重函数
var add1 = function(x){
    return function (y)
    {
        return x+y
    }
}
console.log(add1(2)(4))
//arguments类数组
function test(a,b,c){
    var x = arguments.length;
    arguments[0] = 10;
    console.log(a);//实参变为10
    console.log(x);//输入实参的个数
    arguments[2] = 100;
    console.log(c);//undefined
    console.log(arguments.callee === test);//.callee当前正在执行的函数，可以用来递归调用匿名函数。
}
test(1,2);
//函数调用apply/call/bind方法

//函数柯里化多重参数传入
    function add () {
        //将argument转换成数组
        var args = Array.prototype.slice.call(arguments);
    var fn = function () {
        //拼接多次调用的参数为数组
        var arg_fn = Array.prototype.slice.call(arguments);
        //递归调用add
        return add.apply(null, args.concat(arg_fn));
    }
    //最后一次返回fn时，自动调用valueOf
    fn.valueOf = function () {
        return args.reduce(function(a, b) {
            return a + b;
        })
    }
    return fn;
}
// 输出结果，可自由组合的参数
console.log(add(1)(5)(1)+0);  // 6

function sum(){
    var num = arguments[0];
    if(arguments.length==1){
        return function(sec){
            return num+sec;
        }
    }else{
        var _num = 0;
        for(var i = 0;i<arguments.length;i++){
            _num += arguments[i];
        }
    return _num;
    }
}
console.log(sum(3)(2)+0);

function plus(){
    var _args = Array.prototype.slice.call(arguments);
        var _adder = function adder() { 
            Array.prototype.push.apply(_args,[].slice.call(arguments));
            return _adder;
        };

        _adder.valueOf = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            })
        }
        return _adder;
}

console.log(plus(9)(9)(6)+0);
console.log(plus(9)+0);

//面试题：实现sunm(100,200)(300)()得到600a
var currying = function (fn) {
    var _args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, _args);
        }
        Array.prototype.push.apply(_args, [].slice.call(arguments));
        return arguments.callee;
    }
    

};

var multi=function () {
    var total = 0;
    //封装好的_args通过apply调用函数作为函数得输入实参数组，通过对这个函数得arguments直接进行运算即可得出运算结果；
    for (var i = 0, c; c = arguments[i++];) {
        total += c;
    }
    total += 'a';
    return total;
};

var sum = currying(multi);

sum(100);

console.log(sum()); 
sum(200);
console.log(sum());




