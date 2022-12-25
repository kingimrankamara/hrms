
module.exports= async function filterUserData(res,payload){
    
    if(Array.isArray(payload)){
        let data=[]
        payload.forEach(load => {
        let l=load.toObject();
            delete l.password;
            delete l.accessToken;
            data.push(l);
        });
    // console.log(Array.isArray(payload))
        res.status(200).json(data);
    }else{
        let l=payload.toObject();
        delete l.password;
        delete l.accessToken;
        res.status(200).json(l);
    }
}