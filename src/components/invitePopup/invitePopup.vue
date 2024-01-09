<template>
  <view class="choosePopup_content" v-if="showPopup" id="poster2">
    <img
      class="chooseImage"
      src="../../static/images/bg_invite.png"
    />
    <view class="chooseimage-content flex-column">
      <view class="logo-group flex-column flex-a-i-c">
        <image class="logo" src="../../static/images/title_stzjl.png"></image>
				<text class="tip m-t-4">每邀请一位好友加入即可获得一次探寻机会</text>
        <image src="../../static/images/line_help.png" class="line m-t-10"></image>
      </view>
      <view class="flex-column flex-a-i-c">
        <view class="content-b-box m-t-4">
          <view class="pic-box">
            <image class="pic" crossOrigin="Anonymous"  :src="data.pic"></image>
						<view class="des">
							<text class="name">{{ data.name }}</text>
						</view>
          </view>
          <view class="qrcode-box flex-row flex-j-c-b">
            <text class="tip2">加入奔跑吧生态召集<br />令赢跑男周边</text>
            <image v-if="data.routeId" class="qrcode" :src="$request.baseUrl+'/app-api/member/game-route/qrcode/'+data.routeId+'/'+memberId"></image>
          </view>
        </view>
      </view>
      <view class="btn-group m-t-20" ignorecanvas>
				<view class="flex-row flex-mc">
					<image
						src="../../static/images/btn_bchb.png"
						@click="btnSave()"
						style="width: 300rpx; height: 89rpx"
					></image>
				</view>
				<view class="flex-row flex-mc">
					<image
						src="../../static/images/btn_yqhy.png"
						@click="btnInvite()"
						style="width: 300rpx; height: 89rpx"
					></image>
				</view>
      </view>
      <view class="invite-list" ignorecanvas>
				<view class="line-g"></view>
      	<view class="sub">邀请记录</view>
				<view class="record" v-if="$utils.isNotEmpty(list)">
					<scroll-view scroll-y style="max-height: 100rpx;">
						<view class="flex-row flex-j-c-b" v-for="(item,index) in list" :key="index">
							<view>{{item.nickname}}</view>
							<view>{{$utils.formatTime2(item.createTime)}}</view>
						</view>
					</scroll-view>
				</view>
				<view class="record e" v-else>
					还没有邀请记录哦，赶紧邀请好友吧!
				</view>
      </view>
			<view class="btn-close" ignorecanvas>
        <image
          src="../../static/images/close.png"
          @click="btnCloseOp()"
          style="width: 57rpx; height: 57rpx"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
import { doSaveImage } from "@/common/utils/ztv";
import html2canvas from "html2canvas";
import { doShare, shareH5UrlPid } from "@/common/utils/ztv";
import { getossKey, upYunImg } from "@/common/http/api/upload";
import {dataURLtoBlob, blobToFile, randomString} from "@/common/utils/utils.js"
import { userInfoApi } from "@/common/http/api/login";
import { Toast } from 'vant'

export default {
  props: {
  },
  data() {
    return {
      memberId:uni.getStorageSync("userId"),
      data: {},
			list: [],
      showPopup: false,
      qrcode:undefined,
			url: shareH5UrlPid
    };
  },
  methods: {
    show(params) {
      this.data = params.data;
			this.list =  params.list
      this.showPopup = true;
    },
    btnCloseOp: function (needFresh) {
      this.showPopup = false;
    },
    btnSave() {
      if(this.data?.posterImg){
        doSaveImage(this.data?.posterImg) 
      }
      // 获取dom元素也就是将要生成图片的盒子
      // Toast.loading({
      //     duration: 0, // 持续展示 toast
      //     message: '图片生成中...',
      //   })
      
      // setTimeout(()=>{
      //   let dom = document.querySelector("#poster2");
      //   html2canvas(dom, {
      //   width: dom.clientWidth, // 生成图片的宽度
      //   height: dom.clientHeight, // 生成图片的高度
      //   scale:1, //scale 将其调大可以解决低分辨率设备下生成的图片模糊问题
      //   useCORS: true, // 是否允许跨域 如果不行在img标签增加 crossOrigin="Anonymous" 属性
      //   ignoreElements:(e)=>{
      //        if(e.getAttribute('ignorecanvas')!=null){
      //            return true
      //        }
      //        return false
      //    }
      // }).then((canvas) => {
      //   // 生成一个base64的图片路径
      //   let dataURL = canvas.toDataURL("image/png");
      //   this.afterRead(dataURL);

      //   // console.log(dataURL);
      //   // doSaveImage(dataURL);

      // });
      // },1000)


    },

    async afterRead(file){

        let res = await upYunImg({
          base64Str: file
        })

        Toast.clear();

        console.log(res?.data, 'result')

        let newUrl = res?.data.split('z-rm-a.oss-cn-hangzhou-internal.aliyuncs.com').join('z-rm-a.oss-cn-hangzhou.aliyuncs.com');

        console.log(newUrl, 'result')

        doSaveImage(newUrl)  
        
    },
		btnInvite() {
      let time=Date.now()

      userInfoApi()
          .then((res) => {
            // 没有 data 数据，赋予个默认值
            if (!res) {
              res = {
                data: {
                  nickname: "",
                  avatar: "",
                  mobile: "",
                },
              };
            }; // 读取 data 数据
            console.log(res.data,'res.data')

            let id=res.data?.id || ''
            let url = `https://zmtv.cztv.com/rmst/#/pages/services/index?pid=${id}&createTime=${time}`
            console.log(url)

            const shareData = {
              url, //分享的网址链接
              title: '快来跟我一起成为《奔跑吧》的“生态合伙人”吧！', //分享的标题
              content: '真的“态”好玩了！更有签名照、节目录制门票等你拿！', // 分享的文字
              img: 'http://z-rm-a.oss-cn-hangzhou.aliyuncs.com/shareLogo.jpg', // 分享的图片Url
            }
            doShare(shareData)
            // .then(res => {
            // 	console.log('拉新，邀请任务')
            // })
          })
		}
  },
};
</script>

<style lang="scss" scoped>

.choosePopup_content {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgb(0, 0, 0, 0.85);
}
.chooseImage {
  position: absolute;
  left: 50%;
  top: 50%;
	transform: translate(-50%,-50%);
  display: block;
	width: 675.2rpx;
	height: 1120.94rpx;
  // z-index: 0;
}
.chooseimage-content {
  height: 1160rpx;
  width: 100%;
  top: 55%;
	transform: translate(0,-50%);
  position: relative;
  .logo-group {
    padding: 2% 10%;
    position: relative;
    .logo {
      width: 517rpx;
      height: 62rpx;
    }
  }
  .title {
    width: 571rpx;
    height: 59rpx;
  }
  .tip {
    color: #009a0f;
    font-family: "PingFang SC";
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
  }
  .line {
    position: absolute;
    // left: 50%;
    bottom:0;
		// transform: translate(-50%,0);
		width: 520rpx;
		height: 4rpx;
  }
  .btn-group {
		display: flex;
		justify-content: center;
    // height: 400rpx;
  }
  .btn-close {
    position: absolute;
    left: calc(50% - 28rpx);
    bottom: 0;
  }

  .content-b-box {
    width: 536rpx;
    height: 577rpx;
    flex-shrink: 0;
    border-radius: 50rpx;
    background: #fff;
		margin-top: 30rpx;
  }

  .pic-box {
    width: 536rpx;
    height: 445rpx;
    position: relative;
    .pic {
      width: 100%;
      height: 100%;
      border-radius: 50rpx;
    }
		.des {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 122rpx;
			border-radius: 0 0 50rpx 50rpx;
			background: #0000004d;
			.name {
				line-height: 122rpx;
			  color: #ffffff;
			  font-family: "PingFang SC";
			  font-size: 40rpx;
			  font-style: normal;
			  font-weight: 600;
				padding-left: 30rpx;
			}
		}

  }
  .qrcode-box {
    padding: 20rpx 30rpx;
    .tip2 {
      color: #009a0f;
      font-family: "PingFang SC";
      font-size: 24rpx;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .qrcode {
      width: 90rpx;
      height: 90rpx;
    }
  }
	.invite-list {
		display: flex;
		flex-direction: column;
		padding: 0 15%;
		margin-top:30rpx;
		.line-g {
			height: 1px;
			background: linear-gradient(
			  90deg,
			  #d2f39600 -2.54%,
			  #8ada6e 50.55%,
			  #d2f39500 102.54%
			);
		}
		.sub {
			text-align: center;
			color: #00640a;
			font-size: 24rpx;
			font-weight: 500;
			margin-top: 10rpx;
		}
		.record {
			margin-top: 10rpx;
			height: 80rpx;
			color: #14a923;
			font-size: 24rpx;
			font-weight: 400;
			&.e {
				text-align: center;
			}
		}
	}
}
</style>
