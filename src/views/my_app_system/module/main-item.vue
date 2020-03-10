<template>
    <div>
        <div class="img-box">
            <img src="@/assets/img/publich_nav/background.png" alt="">
            <slot></slot>
        </div>
        <div class="footer">
            <div class="name-time">
                <p @click="changName(item)">{{item.projectName}}</p>
                <span>2020-1-11    11:11</span>
            </div>
            <div>
                <el-checkbox v-model="item.ischecked" @change="handleCheck(item.ischecked)"></el-checkbox>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "main-item",
        props:["item"],
        methods:{
            handleCheck(status){
                this.$emit('changeChecked',this.item.appId,status)
            },
            changName(item){
                this.$prompt('请输入修改后的应用名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    // console.log(item);
                    this.$emit("changeName",this.item.appId,value)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });

            }
        }

    }
</script>

<style scoped>
    img{
        width: 100%;
        height: 100%;
        border-radius: 0.08rem 0.08rem 0rem 0rem;
    }
    .img-box{
        width: 2.8rem;
        height: 1.4rem;
        border-radius: 0.08rem 0.08rem 0rem 0rem;
        position: relative;
    }
    .footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 0.2rem 0 0.2rem;
    }
    .name-time{
        text-align: left;
    }
    .mark{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        border-radius: 0.08rem 0.08rem 0rem 0rem;
        position: absolute;
        top:0;
        left: 0;
        display: flex;
    }
    .btns{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 1.94rem;
        padding: 0.25rem 0;
    }
    .el-button+.el-button{
        margin-left: 0;
    }
    ul{
        height: 0.84rem;
        background-color: #20212b;
        border-radius: 0.04rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    ul>li{
        color: #cccccc;
        cursor: pointer;
    }
    ul>li:hover{
        color: #2f80ed;
    }



</style>