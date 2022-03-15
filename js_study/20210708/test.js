function memorize(f){
    var cache = {};
    return function(x){
        if(cache[x]==undefined) cache[x] = f(x);
        return cache[x];
    };
}

function isPrime(n){
    if(n<2) return false;
    var m = Math.sqrt(n);
    for(var i=2;i<=m;i++) if(n%i ==0) return false;
    return true;
}

var isPrime_memo = memorize(isPrime);
var N = 1000;
for(var i=2;i<=N;i++) isPrime_memo(i);

for(var i=2;i+2<=N;i++){
    if(isPrime_memo(i)&&isPrime_memo(i+2)) console.log(i+","+(i+2));
}

function compose(f,g){
    return function(x){
        return f(g(x));
    };
}

var square = function(x) {return x*x};
var add1 = function(x) {return x+1};
var h =compose(square,add1);
console.log(h(2));

function product(x,y){return x*y};
product2 = function(y) {return product(2,y)};
product2(3);

function partial(f){
    var args = arguments;
    return function(){
        var a = Array.prototype.slice.call(args, 1);

    }
}

var pow = function(exponent){
    return function(base){
        return Math.pow(base, exponent);
    };
};

// 콜백
function(g,....);
...
function f(callback,....){
    ...
    callback();
    ...
}

// ECMAScript 6
// 1. 화살표로 함수 정의
var square = function(x){return x*x};
var square = (x) =>{return x*x};
var f = {x,y,z} =>{...};
var f = x => {...};
var f = () =>{...};
(x=>x*x)(3);
// 2. 인수에 추가된 기능 
function f(a,b,...args){
    console.log(a,b,args);
}

f(1,2,3,4,5,6)
// 3. 이터레이션
var a =[5,4,3];
a.forEach(function(val){console.log(val)});