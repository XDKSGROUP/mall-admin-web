<template>

  <div class="app-container">

    <div class="app-one">
      <div style="margin-right: 20px;margin-left: 40px">
        <el-card always="always">
          <div class="box-title">
            <span>矿机收支</span>
            <div>
              <div class="block">
                <el-date-picker
                  size="mini"
                  v-model="oneDate"
                  @change="oneDateChange"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="box">
            <div id="main" style="width:360px; height: 260px"  >
            </div>
            <div class="demo">
              <div class="content">
                <span>总收支</span>
                <div>{{member}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-card always="always">
        <div class="box-title  box-one">
          <span>矿机等级</span>
          <div>
            <el-select v-model="value"  @change="twoDateChange" placeholder="矿机等级">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <div class="block">
              <el-date-picker
                v-model="twoDate"
                size="mini"
                @change="twoDateChange"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>

          </div>
        </div>
        <div class="box">
          <div id="main2" style="width:900px; height: 260px"  >
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import {
    getMemberActivate,
    getMemberClass,
    getMemberIncomeAndExpenses,
    getMemberNewlyIncreased,
    getMillIncomeAndExpenses
  } from "@/api/member";

  export default {
    name: 'millClassChart',
    data() {
      return {
        charts: "",
        value1: '',
        oneDate: null,
        twoDate: '',
        threeDate: null,
        fourDate: '',
        member: 0,
        member2: 0,
        MillId: '',
        a: 0,
        options: [{
          value: null,
          label: '所有'
        },{
          value: '1001',
          label: 'V1'
        }, {
          value: '1002',
          label: 'V2'
        }, {
          value: '1003',
          label: 'V3'
        }, {
          value: '1004',
          label: 'V4'
        }, {
          value: '1005',
          label: 'V5'
        }],
        value: null

      }
    },
    created() {
      this.getMemberActivate2();
      this.getMemberIncomeAndExpenses2()
    },
    mounted() {

    },
    methods: {
      oneDateChange() {
        this.getMemberActivate2();
      },

      twoDateChange() {
        this.getMemberIncomeAndExpenses2();
      },


      getMemberActivate2() {

        let data = {
          data: this.oneDate
        }
        console.log(this.value)
        getMillIncomeAndExpenses(data).then(res => {
          res.data.map(item => {
            if (item.name == '已完成') {
              item.itemStyle = {color: '#5AD8A6'}
            } else {
              item.itemStyle = {color: '#5B8FF9'}
            }
          })
          this.member = 0;
          let result = res.data
          for (let i = 0; i < result.length; i++) {
            this.member += result[i].value;
          }
          this.drawLine("main", result);
        })

      },
      getMemberIncomeAndExpenses2() {
        let data = {

          MillId: this.value,
          dataStar: this.twoDate[0],
          dataEnd: this.twoDate[1],
        }
        console.log("劲来了")

        getMemberIncomeAndExpenses(data).then(res => {
          let seriess = res.data
          let dataTime = res.data[0].dataTime

          console.log(seriess)
          let nameData = new Array();
          nameData[0] = res.data[0].name;
          // nameData[1] = res.data[1].name;
          this.drawLine2("main2", seriess, dataTime, nameData)
        })
      },

      drawLine(id, result) {
        this.charts = echarts.init(document.getElementById(id));
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 2,
            data: ['已完成', '未完成']
          },
          series: [
            {
              name: '矿机完成比',
              type: 'pie',
              radius: ['40%', '75%'],
              avoidLabelOverlap: false,
              label: {

                position: 'inner'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },

              data: result
            }
          ]
        };
        this.charts.setOption(option);
      },
      drawLine2(id, seriess, dataTime, nameData) {
        this.charts = echarts.init(document.getElementById(id));
        var option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: nameData
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dataTime
          },

          yAxis: {
            type: 'value'
          },

          series: seriess
        };
        this.charts.setOption(option);
      },

    }
  }
</script>

<style scoped>
  /deep/ .el-card .el-card__body {
    padding: 0;
    /*padding: 0px 20px 20px 20px;*/
  }
  /deep/ .el-input--suffix .el-input__inner{
    width: 110px;
  }

  /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 115px;
  }

  /deep/ .el-input--suffix .el-input__inner {
    padding-right: 10px;
  }

  /deep/ .el-date-editor .el-range-separator {
    padding: 0;
  }

  .app-one {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
  }

  .box-one .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 250px;
  }

  .box-title {
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 54px;
    background: #F2F6FC;
    border-radius: 4px 4px 0px 0px;
  }

  .box-title > span {
    color: #242425;
    font-size: 16px;
    font-weight: bold;
  }

  .box-title > div {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .box {
    position: relative;
    padding: 20px;
  }

  .demo {
    width: 80px;
    height: 80px;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 200px;
    transform: translate(-50%, -50%);
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .content > span {
    color: #ccc;
    font-size: 12px;
  }

  .content > div {
    margin-top: 2px;
    color: #000;
    font-size: 25px;
    font-weight: 600;
  }

  .content > div > span {
    font-size: 15px;
  }

  .box-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #F2F6FC;
  }
</style>
