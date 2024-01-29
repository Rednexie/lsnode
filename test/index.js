const ls = require('..')
ls.clear()
ls.set('yourkey', 'yourvalue')
console.log(ls.get('yourkey')) // yourvalue
ls.set('anotherkey', 'anothervalue')
console.log('the length is: ', ls.length);
ls.removeItem('yourkey')
