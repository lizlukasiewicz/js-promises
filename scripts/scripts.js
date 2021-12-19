//review of callback functions

// HIGHER ORDER function-- what invokes another function, this function gets passed a callback
function higherOrder(callback) {
//invoke the function passed as an argument
callback()
}

//CALLBACK function
 function cb() {
     console.log("im inside a callback function!")
 }

 higherOrder(cb)


 //INLINE CALLBACK funtion
 higherOrder(() => {
     console.log("hello from an anonymous funtion!")
 })


 //                             ~~~~~~~~~~~~~~PROMISES~~~~~~~~~~~~~~~~
 //const newPhonePromise = new Promise(checkMomsMood);
 
 const isMomHappy = true
//HIGHER ORDER function & CALLBACK (resolve or reject are both functions that jasvascript runs)

function checkMomsMood(resolve, reject) {
    //code here runs while promise is PENDING
    console.log('the promise is pending')
    if(isMomHappy) {
        const newPhone = {
            brand: 'iPhone',
            color: 'gold'
        }
        //pass data to resolve() -> given if promise reolves
        resolve(newPhone)
    } else {
        //error is a constructor 
        const reason = new Error('mom is not happy')
        reject(reason)
    }
}
// //create the promise - Object to make a new object - checkMomsMood BOTH HIGHER ORDER(resolve, reject) and CALLBACK(its in the callback) 
const newPhonePromise = new Promise(checkMomsMood)


//                          ~~~~~~~~~~~~~~INTERACTING with PROMISES~~~~~~~~~~~~~
//.then syntax promoises are 'thennable'= dont run this code until the priomise is resolved or rejected
//argument in RESOLVE ^^ is passed into .then()
newPhonePromise
.then(phone => {
    //anticipated result
    console.log(`thanks mom! I love my new ${phone.color} ${phone.brand} !`)
})
//.then() are usually chained so they start on a new line ALWAYS FOLLOW .then() WITH .catch()
//CATCH is used to catch our errors and NOT CRASH SERVERS - if error occours in javascript, it 'bubbles' to the top and crashes server 
.catch(error => {
    //OH NO something went wrong
    //run some code to prevent the server from burning down
    console.log(error)
})

//                              ~~~~~~~~~~~~~~~~~~~ASYNC/AWAIT~~~~~~~~~~~~~~~~~~
async function getNewPhone() {
    //try catch block to hande errors
    try {
        const phone = await newPhonePromise
        console.log(`wow mom! thanks for the new ${phone.coor} ${phone.brand}`)
    } catch(error) {
        console.log(error)
    }
}
getNewPhone()

//FETCH is a built in function in javascript - needs .them or async/await 
//const catTest = fetch('https://catfact.ninja/fact')
//JSON (data type) - one giant string thats simiar to an object
//feed fetch a URL &use .then to wait for response from website or else it will log as 'pending'
fetch('https://catfact.ninja/fact')
.then(response => {
    //step # 1 - jsonify response
    return response.json()
    })
    then(responseJson => {
        //step #2 -- do something with the data
        console.log(responseJson)
    })
    .catch(error => {
        //oh no! problem with the fetch
        console.log(error, 'error from fetch')
    })

    //refractor to async/await
async function getCatFact() {
    try {
        let response = await fetch('https://catfact.ninja/fact')
      //  let responsej = await response.json()
        let responseJson = await response.json()
    } catch (error) {
            console.log(error)
    }
}

getCatFact()


//                            ~~~~~~~~~~~~~~~ CHAINING PROMISES ~~~~~~~~~~~~
const consumeTwoPromises = () => {
    myPromise
    .then((firstRetrievedValue)=>{
      return new Promise((resolve, reject)=>{
          console.log("first retrived value: "+firstRetrievedValue);
          if(firstRetrievedValue){
            resolve(firstRetrievedValue+"???")
          } else {
            reject("firstRetrievedValue is falsey");
          }
      })
    })
    .then((secondRetrievedValue)=>{ // will run if resolve() is called
        console.log("second retrieved value is:", secondRetrievedValue);
    })
    .catch((err)=>{ // will run if reject() is called
        console.log("wah wah :( Error:", err);
    })
}

let valueToRetrieve = "!!!";
let myPromise = new Promise(myCallback);
consumeTwoPromises()

