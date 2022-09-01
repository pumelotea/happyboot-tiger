<script setup>
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import {
  NLayout, NLayoutHeader, NLayoutContent, NDataTable,
  NGrid, NGridItem, NDatePicker, NInput, NSelect, NButton, NSpace, NIcon, useMessage,
  NPopconfirm, NAlert, NP
} from 'naive-ui'
import { h, onMounted, reactive, ref } from 'vue'
import {
  AddSharp, TrashSharp, RefreshSharp, SearchSharp, DocumentOutline, PencilSharp, CreateOutline
} from '@vicons/ionicons5'

const message = useMessage()

function handlePositiveClick (row) {
  message.info('你点击了确定')
}

function handleNegativeClick (row) {
  message.info('你点击了取消')
}

const columns = [
  {
    type: 'selection',
    disabled (row, index) {
      return row.name === 'Edward King 3'
    }
  },
  {
    title: '角色',
    key  : 'role'
  },
  {
    title: '描述',
    key  : 'desc'
  },
  {
    title: '备注',
    key  : 'remark'
  },
  {
    title: '操作',
    key  : 'actions',
    width: '270',
    render (row) {
      return h(NSpace, null, {
        default: () => [
          h(NButton, {
            tertiary: true,
            size    : 'small'
          }, { default: () => '详情', icon: () => h(DocumentOutline) }),
          h(NButton, {
            tertiary: true,
            size    : 'small'
          }, { default: () => '编辑', icon: () => h(CreateOutline) }),
          h(NPopconfirm, {
            onPositiveClick: () => handlePositiveClick(row),
            onNegativeClick: () => handleNegativeClick(row)
          }, {
            default: () => '你确定以及肯定要删除这条数据吗？',
            trigger: () => h(NButton, {
              tertiary: true,
              size    : 'small',
              type    : 'error'
            }, { default: () => '删除', icon: () => h(TrashSharp) })
          })
        ]
      })
    }
  }
]

const checkedRowKeys = ref([])

const data = Array.apply(null, { length: 200 }).map((_, index) => ({
  key   : index,
  role  : `角色 - ${index}`,
  desc  : '我是描述',
  remark: '备注' + index
}))

const pagination = reactive({
  pageSize       : 20,
  showQuickJumper: true,
  showSizePicker : true,
  pageSizes      : [ 20, 50, 100 ],
  prefix ({ itemCount }) {
    return `总数 ${itemCount}`
  }
})

const options = ref([
  {
    label   : 'Everybody\'s Got Something to Hide Except Me and My Monkey',
    value   : 'song0',
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
    label   : 'You Won\'t See',
    value   : 'song3',
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
    label   : 'Michelle',
    value   : 'song7',
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
    label: 'I\'m looking through you',
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
    <n-layout
      style="height: 100%;"
      content-style="display:flex;flex-direction: column"
    >
      <n-layout-header>
        <n-grid
          x-gap="12"
          :cols="4"
          style="padding: 5px;box-sizing: border-box"
        >
          <n-grid-item>
            <n-input>
              <template #prefix>
                描述
              </template>
            </n-input>
          </n-grid-item>
          <n-grid-item>
            <n-input>
              <template #prefix>
                角色
              </template>
            </n-input>
          </n-grid-item>
        </n-grid>
        <n-grid
          x-gap="12"
          :cols="2"
          style="padding: 5px;box-sizing: border-box"
        >
          <n-grid-item>
            <n-space>
              <n-button type="info">
                <template #icon>
                  <n-icon :component="AddSharp" />
                </template>
                新增
              </n-button>
              <n-button type="error">
                <template #icon>
                  <n-icon :component="TrashSharp" />
                </template>
                删除
              </n-button>
            </n-space>
          </n-grid-item>
          <n-grid-item>
            <n-space justify="end">
              <n-button type="info">
                <template #icon>
                  <n-icon :component="RefreshSharp" />
                </template>
                刷新数据
              </n-button>
              <n-button type="info">
                <template #icon>
                  <n-icon :component="SearchSharp" />
                </template>
                查询
              </n-button>
              <n-button>重置</n-button>
            </n-space>
          </n-grid-item>
        </n-grid>
        <n-grid
          v-if="checkedRowKeys.length>0"
          x-gap="12"
          :cols="1"
          style="padding: 5px;box-sizing: border-box"
        >
          <n-grid-item>
            <n-alert type="info">
              你选中了 {{ checkedRowKeys.length }} 行
            </n-alert>
          </n-grid-item>
        </n-grid>
      </n-layout-header>
      <n-layout-content>
        <n-data-table
          v-model:checked-row-keys="checkedRowKeys"
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
