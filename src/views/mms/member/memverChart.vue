<template>
    
  <div class="app-container">

    <div class="app-one">
      <div style="margin-right: 20px;margin-left: 40px">
        <el-card always="always">
          <div class="box-title">
            <span>会员激活量</span>
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
                <span>会员数</span>
                <div>{{member}}<span>人</span></div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-card always="always">
        <div class="box-title  box-one">
          <span>会员收支</span>
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
    <div class="app-one">
      <div style="margin-right: 20px;margin-left: 40px">
        <el-card always="always">
          <div class="box-title">
            <span>分类等级数</span>
            <div>
              <div class="block">
                <el-date-picker

                  size="mini"
                  v-model="threeDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  @change="threeDateChange"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="box">
            <div id="main3" style="width:360px; height: 260px"  >
            </div>
            <div class="demo">
              <div class="content">
                <span>会员数</span>
                <div>{{member2}}<span>人</span></div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-card always="always">
        <div class="box-title  box-one">
          <span>会员新增数</span>
          <div>
            <div class="block">
              <el-date-picker
                v-model="fourDate"
                size="mini"
                type="daterange"
                value-format="yyyy-MM-dd"
                @change="fourDateChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="box">
          <div id="main4" style="width:900px; height: 260px"  >
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
    getMemberIncome
  } from "@/api/member";

  export default {
    name: 'memverChart',
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
        a: 0

      }
    },
    created() {
      this.getMemberActivate2();
      this.getMemberClass2();
      this.getMemberIncomeAndExpenses2()
      this.getMemberNewlyIncreased2()
    },
    mounted() {

      this.drawLine2("main2");
      this.drawLine3("main3");
      this.drawLine4("main4");
    },
    methods: {
      oneDateChange() {
        this.getMemberActivate2();
      },
      threeDateChange() {
        this.getMemberClass2();
      },
      twoDateChange() {
        this.getMemberIncomeAndExpenses2();
      },
      fourDateChange() {
        this.getMemberNewlyIncreased2();
      },
      getMemberClass2() {
        let data = {
          data: this.threeDate
        }
        getMemberClass(data).then(res => {
          let result2 = new Array();
          let result = new Array();
          this.a = 0;
          res.data.map(item => {
            if (item.name == '会员' && item.value != 0) {

              item.itemStyle = {color: '#5B8FF9'}
              result2[this.a] = item.name;
              //console.log(result2+"asdasda")
              result[this.a] = item
              this.a = this.a + 1
              //console.log(a)
            }

            if (item.name == 'D1' && item.value != 0) {
              item.itemStyle = {color: '#5AD8A6'}
              result2[this.a] = item.name;
              result[this.a] = item
              //console.log(result2+"asdasda"+a)
              this.a = this.a + 1
            }
            if (item.name == 'D2' && item.value != 0) {
              item.itemStyle = {color: '#C2A5F9'}
              result[this.a] = item
              result2[this.a] = item.name;
              this.a = this.a + 1
            }
            if (item.name == 'D3' && item.value != 0) {
              item.itemStyle = {color: '#F59384'}
              result[this.a] = item
              result2[this.a] = item.name;
              this.a = this.a + 1
            }
            if (item.name == 'D4' && item.value != 0) {
              item.itemStyle = {color: '#C6D45C'}
              result[this.a] = item
              result2[this.a] = item.name;
              this.a = this.a + 1
            }
            if (item.name == 'D5' && item.value != 0) {
              item.itemStyle = {color: '#657798'}
              result[this.a] = item
              result2[this.a] = item.name;
              this.a = this.a + 1
            }
          })
          this.member2 = 0;
          //   let result=res.data
          for (let i = 0; i < result.length; i++) {
            this.member2 += result[i].value;
          }
          console.log(result2)

          this.drawLine3("main3", result, result2);
        })
      }
      ,
      getMemberActivate2() {

        let data = {
          data: this.oneDate
        }
        getMemberActivate(data).then(res => {
          res.data.map(item => {
            if (item.name == '未激活') {
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
          dateStart: this.twoDate[0],
          dateEnd: this.twoDate[1],
        }
        console.log(data,11111)
        getMemberIncome(data).then(res => {
          let seriess = res.data
          let dataTime = res.data[0].dataTime
          console.log(dataTime)
          let nameData = new Array();
          nameData[0] = res.data[0].name;
          nameData[1] = res.data[1].name;
          this.drawLine2("main2", seriess, dataTime, nameData)
        })
      },
      getMemberNewlyIncreased2(){
        let data={
          dataStar:this.fourDate[0],
          dataEnd:this.fourDate[1],
        }
        getMemberNewlyIncreased(data).then(res=>{
          let seriess=res.data
          let dataTime = res.data[0].dataTime
          let nameData = new Array();
          nameData[0] = res.data[0].name;
          console.log(nameData+134564)
          console.log(seriess+134564)
          console.log(dataTime+134564)

           this.drawLine4("main4",seriess,dataTime,nameData)
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
            data: ['已激活', '未激活']
          },
          series: [
            {
              name: '会员激活比',
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
      drawLine3(id, result, result2) {
        this.charts = echarts.init(document.getElementById(id));
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: result2
          },
          series: [
            {
              name: '会员激活比',
              type: 'pie',
              radius: ['40%', '75%'],
              avoidLabelOverlap: false,
              label: {
                position: 'inner'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '15',
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
      drawLine4(id,seriess,dataTime,nameData) {
        this.charts = echarts.init(document.getElementById(id));
        var option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:nameData
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

