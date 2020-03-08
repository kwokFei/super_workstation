<template>
    <div>
        <div class="block">
            <p>应用模块</p>
            <el-tree
                    accordion
                    draggable
                    :data="data"
                    :props="{ children: 'childModule', label: 'name'}"
                    default-expand-all
                    :expand-on-click-node="false"
                    @node-drag-end="handleDragEnd"
                    :render-content="renderContent">
            </el-tree>
        </div>
        <div class="btns">

            <el-button size="small" type="primary"  @click="dialogVisible = true">

                Logo上传
            </el-button>

            <el-dialog
                    title="LOGO上传"
                    :visible.sync="dialogVisible"
                    width="30%">
                <!--logo上传-->
                <span>
                    <el-button size="small" type="primary"  @click="dialogVisible = true">
                        <input type="text" v-model="fileName">
                        <input type="file" id="upload" name="upload" @change="getfileName">
                    Logo上传
                </el-button>
                </span>
                <el-tree
                        :props="{ children: 'childModule', label: 'name'}"
                        default-expand-all
                        :expand-on-click-node="false"
                        :data="data"
                        show-checkbox
                      >
                </el-tree>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadLogo">确 定</el-button>
              </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        name: "right",
        props:['modulesListRight'],
        watch:{
            modulesListRight(){
                this.data = JSON.parse(JSON.stringify(this.modulesListRight))
            },
        },
        data() {
            return {
                fileName : "", //上传的问题件名称
                data: [],
                dialogVisible: false
            }
        },

        methods: {
            //获取文件名称
            getfileName(){
                let f = document.getElementById('upload').files[0];
                let src = window.URL.createObjectURL(f);
                this.fileName = src
            },
            //上传logo
            uploadLogo(){
                this.dialogVisible = false;
                let f = document.getElementById('upload').files[0];
                let src = window.URL.createObjectURL(f);
                console.log(src);
                this.$store.commit('changelogoUrl',src)
                window.localStorage.setItem('logoUrl',JSON.stringify(src))
            },
            //删除模块
            remove(node, data) {
                // console.log(node);
                // console.log(data);
                this.$confirm('正在删除模块, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const parent = node.parent;
                    const children = parent.data.childModule || parent.data;
                    // console.log(children);
                    const index = children.findIndex((d) => d.code === data.code);
                    // console.log(index);
                    children.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // console.log(this.data);
                    this.resetModuleList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //修改模块的名称
            resetName(node,data){
                this.$prompt('请输入模块名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {

                    const parent = node.parent;
                    const children = parent.data.childModule || parent.data;
                    // console.log(children);
                    const index = children.findIndex((d) => d.name === data.name);
                    // console.log(index);
                    children[index].name = value
                    // children.splice(index, 1);
                    // console.log(this.data);
                    this.resetModuleList();

                    this.$message({
                        type: 'success',
                        message: '模块名称是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            //修改父元素选中的模块列表
            resetModuleList(){
                this.$emit("rightResetModuleList",this.data)
            },
            handleDragEnd(){
                this.resetModuleList()
            },
            renderContent(h, { node, data, store }) {
                return (
                    <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>

                    <el-button type="primary"type="text" circle on-click={ () => this.resetName(node, data) }>编辑</el-button>
                    <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                </span>
                </span>);
            }
        }
    }
</script>

<style scoped>
    #upload{
        filter: alpha(opacity = 0);
        position: absolute;
        top:0;left: 0;
        width: 100%;
        height: 100%;
        opacity: 0
    }
    .el-button{
        position: relative;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .btns{
        position: absolute;
        width: 100%;
        bottom: 0;
    }

</style>