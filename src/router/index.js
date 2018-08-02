import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const roleList = r => require.ensure([], () => r(require('@/page/System/roleList')), 'explain'); //角色列表
const permissionList = r => require.ensure([], () => r(require('@/page/System/permissionList')), 'explain'); //权限列表
const userCoachList = r => require.ensure([], () => r(require('@/page/Users/coachList')), 'explain');
const kindergartenList = r => require.ensure([], () => r(require('@/page/Kindergarten/list')), 'explain');

//新增使用的路由
const childKnowledge = r => require.ensure([], () => r(require('@/page/childKnowledge/list')), 'explain');
const childkngeEdit = r => require.ensure([], () => r(require('@/page/childKnowledge/edit')), 'explain');
const childExamine = r => require.ensure([], () => r(require('@/page/childKnowledge/examine')), 'explain');
const childexmEdit = r => require.ensure([], () => r(require('@/page/childKnowledge/examineEdit')), 'explain');
const exam = r => require.ensure([], () => r(require('@/page/exam/index')), 'explain');
const examEdit = r => require.ensure([], () => r(require('@/page/exam/edit')), 'explain');


const routes = [{
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/childKnowledge',
            component: childKnowledge,
            meta: ['知识提升管理']
        }, {
            path: '/childKnowledge/edit/:id',
            component: childkngeEdit,
            meta: ['知识提升管理', '幼儿知识发布'],
        }, {
            path: '/childExamine',
            component: childExamine,
            meta: ['幼儿知识审核']
        }, {
            path: '/childExamine/edit/:id',
            component: childexmEdit,
            meta: ['幼儿知识审核', '审核内容']
        }, {
            path: '/exam',
            component: exam,
            meta: ['心理测评管理']
        }, {
            path: '/exam/edit/:id',
            component: examEdit,
            meta: ['心理测评管理', '心里测评编辑']
        }, {
            path: '/roleList',
            component: roleList,
            meta: ['系统配置', '角色列表']
        }, {
            path: '/permissionList',
            component: permissionList,
            meta: ['系统配置', '权限列表']
        }, {
            path: '/userCoachList',
            component: userCoachList,
            meta: ['用户列表', '教练']
        }, {
            path: '/kindergartenList',
            component: kindergartenList,
            meta: ['园务管理', '学校']
        }, {
            path: '/addShop',
            component: addShop,
            meta: ['添加数据', '添加商铺'],
        }, {
            path: '/addGoods',
            component: addGoods,
            meta: ['添加数据', '添加商品'],
        }, {
            path: '/userList',
            component: userList,
            meta: ['数据管理', '用户列表'],
        }, {
            path: '/shopList',
            component: shopList,
            meta: ['数据管理', '商家列表'],
        }, {
            path: '/foodList',
            component: foodList,
            meta: ['数据管理', '食品列表'],
        }, {
            path: '/orderList',
            component: orderList,
            meta: ['数据管理', '订单列表'],
        }, {
            path: '/adminList',
            component: adminList,
            meta: ['数据管理', '管理员列表'],
        }, {
            path: '/visitor',
            component: visitor,
            meta: ['图表', '用户分布'],
        }, {
            path: '/newMember',
            component: newMember,
            meta: ['图表', '用户数据'],
        }, {
            path: '/uploadImg',
            component: uploadImg,
            meta: ['文本编辑', 'MarkDown'],
        }, {
            path: '/vueEdit',
            component: vueEdit,
            meta: ['编辑', '文本编辑'],
        }, {
            path: '/adminSet',
            component: adminSet,
            meta: ['设置', '管理员设置'],
        }, {
            path: '/sendMessage',
            component: sendMessage,
            meta: ['设置', '发送通知'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['说明', '说明'],
        }]
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})
