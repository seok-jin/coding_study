// var promise = new Promise(function(resolve, reject){
//     setTimeout(() => {
//         var name = prompt('이름을 입력하십시오');
//         resolve(name);
//     }, 1000);
// });
// promise.then(function(name){
//     console.log('안녕하세요. '+ name+' 님!');
// });



// 실패 콜백 함수 then 이 실행되지 않고, catch 가 실행됨.

var promise = new Promise(function(resolve, reject){
    setTimeout(() => {
        var n = parseInt(prompt('10 미만의 숫자를 입력하십시오.'));
        if(n<=10){
            resolve(n);
        }else{
            reject(`오류 : ${n}은 10 이상입니다.`);
        }
    }, 1000);
});
promise
.then(function(num){
    console.log(`2^${num} = ${Math.pow(2,num)}`);
})
.catch(function(error){
    console.log(error);
});