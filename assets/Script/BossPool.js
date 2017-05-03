var BossPool = {};
BossPool.init = function(wholePrefads,nums){
    for(let i = 0 ; i < wholePrefads.length ; i++){
        let currentPrefab = wholePrefads[i];
        let numOfThis = nums[i];
        let arrOfThis = [];
        for(let j = 0 ; j < numOfThis ; j++){
            arrOfThis.push(cc.instantiate(currentPrefab));
        }
        // let currentIndex = indexNames[i];
        BossPool[currentPrefab._name] = arrOfThis;
    }
};

BossPool.get = function(index){
    let pool = this[index._name];
    if(pool && pool.length > 0){
       return pool.pop();
    }
    return null;
};

BossPool.put = function(index,ele){
    if(index && ele){
        let pool = this[index._name];
        if(pool){
            pool.push(ele);
        }
    }
};

module.exports = {
    BossPool
};