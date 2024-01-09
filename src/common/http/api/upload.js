import jsonp from 'jsonp';
import {
    http
} from '@/common/http/request.js'


const getossKey = () => {
    return new Promise((resolve, reject) => {
        jsonp('https://s.cztvcloud.com/zsj/cztvfile/osspolicy', {}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const upYunImg = (data) => {
    return http({
      dev:'/app-api/infra/file/upload/base64',
    },'post',data)
  }

// = (data) => {
//     new Promise((resolve, reject) => {
//         http({
//             dev: 'https://yun-cztv-new.oss-cn-hangzhou.aliyuncs.com',
//             prod: '',
//             iscztv: true
//         }, 'post', data, {
//             "Content-Type": 'multipart/form-data',
//             "tenant-id": "1"
//         }).then((res)=>{
//             resolve(res);
//         }).catch((err) => {
//             reject(err);
//           });
//     })
// }


export {
    getossKey,
    upYunImg
}