/*
 * @Author: Marte
 * @Date:   2018-04-15 13:26:33
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-04-15 13:35:48
 */

const obj = {};
const name = 11;
Object.defineProperty(obj, 'name', {
    set: function(newVal) {
        console.log('赋新值')
        obj[name] = newVal
    },
    get: function() {
        console.log('取值')
        return name
    }
});

module.exports = obj;