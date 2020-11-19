<template>
  <div>
    <el-card class="box-card"
             v-loading="loading">
      <div class="box">
        <div class="box-left">
          <div>用户编号</div>
          <div>联系电话</div>
          <div>直推人数</div>
          <div>网体人数</div>
          <div>创建时间</div>
        </div>
        <div class="box-right"></div>
      </div>
      <el-tree :data="datas"
               ref="tree"
               node-key="id"
               :props="defaultProps"
               :render-content="renderContent">
      </el-tree>
    </el-card>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="50%">
      <div>
        <div class="head">
          <div>用户编号</div>
          <div>联系电话</div>
          <div>直推人数</div>
          <div>网体人数</div>
          <div>创建时间</div>
        </div>
        <div class="head">
          <div>{{obj.id}}</div>
          <div>{{obj.phone}}</div>
          <div>{{obj.direct}}</div>
          <div>{{obj.all}}</div>
          <div>{{obj.time}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    getRelationList,
    getRelationListOne
  } from '@/api/bmsApplyCaptainLog'
  export default {
    data () {
      return {
        datas: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible: false,
        obj: {},
        loading: false
      }
    },
    created () {
      this.getList()
    },
    methods: {
      renderContent (h, { node, data, store }) {
        return (
          <div style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
          <div on-click={() => this.append(node, data)} style=" flex: 4;width: 100%;display: flex;align-items: center;justify-content: space-between;">
          <div style="width: 100%;display: flex;align-items: center;justify-content: center;">{data.pId}</div>
          <div style="width: 100%;display: flex;align-items: center;justify-content: center">{data.phone}</div>
          <div style="width: 100%;display: flex;align-items: center;justify-content: center">{data.indirect}</div>
          <div style="width: 100%;display: flex;align-items: center;justify-content: center">{data.all}</div>
          <div style="width: 100%;display: flex;align-items: center;justify-content: center">{data.timer}</div>
          </div>
          <div style="flex: 1;display: flex;align-items: center;justify-content: center; color: #409EFF; font-size: 14px" on-click={(e) => this.seeItem(data, e)}>点击查看详情</div>
        </div>
      )
      },
      append (node, data) {
        if (data.flag == false) {
          return this.$message.error('下面没有网体了');
        }
        this.loading = true
        if (data.children.length != 0) {
          this.$refs.tree.store.nodesMap[data.id].expanded = false
        } else {
          this.$refs.tree.store.nodesMap[data.id].expanded = true
        }
        if (data.flag == true) {
          if (this.$refs.tree.store.nodesMap[data.id].expanded == true) {
            this.$refs.tree.store.nodesMap[data.id].expanded = true
            let result = {
              memberId: data.id
            }
            getRelationListOne(result).then(res => {
              this.loading = false
              let list = res.data
              for (let i = 0; i < list.length; i++) {
                let result = list[i].label.split(',')
                const newChild = { label: list[i].label, flag: list[i].flag, id: list[i].id, children: [], pId: result[0], phone: result[1], indirect: result[2], all: result[3], timer: result[4] };
                if (!data.children) {
                  this.$set(data, 'children', []);
                }
                data.children.push(newChild);
              }
            })
          } else {
            this.loading = false
          }
        }
      },
      // remove (node, data) {
      //   // const id = data.id
      //   // const parent = node.parent;
      //   // const children = parent.data.children || parent.data;
      //   // const index = children.findIndex(d => d.id === id);
      //   // // console.log(parent)
      //   // // console.log(children)
      //   // // console.log(children[index])
      //   // children[index].children = [];
      //   // this.getList()
      //   // for (let i = 0; i < children[index].children.length; i++) {
      //   //   children[i].children = [];
      //   // }
      // },
      seeItem (data, e) {
        e.stopPropagation()
        this.dialogVisible = true
        let result = data.label.split(',')
        this.obj.id = result[0]
        this.obj.phone = result[1]
        this.obj.direct = result[2]
        this.obj.all = result[3]
        this.obj.time = result[4]
        // console.log(this.obj)
      },
      getList () {
        this.loading = true
        getRelationList().then(res => {
          this.loading = false
          res.data.map(item => {
            let result = item.label.split(',')
            item.children = []
            item.pId = result[0]
            item.phone = result[1]
            item.indirect = result[2]
            item.all = result[3]
            item.timer = result[4]
          })
          this.datas = res.data
        })
      }
    }
  }
</script>

<style scoped>
  /deep/.custom-tree-node {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /deep/.el-tree {
    width: 100%;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .head > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
  }
  .box-left {
    margin-left: 24px;
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .box-left > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box-left > span {
    flex: 1;
    width: 24px;
    height: 24px;
  }
  .box-right {
    flex: 1;
  }
</style>
