const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
const website = require('./db/auction');
const url = require('url');
var serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dutchauction-6abd7.firebaseio.com"
  });
const database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createAuction = functions.https.onRequest((req, res) => {
    return cors (req, res, async() => {
        try{
            //console.log(req.body)
            const auction = await website.setAuction(database, req.body.uid, req.body.name, req.body.description, req.body.shares, req.body.offerPrice);
            console.log(auction);
            return res.send(auction);
        }
        catch(err){
            return res.status(500).json(err);
        }
    })
        
})

exports.getAllAuctions = functions.https.onRequest((req, res)=>{
    return cors (req, res, async()=>{
        try{
            const auctions = await website.getAllAuctions(database);
            console.log(auctions);
            return res.status(200).json(auctions);
        }
        catch(err){
            return res.status(500).json(err);
        }
    })
})

exports.getAuction = functions.https.onRequest((req, res)=>{
    return cors(req, res, async() => {
        try{
            const url_parts = url.parse(req.url, true);
            const query = url_parts.query;
            const uid = query.uid;            
            const auction = await website.getAuction(database, uid);
            console.log("auction");
            return res.status(200).json(auction);
        }
        catch(err){
            return res.status(500).json(err);
        }
    })
})

exports.updatePrice = functions.https.onRequest((req, res) => {
    return cors(req, res, async()=> {
        try{
            // const url_parts = url.parse(req.url, true);
            // const query = url_parts.query;
            // const uid = query.uid;   
            const body = JSON.parse(req.body) 
            const uid = body.uid
            const price = body.offerPrice
            console.log(price)
            const auction = await website.updateAuctionPrice(database, uid, price);
            // console.log(auction);
            return res.status(200).json(auction);
        }
        catch(err){
            return res.status(500).json(err)
        }
    })
})

exports.updateShares = functions.https.onRequest((req, res) => {
    return cors(req, res, async()=>{
        try{
            const body = req.body
            const uid = body.uid
            const shares = body.shares;
            console.log(shares)
            const auction = await website.updateAvailableUnits(database, uid, shares);
            return res.status(200).json(auction);

        }
        catch(err){
            console.log(err)
        }
    })
})

exports.updatePrice = functions.https.onRequest((req, res)=>{
    return cors(req, res, async()=>{
        try{
            const body = req.body
            const uid = body.uid
            const offerPrice = body.offerPrice;
            console.log(offerPrice)
            const auction = await website.updatePrice(database, uid, offerPrice);
            return res.status(200).json(auction);

        }
        catch(err){
            console.log(err)
        }
    })
})
exports.getPrice = functions.https.onRequest((req, res) =>{
    return cors(req, res, async() =>{
        try{
            const url_parts = url.parse(req.url, true);
            const query = url_parts.query;
            const uid = query.uid; 
            //const body = JSON.parse(req.body)
            //const uid = body.uid;
            const price = await website.getPrice(database, uid);
            //console.log("auction");
            return res.status(200).json(price);
        }
        catch(err){
            return res.status(500).json(err)
        }
    })
})

// exports.bid = functions.https.onRequest((req, res)=>{
//     return cors(req, res, async() =>{
//         try{
//             const bid = await website.createBid(database, req.body.uid, req.body.shares, req.body.offerPrice);
//             console.log(bid.json());
//             return res.send(bid);
//         }
//         catch(err){
//             return res.status(500).json(err)
//         }
//     })
// })