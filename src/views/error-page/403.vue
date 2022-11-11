<template>
	<div class="j-full-curbox" style="position:fixed;background-color: #fff;">
		<div class="j-full-center" style="text-align: center;">
			<img src="@/assets/images/nopermission.png" alt="图片">
			<div style="color:#5A5B5C;">
				<slot>暂无权限</slot>
			</div>

      <button class="el-button el-button-primary mt-20" style="width:50vw" @click="$router.go(-2)">返 回</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			};
		}
	}
</script>

<style lang="less">

</style>
