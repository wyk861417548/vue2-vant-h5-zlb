<template>
	<div class="j-full-curbox" style="position:fixed;background-color: #fff;"  v-if="show" >
		<div class="j-full-center" style="text-align: center;">
			<img src="@/static/images/nodata.png" alt="图片">
			<div style="color:#5A5B5C;">
				<slot>暂无数据</slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			};
		}
	}
</script>

<style lang="less">

</style>
