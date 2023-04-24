// step 1 create a promise inside a function
function longwork()
{
    p =  new Promise(function (resolve, reject) {
        result = 1111111111111 // long work here ;

        if(result == "good"){
            resolve(result);
        }
        else
        {
            reject("error ...etc")
        }
    })

    return p
}

// step 2 call that function inside an async function (I call it main)and use await before it
async function main()
{
    final_result = await longwork();
    //..

}

//step 3 call the async function that calls the long work function
main().catch((error)=>{console.log(error);})


//////////////////////////////
// For example, in the following code, function B uses the stuff returned from function A so is declared "async" and
// awaits A(). Function C() calls B(), is returned a Promise, but can move straight on before that promise is resolved
// because it is not interested in A()'s stuff, nor what's done with it. So C does not need to be declared as async,
// nor await B().

    function A() {
    return new Promise((resolve, reject) => {
        //do something slow
        resolve (astuff)
    }
}
async function B() {
    var bstuff = await A();
    dosomethingwith(bstuff);
    return;
}
function C() {
    B();
    dontwaitmoveon();
...
    return;
}

// In this next example, C() does use A()'s stuff, so needs to wait for it. C() must be declared "async" and await B().
// However D() does not care about A()'s stuff, nor what's done with it, so moves on once C() returns its promise.

function A() {
    return new Promise((resolve, reject) => {
        //do something slow
        resolve (astuff)
    }
}

async function B() {
    var bstuff = await A();
    dosomething();
    return bstuff;
}

async function C() {
    var cstuff = await B();
    dosomethingwith(cstuff);
...
    return;
}

function D() {
    C();
    dontwaitmoveon();
...
    return;
}

Since figuring this out, I have tried to design my code so the stuff returned by the asynchronous function is consumed as close as possible to the source.