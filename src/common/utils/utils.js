import {
	isPhone
} from './validUtils.js'

import req from '@/common/http/request.js'
import {
	CASE_STATUS
} from '@/common/utils/dict.js'

function statusIcon(status) {
	if (status == CASE_STATUS.CASE_EVALUATE || status == CASE_STATUS.CASE_VERIFY || status == CASE_STATUS.CASE_FILE ||
		status == CASE_STATUS.CASE_COMPLETE) {
		return '/static/images/icon_ywc.png'
	} else {
		return '/static/images/icon_jxz.png'
	}
}


function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	let hour = parseInt(time / 3600)
	time = time % 3600
	let minute = parseInt(time / 60)
	time = time % 60
	let second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function appendZero (obj) {
  if (obj < 10) return '0' + obj
  else return obj
}

function formatTime1 (data) {
  if (data == null) {
    return ''
  }
  let dt = new Date(data)
  return dt.getFullYear() + '-' + (appendZero(dt.getMonth() + 1)) + '-' + appendZero(dt.getDate())
}

function formatTime2 (data) {
  if (data == null) {
    return ''
  }
  let dt = new Date(data)
  return dt.getFullYear() + '/' + (appendZero(dt.getMonth() + 1)) + '/' + appendZero(dt.getDate())
}

let dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		let humanize = '';
		for (let key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		let date = this.parse(dateStr)
		let diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		let _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		let a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

function initMap() {
	return new Promise((resolve, reject) => {
		if (window.AMap) {
			resolve(window.AMap)
		} else {
			const key = '';
			let url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
			let jsapi = document.createElement('script');
			jsapi.charset = 'utf-8';
			jsapi.src = url;
			document.head.appendChild(jsapi);
		}
		window.onLoad = () => {
			resolve(window.AMap)
		}
	})
}

function desensitization(str, beginLen, endLen = -1) {
	let len = str.length;
	if (beginLen == 0) {
		endLen = endLen * len + 1;
	}
	let firstStr = str.substr(0, beginLen);
	let lastStr = str.substr(endLen);
	let middleStr = str.substring(beginLen, len - Math.abs(endLen)).replace(/[\s\S]/ig, '*');
	return `${firstStr}${middleStr}${lastStr}`;
}

/**
 * 判断是否为空
 */
function isEmpty(value) {
	switch (typeof value) {
		case 'undefined':
			return true
		case 'string':
			if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
			break
		case 'boolean':
			if (!value) return true
			break
		case 'number':
			if (value === 0 || isNaN(value)) return true
			break
		case 'object':
			if (value === null || value.length === 0) return true
			for (const i in value) {
				return false
			}
			return true
	}
	return false
}

// 将Blob对象，转为Base64
const blobToBase64 = (blob) => new Promise((resolve, reject) => {
	// const canvas = document.createElement('canvas');
	// const ctx = canvas.getContext('2d');
	// let imgW, imgH, size // canvas初始大小
	// const image = new Image();
	// image.crossOrigin = 'anonymous';
	// image.src = blob;
	// image.onload = function() {
	// 	imgW = image.width
	// 	imgH = image.height
	// 	size = imgW > imgH ? imgW : imgH
	// 	canvas.width = imgW
	// 	canvas.height = imgH
	// 	ctx.drawImage(image, 0, 0)
	// 	resolve(canvas.toDataURL("image/", 0.5))
	// }
	const reader = new FileReader()
	reader.onload = function(e) {
		resolve(e.target.result)
	}
	reader.readAsDataURL(blob)
})

function isNotEmpty(arg) {
	if (arg === undefined || arg === [] || arg === null || arg.length === 0) {
		return false
	}
	return true
}

function imagePath(url, d) {
	if (isNotEmpty(url)) {
		return url.startsWith('http') || url.startsWith('blob:http') ? url : req.config.baseUrl +
			'/app-api/infra/file/get?path=' + url
	}
	return d || ''
}

function ocrBirthFormat(date) {
	if (isNotEmpty(date)) {
		var d_arr = date.split('/');
		if (d_arr.length != 3) {
			return ''
		}
		if (d_arr[1].length != 2) {
			d_arr[1] = "0" + d_arr[1]
		}
		if (d_arr[2].length != 2) {
			d_arr[2] = "0" + d_arr[2]
		}
		return d_arr[0] + '-' + d_arr[1] + '-' + d_arr[2]
	}
	return ''
}

function distanceString(d) {
	if (d == null) {
		return ''
	}
	if (Number(d) > 100) {
		return '距离：>100km'
	} else if (Number(d) < 100 && Number(d) > 1) {
		return '距离：' + d.toString().match(/^\d+(?:\.\d{0,2})?/) + 'km'
	} else if (Number(d) < 1 && Number(d) > 0.1) {
		return '距离：' + (Number(d) * 1000).toString().match(/^\d+(?:\.\d{0,2})?/) + 'm'
	} else if (Number(d) < 0.1) {
		return "距离：<100m"
	}
	return ""
}

function compareByDate(prop, align) {
	return function(a, b) {
		var value1 = a[prop];
		var value2 = b[prop];
		if (align == "positive") { //正序
			return new Date(value1) - new Date(value2);
		} else if (align == "inverted") { //倒序
			return new Date(value2) - new Date(value1);
		}
	}
}

function formatHtml(content) {
	content = content.replace(/\<img/gi,
		'<img style="width:100% !important;height:auto !important;margin:0;display:flex;" ');
	content = content.replace(/\<video/gi,
		'<video style="width:100% !important;height:auto !important;margin:0;display:flex;" ');
	content = content.replace(/\<td/gi,
		'<td  cellspacing="0" cellpadding="0" border="0" style="display:block;vertical-align:top;margin: 0px; padding: 0px; border: 0px;outline-width:0px;" '
	);
	content = content.replace(/width=/gi, 'sss=');
	content = content.replace(/height=/gi, 'sss=');
	content = content.replace(/ \/\>/gi,
		' style="max-width:100% !important;height:auto !important;margin:0;display:block;" \/\>');
	return content;
};

const $utils = {
	formatTime: formatTime,
	formatTime1: formatTime1,
	formatTime2: formatTime2,
	formatHtml: formatHtml,
	dateUtils: dateUtils,
	initMap: initMap,
	desensitization: desensitization,
	// initZwlog: initZwlog,
	isEmpty: isEmpty,
	statusIcon: statusIcon,
	btBase64: blobToBase64,
	imagePath: imagePath,
	isNotEmpty: isNotEmpty,
	distanceString: distanceString,
	compareByDate: compareByDate,
	ocrBirthFormat: ocrBirthFormat
}

const install = Vue => {
	Vue.prototype.$utils = $utils;
	Vue.prototype.$isPhone = isPhone;
}


// base64转化为Blob对象
export function dataURLtoBlob(imageEditorBase64) {
	var base64Arr = imageEditorBase64.split(",");
	var imgtype = "";
	var base64String = "";
	if (base64Arr.length > 1) {
	 //如果是图片base64，去掉头信息
	 base64String = base64Arr[1];
	 imgtype = base64Arr[0].substring(
	  base64Arr[0].indexOf(":") + 1,
	  base64Arr[0].indexOf(";")
	 );
	}
	// 将base64解码
	var bytes = atob(base64String);
	//var bytes = base64;
	var bytesCode = new ArrayBuffer(bytes.length);
	// 转换为类型化数组
	var byteArray = new Uint8Array(bytesCode);
   
	// 将base64转换为ascii码
	for (var i = 0; i < bytes.length; i++) {
	 byteArray[i] = bytes.charCodeAt(i);
	}
	// 生成Blob对象（文件对象）
	return new Blob([bytesCode], { type: imgtype });
   }
   
   //blob转换为file
   export function blobToFile(theBlob, fileName) {
	var result = new File([theBlob], fileName, {
	 type: "image/jpeg",
	 lastModified: Date.now(),
	});
	return result;
   }

   export const randomString = function (number) {
	const e = number || 32;
	const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
	const a = t.length;
	let n = "";
	for (let i = 0; i < e; i++) {
	  n += t.charAt(Math.floor(Math.random() * a));
	}
	return n
  }

export default {
	install,
}