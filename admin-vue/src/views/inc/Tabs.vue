<template>
  <!--el-tabs从element粘贴-->
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
    <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :index="index"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Tabs",
  // data()也是从element复制过来的,自己进行部分修改
  data() {
    return {
      // editableTabsValue: this.$store.state.menus.editableTabsValue,
      // editableTabs: this.$store.state.menus.editableTabs

     }
  },
  // computed 可以动态监听值的变化 : get() 和 set() 要一起出现
  computed: {
    editableTabs: {
      get() {
        return this.$store.state.menus.editableTabs
      },
      set(val) {
        this.$store.state.menus.editableTabs = val
      }
    },
    editableTabsValue: {
      get() {
        this.$store.state.menus.editableTabsValue
      },
      set(val) {
        this.$store.state.menus.editableTabsValue = val
      }
    }
  },
  methods: {
    // addTab(targetName) {
    //   let newTabName = '';
    //   this.editableTabs.push({
    //     title: 'New Tab',
    //     name: newTabName,
    //   });
    //   this.editableTabsValue = newTabName;
    // },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
</script>

<style scoped>

</style>