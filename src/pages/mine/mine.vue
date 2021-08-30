<template>
	<view>
		<custom-nav-bar title=" " :backIconShow="false"></custom-nav-bar>
		<scroll-view style="padding-bottom: 120rpx;">
			<worker-center v-if="userType=== 1"></worker-center>
			<cooperation-center v-if="userType=== 3"></cooperation-center>
			<leader-center v-if="userType === 2"></leader-center>
		</scroll-view>
	</view>
</template>

<script>
	import leaderCenter from "./leader-center.vue";
	import workerCenter from "./woker-center.vue";
	import cooperationCenter from "./cooperation-center.vue";
	import { getStorage } from '../../common/utils.js'
	import {
		mapState
	} from "vuex";

	export default {
		components: {
			leaderCenter,
			workerCenter,
			cooperationCenter
		},
		created () {
			this.userType = getStorage('type').type
		},
		data() {
			return {
				userType: 0
			};
		}
	}
</script>

<style lang="scss" scoped>



</style>
