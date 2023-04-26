// 实现自己的promise
const MyPromise = function(callback) {
    // 定义基本状态和数据
    // if(!this) this = new Object();
    let self = this;
    self.state = "pending";
    self.value = null;
    self.reason = null;
    // self.id = Math.random() * 10000000;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];

    // 3.定义resolve 和 reject 状态改变函数
    function selfResolve(value) {
        if (value instanceof MyPromise) {
            return value.then(selfResolve, selfReject);
        }
        // 保证该执行在本轮事件末尾
        setTimeout(()=>{
            if (self.state === "pending") {
                // console.info("self.id is", self.id);
                self.state = "resolved";
                self.value = value;
                // 状态转换时，将pending的callback执行
                self.onResolvedCallbacks.forEach((callback) => {
                    console.info("callback", callback);
                    callback(self.value);
                });
            }
        },0)
    }

    function selfReject(value) {
        if (value instanceof MyPromise) {
            return value.then(selfResolve, selfReject);
        }
        setTimeout(()=>{
            if (self.state === "pending") {
                self.state = "rejected";
                self.reason = value;
                // 状态转换时，将pending的callback执行
                self.onRejectedCallbacks.forEach((callback) => {
                    callback(self.reason);
                });
            }
        },0)
    }

    const thenFn = function (onResolved, onRejected) {
        // 如果没有传入自己的callback，初始化默认的callBack
        onResolved =
            typeof onResolved === "function"
                ? onResolved
                : (val) => {
                    selfResolve(val);
                  };
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                    selfReject(reason);
                  };
        
        // 检查当前promise的状态， 并执行对应的callback
        if (self.state === "resolved") {
            // new MyPromise时自动将 传入的callback执行了， 所以 onResolved 相当于同步执行
            return new MyPromise((resolve, reject) => {
                try {
                    let callbackRes = onResolved(self.value);
                    // console.log("then resolved", callbackRes);
                    // 判断then传入的值是否为 promise 是的话调用promise then， 否则 return resolve的结果
                    callbackRes instanceof MyPromise
                        ? res.then(res, rej)
                        : resolve(callbackRes);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (self.state === "rejected") {
            return new MyPromise((resolve, reject) => {
                console.log(self.state);
                try {
                    let callbackRes = onRejected(self.reason);
                    // 判断then传入的值是否为 promise 是的话调用promise then， 否则 return resolve的结果
                    callbackRes instanceof MyPromise
                        ? res.then(res, rej)
                        : resolve(callbackRes);
                } catch (e) {
                    reject(e);
                }
            });
        } else {
            // 如果当前promise的状态是pending, 则将callback加入缓存，等待状态改变后执行
            console.info('thenFn run', onResolved instanceof MyPromise)
            return new MyPromise((res, rej) => {
                try{
                    self.onResolvedCallbacks.push(() => {
                        let callbackRes = onResolved(self.value);
                        callbackRes instanceof MyPromise
                            ? res.then(res, rej)
                            : resolve(callbackRes);
                    });
                    self.onRejectedCallbacks.push(() => {
                        let callbackRes = onResolved(self.value);
                        callbackRes instanceof MyPromise
                            ? res.then(res, rej)
                            : resolve(callbackRes);
                    });
                }catch(e){
                    reject(e)
                }
            });
        }
    };
    MyPromise.prototype.then = thenFn
    // 2. 搭好初始框架 onResolved 传入的callback， onRejected 传入的callback
    // Object.defineProperty(self, "then", {
    //     get() {
    //         return thenFn;
    //     },
    // });

    const catchFn = function (callback) {
        return self.then(null, callback);
    };
    // Object.defineProperty(self, "catch", {
    //     get() {
    //         return catchFn;
    //     },
    // });

    MyPromise.prototype.catch = catchFn;

    // type args = Promise[]
    // 接收一个 Promise 实例的数组或具有 Iterator 接口的对象作为参数
    // 这个方法返回一个新的 promise 对象，
    // 遍历传入的参数，用Promise.resolve()将参数"包一层"，使其变成一个promise对象
    // 参数所有回调成功才是成功，返回值数组与参数顺序一致
    // 参数数组其中一个失败，则触发失败状态，第一个触发失败的 Promise 错误信息作为 Promise.all 的错误信息。
    const allFn = function(args){
        return new MyPromise((res,rej)=>{
            // new MyPromise的 callback会在new 的时候立刻执行
            // 判断下特殊情况
            if(!args.length || !Array.isArray(args)) return;
            let argsResult = [];
            args.forEach( (promise, index)=>{
                // 利用 selfResolve 获取 下一步then出来的 新的MyPromise
                MyPromise.selfResolve(promise).then((result)=>{
                    argsResult.push(result)
                }).catch((err)=>{
                    return rej(err)
                })
            })
            if(res.length == args.length){
                return res(argsResult)
            }
        })
    }
    MyPromise.prototype.all = allFn

    // 只要有一个Promise 是fullfilled就返回
    // 该方法的参数是 Promise 实例数组, 
    // 然后其 then 注册的回调方法是数组中的某一个 Promise 的状态变为 fulfilled 的时候就执行. 
    // 因为 Promise 的状态只能改变一次, 
    // 那么我们只需要把 Promise.race 中产生的 Promise 对象的 resolve 方法, 
    // 注入到数组中的每一个 Promise 实例中的回调函数中即可.
    const raceFn = function(args){
        return new MyPromise((res, rej)=>{
            args.forEach((promise)=>{
                promise.then(res, rej)
            })
        })
    }  

    MyPromise.prototype.race = raceFn

    // 3. 执行声明 Promise传入的 executor
    try {
        callback(selfResolve, selfReject);
    } catch (e) {
        selfReject(e);
    }
}.bind(this)

function demo(){
    let demo = new MyPromise((resolve) => {
        console.log(1);
        resolve();
    })
        .then((result) => {
            console.log(2);
            // res("22");
            // console.info('2 result', result)
        })
        .then((result) => {
            console.log(3);
            // res("33");
        });
    return demo
}


 export default demo