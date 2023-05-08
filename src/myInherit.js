// 创建父类
function WebsiteMaster(site) {
    this.site = site;
}
function Person(name) {
    this.name = name;
    this.say = function () {
        console.log("1 + 1 = 2");
    };
}
// 实现 prototype 继承 原型链继承
// 所谓的原型链继承就是让新实例的原型等于父类的实例：
(function () {
    Person.prototype.listen = function () {
        console.log("エウテルペ");
    };

    function Student() {}

    Student.prototype = new Person(); //关键
    Student.prototype.constructor = Student; // 修复构造函数的指向问题

    const stu = new Student();

    stu.grade = 3;

    console.log(stu.grade); // 3

    stu.say(); // 1 + 1 = 2
    stu.listen(); // エウテルペ
    // console.log(subIns, subIns.__proto__)
})()(
    // 借用构造函数继承 实现多继承
    // 问题:没有继承父类的原型
    function () {
        function Student(name, grade, site) {
            Person.call(this, name);
            WebsiteMaster.call(this, site);
            this.grade = grade;
        }
        const stu = new Student("clz", 3, "https://clz.vercel.app");

        console.log(stu.name, stu.grade, stu.site); // clz, 3, https://clz.vercel.app

        stu.say(); // 1 + 1 = 2
        stu.listen(); // Uncaught TypeError: stu.listen is not a function
    }
)()(
    // 原型式继承
    // 创建父类实例后,在父类实例基础上添加子类的方法
    // 问题: 不支持多继承
    // 实例是父类的实例
    function () {
        function object(o) {
            function F() {}
            F.prototype = o;
            return new F();
        }

        function Student(name, grade, site) {
            const person = new Person("clz");
            const stu = object(person);
            stu.grade = 3;
            stu.study = function () {
                console.log("FrontEnd");
            };
            return stu;
        }

        console.log(stu.name, stu.grade); // clz, 3

        stu.say(); // 1 + 1 = 2
        stu.listen(); // エウテルペ
        stu.study(); // FrontEnd
    }
)()(
    // 组合继承
    // 原型链继承+借用构造函数继承
    // 调用两次构造函数,消耗内存
    function () {
        function Student(name, grade, site) {
            Person.call(this, name); // 继承属性
            WebsiteMaster.call(this, site);
            this.grade = grade;
        }
        Student.prototype = new Person(); // 继承方法
        Student.prototype.constructor = Student; // 修复构造函数的指向问题

        const stu = new Student("clz", 3, "https://clz.vercel.app");

        console.log(stu.name, stu.grade, stu.site); // clz, 3, https://clz.vercel.app

        stu.say(); // 1 + 1 = 2
        stu.listen(); // エウテルペ

        console.log(stu.constructor);
    }
)()(
    // 寄生组合式继承
    // 通过 Object.create()来代替给子类原型赋值的过程，解决了两次调用父类构造函数的问题
    function () {
        function Student(name, grade, site) {
            Person.call(this, name); // 继承属性
            WebsiteMaster.call(this, site);
            this.grade = grade;
            Student.prototype = Object.create(Person.prototype); // 继承方法
            Student.prototype.constructor = Student; // 修复构造函数的指向问题
        }
        const stu = new Student("clz", 3, "https://clz.vercel.app");
        console.log(stu.name, stu.grade, stu.site); // clz, 3, https://clz.vercel.app
        stu.say(); // 1 + 1 = 2
        stu.listen(); // エウテルペ
        console.log(stu.constructor);
    }
)();
