/**
 * 座机+手机
 */
// export const isPhone = (value) => {
// 	if (value === '') {
// 		return false;
// 	} else {
// 		let regPone = null;
// 		let mobile = /^1(3|4|5|6|7|8|9)\d{9}$/; //最新16手机正则
// 		let tel = /^(0\d{2,3}-){0,1}\d{7,8}$/; //座机
// 		// let mobile = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
// 		// let tel=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
// 		if (value.charAt(0) == 0) { // charAt查找第一个字符方法，用来判断输入的是座机还是手机号
// 			regPone = tel;
// 		} else {
// 			regPone = mobile;
// 		}
// 		return regPone.test(value)
// 	}
// }

export const isPhone=(str)=> {
  const telePhone = /^((0\d{2,3})-)?(\d{7,8})$/;
  const mobilePhone = /^1[3|4|5|6|7|8|9]\d{9}$/;
  return mobilePhone.test(contactPhone)||telePhone.test(contactPhone)
}