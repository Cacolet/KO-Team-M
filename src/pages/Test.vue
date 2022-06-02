<template>
  <div class="table" ref="scrollBox">
    <div class="table-body">
      <!--            <div :style="{ height: `${top}px` }"></div>-->
      <table not-cabinx-tag class="table-body-impl">
        <tbody not-cabinx-tag>
        <tr v-for="row in data" :key="row.key" not-cabinx-tag>
          <td
              v-for="col in row.data"
              :key="col.key"
              :style="{ width: `${col.width}px`, height: `${col.height}px` }"
              not-cabinx-tag
          >
            {{ row.key }}-{{ col.key }}
          </td>
        </tr>
        </tbody>
      </table>
      <!--            <div :style="{ height: `${bottom}px` }"></div>-->
    </div>
  </div>
</template>

<script>
// import { VirtualCore } from '@/components/baseTable/coreTable/virtualCore'
import debounce from "lodash.debounce";
import ScrollParent from "scrollparent";

export default {
  data: () => ({
    // 300 * 100 的表格
    data: Array.from({ length: 3000 }, (_, rowIndex) => {
      return {
        key: rowIndex,
        data: Array.from({ length: 100 }, (_, colIndex) => {
          return {
            key: colIndex,
            height: 50,
            width: 100,
          }
        })
      }
    }),
    renderData: [],
    scrollParent: null,
    // virtualCore: null,
    // top: 0,
    // bottom: 0,
  }),
  mounted() {
    this.scrollParent = ScrollParent(this.$refs['scrollBox'])
    this.scrollParent && this.scrollParent.addEventListener('scroll', this.handleScroll)
    // this.virtualCore = new VirtualCore({
    //     windowSize: window.innerHeight,
    //     data: this.data.map(i => i.data[0].height),
    //     buffer: 5,
    // })
    // const { start, end, leftSize: topSize, rightSize: bottomSize } = this.virtualCore.update(0)
    // this.top = topSize
    // this.bottom = bottomSize
    // this.renderData = this.data.slice(start, end + 1)
  },
  methods: {
    handleScroll: debounce(function debounceFn() {
      // const { start, end, leftSize: topSize, rightSize: bottomSize } = this.virtualCore.update(this.scrollParent.scrollTop)
      // this.top = topSize
      // this.bottom = bottomSize
      // this.renderData = this.data.slice(start, end + 1)
    }, 16),
  },
}
</script>

<style lang="less">
.table {
  overflow-anchor: none;
  &-body {
    overflow: auto hidden;
    &-impl {
      table-layout: fixed;
      display: table;
      width: max-content;
      margin: 0;
      padding: 0;
      tr {
        background-color: #fff;
      }
      td {
        box-sizing: border-box;
        box-shadow: inset 0 0 0 .5px #EBEBEB;
        padding: 8px;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        color: #191919;
        white-space: nowrap;
        &.sticky-cell {
          position: sticky;
          left: 0;
          z-index: 8;
        }
      }
    }
  }
}
</style>