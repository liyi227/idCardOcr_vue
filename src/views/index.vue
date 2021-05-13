<template>
  <div class="aaaa">
    <div class="div" v-for="(son,index) in list_a" :key="index">
      <div class="question">问题:{{son.question }}</div>
      <div class="type">类型：{{son.type=== 1 ? '单选' : '多选' }}</div>
      <div v-if="son.type === 1" class="answer">
        <li v-for="(sson,index1) in son.answer" :key="index1"> <span>{{sson.value}}</span> <input type="radio"
            :name="son.name" :value="sson.value" @change="get_radio_value(index)" v-model="checkedValue[index]"> </li>
        <div style="clear: both"></div>
      </div>
      <div v-else class="answer">
        <li v-for="(sson,index1) in son.answer" :key="index1"> <span>{{sson.value}}</span> <input type="checkbox"
            :name="son.name" :value="sson.value" @change="get_checkbox_value(index)" v-model="checkedValue1"> </li>
      </div>
      <hr>
    </div> <button @click="btnfun">提交</button>
  </div>
</template>

<script>

</script>

<style>
  li {
    list-style: none;
  }

  .div {
    margin: 6px 0px;
  }

  .question {
    width: 300px;
    text-align: left;
  }

  .type {
    width: 200px;
    text-align: left;
  }

  .answer li {
    width: 100%;
    height: 20px;
  }

  .answer span {
    float: left;
  }

  .answer input {
    float: right;
  }
</style>
