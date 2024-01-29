// normal localstorage
const fs = require('fs')
const path = require('path')

fs.exists_, fs._exists = (path, callback) => {
    fs.access(path, fs.constants.F_OK, err => {
        !err || typeof(err) == "undefined" || err == null ? callback(err, true) : callback(err, false)
    })
}

fs.promises.exists_, fs.promises._exists = async (path) => {
    try{
        await fs.promises.access(path, fs.constants.F_OK);
        return true
    }
    catch(err){
        return false
    }
}



const filename = '../db/index.lsnode'
const seperator = ';/'  
const memory = true;




let store = {};


if(
    !fs.existsSync(filename)
)   fs.writeFileSync(filename, '', 'utf-8')


function setItem(key, value){
    store[key] = value.toString();
    let content = fs.readFileSync(filename, 'utf8')
    let data = content.split('\n')
    data = data.filter(item => item !== '\r' && item !== '')
    data = data.map(item => item.replace('\r', ''))
    let pairs = data.map(item => item.split(seperator))
    let existing = pairs.find(pair => pair[0] === key)

    if(existing){
        content = content.replace(`${existing[0]}${seperator}${existing[1]}`, key + seperator + value);
        fs.writeFileSync(filename, content.replace(/\n+/g, '\n'), 'utf8');
    }
    else{
        content = content + '\n' + key + seperator + value;
        fs.writeFileSync(filename, content.replace(/\n+/g, '\n'), 'utf8'); 
    }

}
function getItem(key){
    if(store[key]) return store[key]
    let content = fs.readFileSync(filename, 'utf8')
    let data = content.split('\n')
    data = data.filter(item => item !== '\r' && item !== '')
    data = data.map(item => item.replace('\r', ''))
    let pairs = data.map(item => item.split(seperator))
    let existing = pairs.find(pair => pair[0] === key)
    if(existing) return existing[1]
    else return undefined;
}
function removeItem(key){
    if(store[key]) delete store[key]
    let content = fs.readFileSync(filename, 'utf8')
    let data = content.split('\n')
    data = data.filter(item => item !== '\r' && item !== '')
    data = data.map(item => item.replace('\r', ''))
    let pairs = data.map(item => item.split(seperator))
    let existing = pairs.find(pair => pair[0] === key)
    if(existing){
        fs.writeFileSync(filename, content.replace(`${existing[0]}${seperator}${existing[1]}`,'').replace(/\n+/g, '\n'), 'utf8');
    }
}
function clear(){
    fs.writeFileSync(filename, '', 'utf8');
}
function key(n){
    if(store[key]) return store[key]
    let data = fs.readFileSync(filename, 'utf8').split('\n')
    data = data.filter(item => item !== '\r' && item !== '')
    data = data.map(item => item.replace('\r', ''))
    let pairs = data.map(item => item.split(seperator))
    if(!pairs[n]) return;
    return pairs[n][1]
}


module.exports = {
    setItem,
    getItem,
    removeItem,
    clear,
    key,

    config:{
        filename,
        seperator,
        memory
    }
}

Object.defineProperty(module.exports, 'lengths', {
    get: function() {
        let data = fs.readFileSync(filename, 'utf8').split('\n')
        data = data.filter(item => item !== '\r' && item !== '')
        data = data.map(item => item.replace('\r', ''))
        let pairs = data.map(item => item.split(seperator))
        return pairs.length
    }
})


module.exports.LocalStorage = require('./LocalStorage')
module.exports.MemoryStore = require('./MemoryStore')
module.exports.FileStore = require('./FileStore')

