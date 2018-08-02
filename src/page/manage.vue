<template>
<div class="manage_page fillcontain">
    <el-container style="min-height:100vh">
        <el-aside width="210px">
            <el-menu :default-active="defaultActive" style="min-height: 100%;" background-color="#2E3B4E" text-color="white" router>
                <el-menu-item index="/manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-tickets"></i>知识提升管理</template>
                    <el-menu-item index="/childKnowledge">幼儿知识管理</el-menu-item>
                    <el-menu-item index="/childExamine">幼儿知识审核</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-tickets"></i>测评管理</template>
                    <el-menu-item index="/exam">测评题库管理</el-menu-item>
                    <el-menu-item index="/exam/edit/null">测评题库编辑</el-menu-item>
                </el-submenu>
                <el-submenu index="11">
                    <template slot="title"><i class="el-icon-document"></i>系统配置</template>
                    <el-menu-item index="/roleList">角色列表</el-menu-item>
                    <el-menu-item index="/permissionList">权限树管理</el-menu-item>
                    <el-menu-item index="/userList">用户列表</el-menu-item>
                    <el-menu-item index="/shopList">商家列表</el-menu-item>
                    <el-menu-item index="/foodList">食品列表</el-menu-item>
                    <el-menu-item index="/orderList">订单列表</el-menu-item>
                    <el-menu-item index="/adminList">管理员列表</el-menu-item>
                </el-submenu>
                <el-submenu index="31">
                    <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                    <el-menu-item index="/addShop">添加商铺</el-menu-item>
                    <el-menu-item index="/addGoods">添加商品</el-menu-item>
                </el-submenu>
                <el-submenu index="41">
                    <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                    <el-menu-item index="/visitor">用户分布</el-menu-item>
                    <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                </el-submenu>
                <el-submenu index="51">
                    <template slot="title"><i class="el-icon-edit"></i>编辑</template>
                    <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
                    <el-menu-item index="/vueEdit">文本编辑</el-menu-item>
                </el-submenu>
                <el-submenu index="61">
                    <template slot="title"><i class="el-icon-setting"></i>设置</template>
                    <el-menu-item index="/adminSet">管理员设置</el-menu-item>
                    <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                </el-submenu>
                <el-submenu index="71">
                    <template slot="title"><i class="el-icon-warning"></i>说明</template>
                    <el-menu-item index="/explain">说明</el-menu-item>
                </el-submenu>
                <el-submenu index="81">
                    <template slot="title"><i class="el-icon-document"></i>用户管理</template>
                    <el-menu-item index="/userCoachList">教练</el-menu-item>
                    <el-menu-item index="/8-2">幼教</el-menu-item>
                </el-submenu>
                <el-submenu index="91">
                    <template slot="title"><i class="el-icon-document"></i>园务管理</template>
                    <el-menu-item index="/kindergartenList">学校列表</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <head-top></head-top>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-main>
    </el-container>
</div>
</template>

<script>
import headTop from '@/components/headTop'
export default {
    components: {
        headTop,
    },
    computed: {
        defaultActive: function() {
            let {
                path
            } = this.$route
            path = '/' + path.split('/')[1]
            return path;
        }
    },
}
</script>


<style lang="less" scoped>
@import '../style/mixin';
.manage_page {}
</style>
