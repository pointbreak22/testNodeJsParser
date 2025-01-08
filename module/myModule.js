async function randomDelay(time = Math.random() * 200 + 100) {
    return new Promise(resolve => setTimeout(resolve, time));
 // await setTimeout(() => {
 //        console.log("This runs after: ",time);
 //    }, time);
}
module.exports = {
    randomDelay
}