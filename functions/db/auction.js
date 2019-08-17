const PATH_AUCTION = '/auctions';
const PATH_BID ='/bids'
//const database = firebase.database();

exports.setAuction = async (database, uid, name, description, shares, offerPrice) =>{
    //console.log('uid: ' + uid)
    try{
        let newAuction = database.ref(`${PATH_AUCTION}/${uid}`);
        let newAuctionInfo = {
            uid: uid,
            name: name,
            description: description,
            shares: shares,
            offerPrice: offerPrice
            //status: "active"
    }
    newAuction.set(newAuctionInfo);
}
catch(err){
    console.log(err)
}
    return { msg : 'hah'}

}

exports.getAuction = async(database, uid) => {
    //console.log(uid)
    try{
        console.log(uid)
        const response = await database.ref(`${PATH_AUCTION}/${uid}`).once('value');
        console.log('response', response.val())
        return response.val();
    }
    catch(err){
        console.log(err)
    }
}

exports.getAllAuctions = async (database)=>{
    const response = await database.ref(`${PATH_AUCTION}`).once('value');
    console.log('response', response.val())
    return response.val();
}

exports.updateAuctionPrice = async (database,uid, newPrice)=>{
    const updates = {};
    const path = PATH_AUCTION + '/'+ uid +'/offerPrice';
    // const path = `/auctions/1/offerPrice`
    //const offerPrice = newPrice;
    updates[path] = newPrice;
    const response = await database.ref().update(updates)
    return response;
}
exports.updateAvailableUnits = async (database, uid, newShares) => {
    const updates = { "shares" : newShares};
    const path = PATH_AUCTION + '/'+ uid;
    //updates[path] = newShares; { shares : 990} // 990
    const response = await database.ref(path).update(updates)
    return response;
}
exports.updatePrice = async (database, uid, newPrice) =>{
    const updates = {'offerPrice': newPrice};
    const path = PATH_AUCTION + '/'+ uid;
    const response = await database.ref(path).update(updates)
    return response;
}
exports.getPrice = async (database, uid) => {
    try{
        console.log(uid)
    const response = await database.ref(`${PATH_AUCTION}/${uid}/offerPrice`).once('value');
    console.log('response', response.val())
    return response.val();
    }
    catch(err){
        console.log(err)
    }
}

// exports.createBid = async(database, uid, shares, offerPrice) => {
//     try{
//         let newBid = database.ref(`${PATH_BID}/${uid}`);
//         let bidInfo = {
//             uid: uid,
//             shares: shares,
//             offerPrice: offerPrice
//         }
//         newBid.set(bidInfo);
//     }
//     catch(err){
//         console.log(err)
//     }
// }