<template>
    <div style="width: 100%;position: relative">
        <div class="fbListBox">
            <div class="btns">
                <div style="display: flex;justify-content: left;align-items: center;width: 60%">
                    <span>
                        状态:<el-select  v-model="status" placeholder="全部" style="margin: 0 0.1rem;width: 1.2rem;">
                        <el-option
                                v-for="item in statusData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    </span>
                    <el-input
                            style="width: 2rem"
                            placeholder="请输入搜索内容"
                            suffix-icon="el-icon-search"
                            v-model="searchInput">
                    </el-input>
                </div>
                <div>
                    <el-button type="info">多选</el-button>
                    <el-button type="danger">撤回</el-button>
                    <el-button type="primary">编辑</el-button>
                </div>
            </div>
            <div class="fbList">
                <div class="fbHeader xxx">
                    <span>
                        <el-checkbox v-model="isCheckedALL" @change="handleCheckAllChange"></el-checkbox>
                    </span>
                    <span>编号</span>
                    <span>项目名称</span>
                    <span>总点击量</span>
                    <span>状态</span>
                    <span>操作</span>
                </div>
                <div class="listwwBox">
                    <div class="fbHeader" v-for="(item,index) in fbData" :key="index">
                    <span>
                        <el-checkbox-group v-model="item.checked">
                            <el-checkbox></el-checkbox>
                        </el-checkbox-group>
                    </span>
                        <span>{{index + 1}}</span>
                        <span>{{item.proName}}</span>
                        <span>{{item.number}}</span>
                        <span>{{item.proStatus}}</span>
                        <span style="text-align: center">
                            <el-button size="mini" type="primary">编辑</el-button>
                            <el-button size="mini" type="primary" plain>同步</el-button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="pageBox">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage2"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        background
                        layout="sizes, prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        name: '',
        isCheckedALL: false,  //是否全选
        searchInput: '',
        status: "全部",
        dayData: [
          {
            value: '1月',
            label: '1月'
          },
          {
            value: '2月',
            label: '2月'
          },
          {
            value: '3月',
            label: '3月'
          },
          {
            value: '4月',
            label: '4月'
          },
          {
            value: '5月',
            label: '5月'
          },
          {
            value: '6月',
            label: '6月'
          },
          {
            value: '7月',
            label: '7月'
          },
          {
            value: '8月',
            label: '8月'
          },
          {
            value: '9月',
            label: '9月'
          },
          {
            value: '10月',
            label: '10月'
          },
          {
            value: '11月',
            label: '11月'
          },
          {
            value: '12月',
            label: '12月'
          }
        ],
        statusData: [
          {
            value: '全部',
            label: '全部'
          },
          {
            value: '已发布',
            label: '已发布'
          },
          {
            value: '未发布',
            label: '未发布'
          },
          {
            value: '定时发布',
            label: '定时发布'
          },
          {
            value: '已撤回',
            label: '已撤回'
          }
        ],
        fbData: [
          {
            checked: false,
            proName: '项目A',
            proStatus: '已发布',
            number: '1245',
          },
          {
            checked: false,
            proName: '项目B',
            proStatus: '定时发布',
            number: '3671',
          },
          {
            checked: false,
            proName: '项目C',
            proStatus: '未发布',
            number: '9850',
          },
          {
            checked: false,
            proName: '项目D',
            proStatus: '已撤回',
            number: '1460',
          },
          {
            checked: false,
            proName: '项目E',
            proStatus: '以发布',
            number: '1460',
          },
          {
            checked: false,
            proName: '项目F',
            proStatus: '定时发布',
            number: '7823',
          },
          {
            checked: false,
            proName: '项目G',
            proStatus: '未发布',
            number: '2351',
          },
          {
            checked: false,
            proName: '项目H',
            proStatus: '定时发布',
            number: '4728',
          },
          {
            checked: false,
            proName: '项目I',
            proStatus: '未发布',
            number: '6341',
          },
          {
            checked: false,
            proName: '项目J',
            proStatus: '已撤回',
            number: '7456',
          }

        ]
      }
    },
    methods: {
      // 全选
      handleCheckAllChange() {
        this.isCheckedALL = !this.isCheckedALL;
        if (this.isCheckedALL) {
          for (let i = 0; i < this.fbData.length; i++) {
            this.fbData[i].checked = true
          }
        } else {
          for (let i = 0; i < this.fbData.length; i++) {
            this.fbData[i].checked = false
          }
        }
      },
    }
  }
</script>

<style scoped>
    img {
        width: 100%;
    }

    .fbListBox {
        padding: 0.2rem;
        width: 100%;
        height: 8rem;
        background-color: white;
        margin-top: 0.2rem;
        border-radius: 0.08rem;
    }

    .btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .fbList {
        width: 100%;
        margin-top: 0.2rem;
    }

    .fbHeader {
        width: 100%;
        height: 0.48rem;
        line-height: 0.48rem;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }

    .fbHeader span {
        font-family: MicrosoftYaHei;
        font-size: 0.18rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.48rem;
        letter-spacing: 0.009rem;
        display: inline-block;
        height: 100%;
        color: #666666;
        align-items: center;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .xxx {
        background-color: rgba(208, 227, 255, 1);
    }

    .fbHeader span:nth-child(1) {
        width: 4%;
    }

    .fbHeader span:nth-child(2) {
        width: 6%;
    }

    .fbHeader span:nth-child(3) {
        width: 21%;
    }

    .fbHeader span:nth-child(4) {
        width: 14%;
    }

    .fbHeader span:nth-child(5) {
        width: 25%;
    }

    .fbHeader span:nth-child(6) {
        width: 30%;
    }
    .pageBox{
        position: absolute;
        bottom: 0.3rem;
        left: 0;
        width: 100%;
        text-align: center;
    }
    .listwwBox{
        width: 100%;
        height: 4.8rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .listwwBox::-webkit-scrollbar {
        display: none;
    }
</style>
