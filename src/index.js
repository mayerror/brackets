 module.exports =  function check(str, bracketsConfig) {
    let arr = str.split(''),
        string = '',
        arrWithMatch = [];
    arrWithMatch = bracketsConfig.filter(item =>  item[0] === item[1]);
    while (arr.length > 0) {
        if (arr.length === 1) {
            return false;
        }
        for (let index = 0; index < arrWithMatch.length; index++) {
            let re = new RegExp(`${arrWithMatch[index][0]}${arrWithMatch[index][0]}`, 'g');
            if (arrWithMatch[index][0] === '|') {
                string = arr.join('').replace(/\|\|/g, '');
            } else {
                string = arr.join('').replace(re, '');
            }
            arr = string.split('');
        } 
        for (let index = 0; index < arr.length; index++) {
            let delStatus = false,
                existStatus = false;
            const element = arr[index];
            for (let i = 0; i < bracketsConfig.length; i++) {
                if (element === bracketsConfig[i][0]) {
                    existStatus = true;
                }
                if (element === bracketsConfig[i][1] && element !== '|') {
                    existStatus = true;
                    if (index === 0) {
                        return false;
                    }
                    if (arr[index - 1] === bracketsConfig[i][0]) {
                        arr.splice(index - 1, 2);
                        delStatus = true;
                        break;
                    } else {
                        return false;
                    }
                }
            }

            if (existStatus === false) {
                return false;
            }
            if (delStatus === true) {
                break;
            }
        }
    }
    return true;
}

// console.log(check('111115611111111222288888822225577877778775555666677777777776622222', [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']]) ? 'true really' : 'false');
