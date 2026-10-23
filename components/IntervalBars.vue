<script setup lang="ts">
// Range bars for the planned package: simple model, then the final model (k EUR).
const props = withDefaults(defineProps<{ final?: boolean }>(), { final: false })
const lo = 350, hi = 750
const pos = (v: number) => ((v - lo) / (hi - lo)) * 100
const all = [
  { label: 'Simple model · confidence', a: 526.15, b: 581.2, m: 553.7, c: 'ci' },
  { label: 'Simple model · prediction', a: 402.4, b: 704.96, m: 553.7, c: 'pi' },
  { label: 'Final model · confidence', a: 551, b: 596, m: 573.9, c: 'ci' },
  { label: 'Final model · prediction', a: 470, b: 678, m: 573.9, c: 'pi' },
]
const rows = props.final ? all : all.slice(0, 2)
</script>

<template>
  <div class="bars">
    <div v-for="r in rows" :key="r.label" class="row">
      <span class="lab">{{ r.label }}</span>
      <div class="track">
        <div class="range" :class="r.c" :style="{ left: pos(r.a) + '%', width: pos(r.b) - pos(r.a) + '%' }" />
        <div class="mid" :style="{ left: pos(r.m) + '%' }" />
      </div>
      <span class="val">€{{ Math.round(r.a) }}k – €{{ Math.round(r.b) }}k</span>
    </div>
    <div class="axis"><span>€350k</span><span>€550k</span><span>€750k</span></div>
  </div>
</template>

<style scoped>
.bars { display: grid; gap: 10px; }
.row { display: grid; grid-template-columns: 190px 1fr 130px; gap: 14px; align-items: center; font: 12px Arial, sans-serif; color: #40525a; }
.lab { font-weight: 700; color: #1d2830; }
.track { position: relative; height: 18px; background: #eef2f4; }
.range { position: absolute; top: 0; bottom: 0; }
.range.ci { background: #00aeef; } .range.pi { background: #b9e6f7; }
.mid { position: absolute; top: -3px; bottom: -3px; width: 3px; background: #e85d3f; }
.val { text-align: right; font-variant-numeric: tabular-nums; }
.axis { display: flex; justify-content: space-between; margin: 0 130px 0 204px; color: #64727a; font: 11px Arial, sans-serif; }
</style>
