// 循环打印红黄绿
// 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

function blinker() {
    const times = {
        red: 3,
        green: 1,
        yellow: 2,
    };
    function task(type, second) {
        return new Promise((res, rej) =>
            setTimeout(() => {
                console.log(type);
                res(0);
            }, second * 1000)
        );
    }
    async function show() {
        let types = Object.keys(times);
        for (let key of types) {
            await task(key, times[key]);
        }
        console.log("---------------------------------");
        show();
    }
    show();
}

// 使用setTimeout实现setInterval
(function () {
    function mySetInterVal(fn, delay, immediately = false, ...agrs) {
        if (immediately) {
            fn(...agrs);
        }
        setTimeout(() => {
            fn(...agrs);
            mySetInterVal(fn, delay, false, ...agrs);
        }, delay);
    }
    let counter = 1;
    mySetInterVal(
        () => {
            console.log(": ", counter);
            counter++;
        },
        200,
        true
    );
})()(
    // js实现并发控制器
    function () {
        async function asyncPool(poolLimit, array, iteratorFn) {
            const ret = []; // 存储所有的异步任务
            const executing = []; // 存储正在执行的异步任务
            for (const item of array) {
                // 调用iteratorFn函数创建异步任务
                const p = Promise.resolve().then(() => iteratorFn(item, array));
                ret.push(p); // 保存新的异步任务

                // 当poolLimit值小于或等于总任务个数时，进行并发控制
                if (poolLimit <= array.length) {
                    // 当任务完成后，从正在执行的任务数组中移除已完成的任务
                    const e = p.then(() =>
                        executing.splice(executing.indexOf(e), 1)
                    );
                    executing.push(e); // 保存正在执行的异步任务
                    if (executing.length >= poolLimit) {
                        await Promise.race(executing); // 等待较快的任务执行完成
                    }
                }
            }
            return Promise.all(ret);
        }
        asyncPool(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (item, array) => {
            console.log(item, array);
        });
    }
)()(
    // 实现一个类，其实例可以链式调用，它有一个 sleep 方法，可以 sleep 一段时间后再后续调用
    function () {
      // 首先 定义一个类 PlayBoy
        class PlayBoy {
            queue; // 任务队列
            constructor(name) {
                this.name = name;
                this.queue = []; //创建一个任务队列（利用队列的先进先出性质来模拟链式调用函数的执行顺序）
                setTimeout(() => {
                    // 进入异步任务队列 也是开启 自定义任务队列 queue 的入口
                    this.next(); // next是类PlayBoy 原型上的方法，用来从queue 任务队列中取出函数执行
                }, 0);
                return this;
            }
            sayHi() {
                const fn = () => {
                    console.log("hi");
                    this.next();
                };
                this.queue.push(fn);
                return this;
            }
            sleep(timer) {
                const fn = () => {
                    setTimeout(() => {
                        this.next();
                    }, timer);
                };
                this.queue.push(fn);
                return this;
            }
            play() {
                const fn = () => {
                    console.log("play");
                    this.next();
                };
                this.queue.push(fn);
                return this;
            }
            next() {
                const fn = this.queue.shift(); // 从任务队列中取出函数 函数存在的话即调用
                fn && fn();
            }
        }
        const boy = new PlayBoy("Tom");
        boy.sayHi().sleep(1000).play("王者").sleep(2000).play("跳一跳");
    }
)();
