<template>
    <!-- 发布问题 -->
  <div class="container">
      <div class="input" >
        <el-input 
            v-model="myQuestion"
            type="textarea"
            :rows="5"
            autofocus
            @input="timeEffectInput"
            placeholder="写下你的疑惑">
        </el-input>

        <div class="countChar">
            <div class="count">
            {{currentLength}}
            </div>
        </div>

        <div class="btn">
            <div></div>
            <div class="center"></div>
            <div>
            <el-button class="btn" type="success" round @click="releaseQ()">发布</el-button>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          currentLength:'0/500',
          myQuestion:'',
          sendQuestion:{
            id:'',//个人id
            qdate:'',//提问时间
            content:'',
            quesid:'',//问题id
            likeNum:0
          }
      }
  },
  methods:{
       timeEffectInput(){
      var length = this.myQuestion.length
      this.currentLength=length.toString()+'/500'
      if (length >= 500) {
        this.$message('字数上限：500');
      }
      },
      releaseQ(){
        if(this.myQuestion==='')
        {
        this.$message('内容不能为空哦~');
        }
        else{
            this.sendQuestion.id=window.sessionStorage.getItem("id");
            const nowDate=new Date();
            var year=nowDate.getFullYear().toString();
            var month=(nowDate.getMonth()+1).toString();
            var day=nowDate.getDate().toString();
            var hour=nowDate.getHours().toString();
            var minutes=nowDate.getMinutes().toString();
            this.sendQuestion.qdate=year+'-'+month+'-'+day+' '+hour+':'+minutes;
            this.sendQuestion.quesid='q'+year+month+day+hour+minutes+this.sendQuestion.id;
            this.sendQuestion.content=this.myQuestion;
            console.log("sendQuestion");
            console.log(this.sendQuestion);
            this.sendData();
        }
      },
      async sendData(){
      /* const myGet = (data1) => {
      this.questionData = data1.data;
      }; */

        await fetch("http://175.27.240.116:5000/api/Problem/Insert",{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(this.sendQuestion)
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((datastu) => myGet(datastu)) //datastu储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
        //console.log(this.questionData)
        this.$message.success('发送成功');
        this.myQuestion='';
        this.$router.go(0)
      }
    }
}
</script>

<style lang="less" scoped>
.container{
    padding:0 10px;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    .input{
        margin-top:20px;
        box-sizing: border-box;
        .countChar{
            box-sizing: border-box;
            width:100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin-left:10px;
            align-items: center;
            margin-top:5px;
            .count{
            font-size: 13px;
            font-weight:300;
            color: #909399;
            }
        }
        .btn{
            margin-top:-5px;
            display: flex;
            flex-direction: row;
            .center{
                flex:1;
            }
        }
    }
}
</style>