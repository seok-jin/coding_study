// function sleep(callback){
//     setTimeout(function(){
//         callback();
//     },1000);
// }

// sleep(function(){
//     console.log('A');
//     sleep(function(){
//         console.log('B');
//         sleep(function(){
//             console.log('C');
//         });
//     });
// })

// Promise fucntion

var promise = new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log('A');
        resolve();

    }, 1000);
});
promise.then(function(){
    console.log('B');
});