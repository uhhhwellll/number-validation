const regExp = /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/
let phone = '+7 (999) 999-99-99'
let phone2 = '+7 (999) 999-99-9'


console.log(regExp.test(phone));
console.log(regExp.test(phone2));