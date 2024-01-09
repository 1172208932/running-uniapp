<template>
  <view class="container">
    <van-popup
      v-model="show"
      round
      position="bottom"
      class="custom-popup"
      closeable
      z-index="900"
      close-icon="close"
			@close="handleClose"
    >
      <view class="popup-content">
        <view class="image">
          <image src="../../static/images/Union.png" class="union"></image>
          <image src="../../static/images/title_task.png" class="title"></image>
        </view>
        <view class="flex-row flex-a-i-c">
          <text class="desc m-l-30">完成任务</text
          ><text class="number m-l-20">{{taskDoneNum}}/{{ this.list.length }}</text>
        </view>
        <view
          class="task m-t-20 flex-row flex-j-c-b"
          v-for="item in list"
          :key="item.id"
        >
          <view class="flex-row flex-mc">
            <image :src="item.pic" class="icon"></image>
            <text class="fs-26 m-l-20"
              >{{ item.name }} ({{ item.todayCount>item.limitNum?item.limitNum:item.todayCount}}/{{ item.limitNum }})</text
            >
          </view>
          <view
            class="d-btn flex-row flex-mc m-l-20"
            v-if="item.todayCount < item.limitNum"
            @click="goDone(item)"
          >
            <text class="btn-text">前往</text>
          </view>
          <view class="btn flex-row flex-mc m-l-20" v-else>
            <text class="btn-text">已完成</text>
          </view>
        </view>
      </view>
    </van-popup>
    <invite-popup ref="invitePop"></invite-popup>
		<xsb-debrisPopup
			v-if="showFinshPopup"
			@clickClose="closeFinishPopup" 
			:debrisInfoData="debrisInfoData"
			:lineBg="lineBg"
			:rewardImageStyle="rewardImageStyle"
			:btnImage="btnImage"
			:flashImage="flashImage"
			@clickOn="handleDrawgift"
			:listShow="listShow"
			:debrisList="debrisList"
		>
		</xsb-debrisPopup>
  </view>
</template>

<script>
import { doTask, doRoute } from "@/common/utils/ztv";
import { getRouteTask, getbookList } from "@/common/http/api/route.js";
import { taskFinish, getInviteList } from "@/common/http/api/member.js";
import { Toast } from 'vant'
export default {
  data() {
    return {
      show: false,
      routeId: null,
      memberId:null,
      list: [],
			debrisList: [],
			showFinshPopup: false
    };
  },
  onLoad(e) {},
  onShow() {
    this.getList();
  },
  computed:{
    taskDoneNum(){
      let num=0;
      this.list.forEach(item=>{
        if(item.todayCount >= item.limitNum){
          num++;
        }
      })
      return num;
    }
  },
  methods: {
		showAlert(item) {
			this.listShow = false
			this.flashImage = '../../static/images/flash_b.png'
			this.lineBg = '../../static/images/bg_line_b.png'
			this.debrisInfoData ={
				'piece': {
					'name': '任务完成，恭喜获得',
					'tip': '额外'+item.rewardValue+'次探索机会',
					'pic': '../../static/images/b_map.png'
				}
			}
			this.rewardImageStyle = {
				'position': 'absolute',
				'top': '45%',
				'left': '50%',
				'transform': 'translate(-50%,-50%)',
				'width': '366rpx',
				'height': '270rpx',
			}
			this.btnImage = '../../static/images/btn_wzdl.png'
			this.$nextTick(() => {
				this.showFinshPopup = true;
			})
		},
    closeFinishPopup(e){
      this.showFinshPopup=false;
    },
    showPopup(params) {
      this.routeId = params.routeId;
      this.memberId=params.memberId;
      this.show = true;
      this.getList();
    },
    getList() {
      if (this.routeId)
        getRouteTask({ routeId: this.routeId }).then((res) => {
          this.list = res.data;
        });
    },
    async goDone(item) {
      if (item.taskType == 3) {
        //拉新任务，显示海报
				const bookListRes = await getbookList({ routeId: this.routeId });
				const inviteListRes = await getInviteList();
				if (bookListRes.data) {
					this.$refs.invitePop.show({
						data: bookListRes.data[0],
						list: inviteListRes.data
					});
					this.show = false;
				}
      } else if (item.taskType == 4) {
        if (item.targetType == 1 || item.targetType == 2||item.targetType == 4) {
          //页面 或者小程序
          doRoute(item, (e) => {
            if (e.code == 200) {
              
            }
          });
          setTimeout(()=>{
                taskFinish({ foreignId: item.id,memberId:this.memberId }).then(() => {
                this.getList();
                this.showAlert(item);
              });
          },3000)
        } else if (item.targetType == 3) {
          //专题
          doTask(
            {
              taskId: item.id, //任务id
              taskType: 1, //任务类型 1：浏览任务 2.其他（后续拓展）
              resource_type: 2, //客户端跳转类型 2代表专题页 （其他值后续拓展）
              resource_body: item.targetValue, //  资源ID，本次活动代表专题ID
            },
            (e) => {
              if (e.endingState === 1) {
                setTimeout(()=>{
                  taskFinish({ foreignId: item.id ,memberId:this.memberId}).then(() => {
                  this.getList();
                  this.showAlert(item);
                })
                },2000)
                
              }
            }
          );
        }
      }
    },
		handleClose() {
			uni.$emit("refreshTimes");
		}
	},
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.custom-popup {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(@/static/images/popup_task.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 840rpx;
}
.popup-content {
  position: relative;
  position: fixed;
  bottom: 0;
  padding: 40rpx 15rpx 30rpx 15rpx;
  border-radius: 60rpx 60rpx 0 0;
  background-color: #fff;
  .title {
    position: absolute;
    width: 265rpx;
    height: 40rpx;
    top: -8%;
    left: 50%;
    transform: translate3d(-50%, -110%, 0);
  }
  .union {
    position: absolute;
    z-index: 99;
    top: -6%;
    left: 20%;
    width: 136.13rpx;
    height: 69rpx;
  }
  .number {
    color: #ffa004;
    font-family: PingFang HK;
    font-size: 24rpx;
  }
  .desc {
    color: #6a8148;
    font-family: PingFang HK;
    font-size: 24rpx;
  }
  .task {
    width: 650rpx;
    border-radius: 40rpx;
    background: #f2f6ec;
    padding: 15rpx 20rpx 15rpx 30rpx;
  }
  .icon {
    width: 41.75rpx;
    height: 41.75rpx;
		flex-shrink: 0;
  }
  .d-btn {
    width: 126rpx;
    height: 56rpx;
    flex-shrink: 0;
    border-radius: 50rpx;
    background: linear-gradient(181deg, #045bc7 -27.71%, #3a92ff 166.36%);
  }
  .btn {
    width: 126rpx;
    height: 56rpx;
		flex-shrink: 0;
    border-radius: 50rpx;
    background: #b9d6fb;
  }
  .btn-text {
    color: #ffffff;
    font-family: PingFang HK;
    font-size: 26rpx;
    font-weight: 500;
    letter-spacing: 7.8rpx;
  }
}
</style>
