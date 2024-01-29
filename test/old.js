const fs = require('./fs')
const path = require('path')

const store = {}
const file = 'store.nodels'
const seperator = ';/'


fs._exists(file, (err, data) => {
    if(err){
        fs.writeFile(file, '', 'utf-8', (e) => {
            if(e) throw new Error(e)
        });
    }
    else{
        fs.readFile(file, 'utf-8', (e, data) => {
            if(e) throw new Error(e)
            else{
                const lines = data.split('\n')
                const pairs = lines.filter(item => item !== '\r' && item !== '' && item.includes(seperator)).map(item => item.split(seperator))
                pairs.forEach(pair => {
                    const key = pair.at(0);
                    const val = pair.at(1);
                    store[key] = val
                });
                //console.log(store)
            }
        })
    }
})


function set(key, value){
    const data = `\n${key}${seperator}${value}` 
    fs.appendFile(file, data, 'utf-8', (err) => {
        if(err) console.error(err)
    })
}



function sets(key, value){
    store[key] = value
    const keys = Object.keys(store);
    let data = ``
    keys.forEach(k => {
        data = data + `${k}${seperator}${store[k]}\n` 
    })
    //console.log(data)
    fs.writeFile(file, data, 'utf-8', (err) => {
        if(err) console.error(err)
    })
}

function get(key){
    fs.readFile(file,'utf-8', (err, data) => {
        if(err) console.error(err);
        else{
            const lines = data.split('\n')
            lines
            .filter(item => item !== '\r' && item !== '' && item.includes(seperator))
            .map(item => item.split(seperator))
            .find(item => item === key)[1]
        }
    })
}

module.exports = {
    set,
    get,

}