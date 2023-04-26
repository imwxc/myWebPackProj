//  手写Object.create（）
// 使用现有的对象来作为新创建对象的原型
function create(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}

// 手写instance of
// 判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
// 首先获取两者的prototype， 循环判断obj的proto 是否等于 target的proto
function instanceOf(obj, target) {
    let objProto = Object.getPrototypeOf(obj);
    let targetProto = target.prototype;
    while (objProto !== null || objProto !== undefined) {
        if (objProto === targetProto) {
            return true;
        }
        objProto = Object.getPrototypeOf(objProto);
    }
}

// 手写 new 操作符
// （1）首先创建了一个新的空对象
// （2）设置原型，将对象的原型设置为函数的 prototype 对象。
// （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

function myNew() {
    let emptyObj = null;
    let result = null;
    const constructor = Array.prototype.shift.call(arguments); // 获取传入的 构造函数
    if (typeof constructor != "function") return;
    emptyObj = Object.create(constructor); // 第一步 新建空对象
    result = constructor.apply(newObject, arguments); // 第二步 将函数的this指向该对象并 执行构造函数代码
    let flag =
        result && (typeof result === "object" || typeof result === "function"); // 判断函数返回类型： 值类型则说明 newObject 被赋值了， 引用类型则说明 result 为要返回的引用
    return flag ? result : emptyObj;
}

// 手写Promise 参照 myPromise即可

// 手写promise.then 同上

// 手写Promise.all 同上

// 手写Promise.race 同上


// 函数柯里化
// 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
// es6 实现
function curry(fn, ...args) {
    return fn.length <= args.length
        ? fn(...args)
        : curry.bind(null, fn, ...args);
}

// 实现 prototype 继承
// 所谓的原型链继承就是让新实例的原型等于父类的实例：
// (function(){
//     function SupperFunction(flag1){
//         this.flag = flag1;
//     }
    
//     function SubFunction(flag2){
//         this.flag = flag2
//     }
//     let superIns = new SupperFunction('1')
//     SubFunction.prototype = superIns;

//     let subIns = new SubFunction({'11':20})
//     // console.log(subIns, subIns.__proto__)
// })()

// 实现双向数据绑定
// (function(){
//     function updateHtml(value){console.log('html 的 值被更新为', value)}
//     let obj = {};
//     let key = 'text'
//     let value= obj[key] || '111'
//     Object.defineProperty(obj, key, {
//         get(){
//             console.log('获取数据为：', value)
//             return value
//         },
//         set(newVal, oldVal){
//             updateHtml(newVal)
//             value = newVal
//             console.log(`数据从${oldVal}更新为：${newVal}`)
//         },
//         configurable: true,
//         enumerable: true,
//     })

//     console.log(`get obj`, obj.text)
//     obj.text = '222'
//     console.log(`get obj`, obj.text)
// })()


// 实现斐波那契数列
// (
//     function(){
//         function feb(n){
//             if(n==0 || n==1){
//                 // console.log(n)
//                 return n
//             }
//             console.log(2*n-3)
//             return feb(n-1) + feb(n-2)
//         }
//         console.log(feb(20))
//     }
// )()

// 使用setTimeout实现setInterval
// (function(){
//     function mySetInterVal(fn, delay, immediately=false, ...agrs){
//         if(immediately){ fn(...agrs) }
//         setTimeout(()=>{
//             fn(...agrs)
//             mySetInterVal(fn, delay, false, ...agrs)
//         },delay)
//     }
//     let counter = 1
//     mySetInterVal(()=>{
//         console.log(': ', counter)
//         counter++
//     }, 200, true)
// })()

// 判断对象是否存在循环引用
// 思路： 递归遍历obj的每个key是否指向obj
(function(){
    function isCycleObject(obj, parent){
        let parentArr = parent || [obj]
        for(let i in obj){
            if(typeof obj[i] === 'object'){
                let flag = false;
                parentArr.forEach(element => {
                    if(element === obj[i]) flag = true
                });
                if(flag) return flag
                flag = isCycleObject(obj[i], [...parentArr,obj[i]])
                if(flag) return flag
            }
        }
        return false
    }
    // const a = 1;
    // const b = {a};
    // const c = {b};
    // const o = {d:{a:3},c}
    // o.c.b.aa = a;
    // o.c.b['d'] = b

    // console.log(o, isCycleObject(o))
})()

// 