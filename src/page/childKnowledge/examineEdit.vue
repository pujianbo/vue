<template>
<ul class="chidexamine">
    <li>
        <label>标题：</label>
        <div class='cont'>关爱保障儿童健康成长</div>
    </li>
    <li>
        <label>时间：</label>
        <div class='cont'>2018年7月27日 9:00</div>
    </li>
    <li>
        <label>分类：</label>
        <div class='cont'>幼儿健康</div>
    </li>
    <li>
        <label>发布人：</label>
        <div class='cont'>张三</div>
    </li>
    <li>
        <label>可见范围：</label>
        <div class='cont'>全部产品端</div>
    </li>
    <li>
        <label>内容：</label>
        <div class='cont'>
            <p>外语的却变成了火星哥、断眉、黄老板、马老五、和一系列电音百大DJ...</p>
            <p>是不是哪里好像不太对？....</p>
            <img src="http://web.say365.xin/wxss/1532307542359.png" />
        </div>
    </li>
    <li>
        <label>审核说明：</label>
        <div class='cont'>
            <div>
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea">
                </el-input>
            </div>
            <div style="margin-top:20px">
                <el-button type="success" size="small" @click="submitForm('ruleForm',1)">发布</el-button>
                <el-button type="primary" size="small" @click="submitForm('ruleForm',2)">待修改</el-button>
                <el-button type="danger" size="small" @click="submitForm('ruleForm',3)">不通过</el-button>
                <el-button size="small" @click="submitForm('ruleForm',4)">返回</el-button>
            </div>
        </div>
    </li>
</ul>
</template>

<script>
export default {
    data() {

        return {
            textarea: '23'
        }
    },
    components: {},
    created() {},
    methods: {
        submitForm(formName, type) {
            if (type == 4) {
                this.$router.go(-1)
                return
            }
        },
    },
}
</script>

<style lang="less">
.chidexamine {

    color: #666;
    line-height: 1.5;
    & > li {
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 0.6em 0.4em;
        & > label {
            flex: none;
            width: 5em;
        }
        & > .cont {
            flex: 1;
        }
        &:last-child {
            border-bottom: 0;
        }
    }
}
</style>
