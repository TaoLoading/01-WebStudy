<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Basic - 01</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 路由链接 -->
          <router-link class="list-group-item" to="/about">About</router-link>
          <router-link class="list-group-item" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- keep-alive指定保留缓存的组件，默认是保留所有，配合include和exclude使用。常用语优化程序(减少访问请求) -->
            <keep-alive include="Home">
              <!-- 在此处显示当前路由组件 -->
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped></style>
