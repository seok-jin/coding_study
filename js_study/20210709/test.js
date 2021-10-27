//태그가 지정된 템플릿 리터럴 
function list(){return arguments;}
var t = list`a${1},b${2}c${3}`;
console.log(t)

//객체 생성하기 
/*
1. 자바스크립트의 객체는 이름과 값을 한쌍으로 묶은 집합.
 - 이름 + 값 = 프로퍼티 
*/
var card = {
    suit:'하트', 
    rank:'A'
};

function Card(suit, rank){
    this.suit = suit;
    this.rank = rank;
}
var card = new Card('하트', 'A');


//프로토 타입 상속 
var objA = {
    name : 'Tom',
    sayHello: function(){console.log('Hello! '+this.name);}
};

var objB = {
    name : 'Huck'
};

objB.__proto__ = objA;

var objC = {};
objC.__proto__ = objB;
objC.sayHello();

// 프로토 타입 가지고 오기 
function F(){}
var obj = new F();
console.log(Object.getPrototypeOf(obj));

//new 연산자의 역할 
function Circle(center, radius){
    this.center = center;
    this.radius = radius;
}
Circle.prototype.area = function(){
    return Math.PI*this.radius*this.radius;
};

var c = new Circle({x:0, y:0},2.0);


function Circle(center, radius){
    this.center = center;
    this.radius = radius;
}
Circle.prototype = {
    constructor : Circle,
    area: function(){return Math.PI*this.radius*this.radius;}
};

var c = new Circle({x:0,y:0},2.0);
console.log(c.constructor);
console.log(c instanceof Circle);


// 접근자 프로퍼티 
var person = {
    _name :'Tom',
    get name(){
        return this._name;
    },
    set name(value){
        var str = value.charAt(0).toUpperCase() + value.substring(1);
        this._name = str;
    }
};

console.log(person.name);
person.name = 'hunk';
console.log(person.name);


//데이터의 캡슐화 

var person = (function(){
    var _name = "Tom";
    return {
        get name(){
            return _name;
        },
        set name(value){
            var str = value.charAt(0).toUpperCase() + value.substring(1);
            _name = str;
        }
    };
})();

console.log(person.name);
person.name = 'hunk';
console.log(person.name);
person._name = 'tset';
console.log(person.name);

person.name = 'tset';
console.log(person.name);


//프로퍼티의 속성 
var tom = {name :"Tom"};
console.log(Object.getOwnPropertyDescriptor(tom, 'name'));
console.log(Object.getOwnPropertyDescriptor({}, 'name'));


// Object.defineProperty -> 객체의 프로퍼티에 프로퍼티 디스크립터를 설정 .
var obj = {};
Object.defineProperty(obj,'name',{
    value : "Tom",
    writable : true,
    enumerable : false,
    configurable : true
});
console.log(Object.getOwnPropertyDescriptor(obj, 'name'));

var person = {name : 'Tom'};
Object.defineProperty(person, 'name', {
    writable :false
});
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
person.name = 'Huck';
console.log(person.name);


//프로퍼티의 열거 
var group = {groupName :'tennis circle'};
var person = Object.create(group);
person.name = "Tom";
person.age = 17;
person.sayHello = function(){
    console.log("Hello! "+ this.name);
};
Object.defineProperty(person,'sayHello', {enumerable:false});
console.log(Object.keys(person));
console.log(Object.getOwnPropertyNames(person));


console.log(JSON.stringify({x:1,y:2}, null, '\t'));