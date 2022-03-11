<script setup>
import HbAdminPageLayout from '../../components/HbAdminPageLayout.vue'
import {
  NLayout, NLayoutHeader, NLayoutContent, NDataTable,
  NGrid, NGridItem, NDatePicker, NInput, NSelect, NButton, NSpace, NIcon,
} from "naive-ui";
import {reactive, ref} from "vue";
import {
  AddSharp, TrashSharp, RefreshSharp, SearchSharp
} from "@vicons/ionicons5"

const columns = [
  {
    type: 'selection',
    disabled(row, index) {
      return row.name === 'Edward King 3'
    }
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
]

const data = Array.apply(null, {length: 200}).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))

const pagination = reactive({
  pageSize: 20,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [20, 50, 100],
  prefix({itemCount}) {
    return `总数 ${itemCount}`
  }
})

const options = ref([
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  },
  {
    label: "You Won't See",
    value: 'song3',
    disabled: true
  },
  {
    label: 'Nowhere Man',
    value: 'song4'
  },
  {
    label: 'Think For Yourself',
    value: 'song5'
  },
  {
    label: 'The Word',
    value: 'song6'
  },
  {
    label: 'Michelle',
    value: 'song7',
    disabled: true
  },
  {
    label: 'What goes on',
    value: 'song8'
  },
  {
    label: 'Girl',
    value: 'song9'
  },
  {
    label: "I'm looking through you",
    value: 'song10'
  },
  {
    label: 'In My Life',
    value: 'song11'
  },
  {
    label: 'Wait',
    value: 'song12'
  }
])

</script>

<template>
  <hb-admin-page-layout>
    <n-layout style="height: 100%;" content-style="display:flex;flex-direction: column">
      <n-layout-header>
        <n-grid x-gap="12" :cols="4" style="padding: 5px;box-sizing: border-box">
          <n-grid-item>
            <n-date-picker clearable></n-date-picker>
          </n-grid-item>
          <n-grid-item>
            <n-input>
              <template #prefix>
                姓名
              </template>
            </n-input>
          </n-grid-item>
          <n-grid-item>
            <n-select :options="options" clearable/>
          </n-grid-item>
          <n-grid-item>
            <n-input>
              <template #prefix>
                手机号
              </template>
            </n-input>
          </n-grid-item>
        </n-grid>
        <n-grid x-gap="12" :cols="2" style="padding: 5px;box-sizing: border-box">
          <n-grid-item>
            <n-space>
              <n-button type="info">
                <template #icon>
                  <n-icon :component="AddSharp"></n-icon>
                </template>
                新增
              </n-button>
              <n-button type="error">
                <template #icon>
                  <n-icon :component="TrashSharp"></n-icon>
                </template>
                删除
              </n-button>
            </n-space>
          </n-grid-item>
          <n-grid-item>
            <n-space justify="end">
              <n-button type="info">
                <template #icon>
                  <n-icon :component="RefreshSharp"></n-icon>
                </template>
                刷新数据
              </n-button>
              <n-button type="info">
                <template #icon>
                  <n-icon :component="SearchSharp"></n-icon>
                </template>
                查询
              </n-button>
              <n-button>重置</n-button>
            </n-space>
          </n-grid-item>
        </n-grid>
      </n-layout-header>
      <n-layout-content>
        <n-data-table
            ref="table"
            flex-height
            :columns="columns"
            striped
            :data="data"
            style="height: 100%;padding: 5px;box-sizing: border-box"
            :pagination="pagination"
        />

      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>

</style>
