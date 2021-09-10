<template>
  <!-- 这是问题部分的子组件，实现数据和question组件的交互 -->
    <question :questions="questionData"></question>
</template>

<script>
  import question from './question.vue'
  
  export default {
    components: {
      question,
    },
    data() {
      return {
        rawData:[],
        questionData: []
      }
    },
    created() {
      this.getdata();
    },
    methods:{
    async getdata(){
      const myGet = (data1) => {
      this.rawData = data1;
      this.temporary=JSON.parse(this.rawData);//将字符串转换成json对象
      this.rawData=this.temporary;
      console.log("rawData");
      console.log(this.rawData);
      this.cookData();
      };
       await fetch("http://175.27.240.116:5000/api/StuExam/GetAll",{
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        //body: JSON.stringify(item)
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((datastu) => myGet(datastu)) //datastu储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
      },
        cookData(){
        
        var raw=this.rawData;
        var flag=false;
        var dataBuffer=[];
        for(var item=0;item<raw.length;item++)
        { 
          //console.log('out'+item);
          if(dataBuffer.length===0)//为空直接插
          {
            let singleData={reply:[]};
            singleData.id=raw[item].QUESID;
            singleData.date=raw[item].QDATE;
            singleData.fromId=raw[item].ID1;
            singleData.fromName=raw[item].NAME1;
            singleData.likeNum=raw[item].LIKENUM1;
            singleData.content=raw[item].CONTENT;
            //console.log(item);
            //console.log(singleData);
            dataBuffer.push(singleData); 
            //console.log('here');
            //console.log(item);
            //console.log(singleData);

            //console.log(dataBuffer);
            continue;
            //console.log('done');
          }
          //console.log('fuck');
          //console.log(singleData);
          for(var temp=0;temp<dataBuffer.length;temp++)//判断是否已经在数据中
          {
            //console.log(temp);
            if(dataBuffer[temp].id===raw[item].QUESID){flag=true;}//已经在了
          }
          if(flag===false)
          {
            let singleData={reply:[]};
            singleData.id=raw[item].QUESID;
            //console.log(raw[item].QUESID);
            singleData.date=raw[item].QDATE;
            singleData.fromId=raw[item].ID1;
            singleData.fromName=raw[item].NAME1;
            singleData.likeNum=raw[item].LIKENUM1;
            console.log("haha");
            console.log(singleData);
            console.log(raw[item].LIKENUM1);
            singleData.content=raw[item].CONTENT1;
            singleData.reply=new Array;
            //console.log(item);
            dataBuffer.push(singleData); 
          }
          else flag=false;//重置flag
        }  
        
        console.log(11111);
        console.log(dataBuffer);
        
        for(var item in raw)
        {
           for(var q in dataBuffer)
          {
            if(dataBuffer[q].id===raw[item].QUESID)
            {
              console.log(88888);
              console.log(dataBuffer);
              if(raw[item].REPLYID==null)continue;
              let singleReply={};
              singleReply.id=raw[item].REPLYID;
              singleReply.fromId=raw[item].ID;
              singleReply.fromName=raw[item].NAME;
              singleReply.date=raw[item].RDATE;
              singleReply.likeNum=raw[item].LIKENUM;
              singleReply.content=raw[item].CONTENT;
              dataBuffer[q].reply.push(singleReply);//放入到singleData的reply数组中 
            }
          } 
        }
        for(var item in dataBuffer)
        {
          dataBuffer[item].replyNum=dataBuffer[item].reply.length; 
        } 
        console.log(dataBuffer);
        this.questionData=dataBuffer;
      }

   }
  }
</script>