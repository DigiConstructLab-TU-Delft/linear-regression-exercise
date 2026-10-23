<script setup lang="ts">
// Same 16 tasks-style scatter, as an LR chart: points, fitted line and residual ticks.
const X = [2, 3, 3.6, 4.8, 5.5, 6.4, 7.2, 8.1, 8.8, 9.6]
const Y = [3.4, 3.1, 4.9, 5.2, 6.8, 6.1, 8.2, 8.0, 9.9, 9.1]
const n = X.length
const xb = X.reduce((a, b) => a + b) / n, yb = Y.reduce((a, b) => a + b) / n
const b1 = X.reduce((a, x, i) => a + (x - xb) * (Y[i] - yb), 0) / X.reduce((a, x) => a + (x - xb) ** 2, 0)
const line = (x: number) => yb + b1 * (x - xb)
const sx = (x: number) => 40 + (x / 11) * 340
const sy = (y: number) => 230 - (y / 12) * 210
</script>

<template>
  <div class="cover-hero">
    <div class="cover-copy">
      <p class="kicker">CME4150</p>
      <h1>Linear regression exercise</h1>
      <div class="presenter-block">
        <p>Presenter</p>
        <strong>Dr. Ranjith K. Soman</strong>
      </div>
    </div>
    <svg viewBox="0 0 400 250" role="img" aria-label="Scatter plot with a fitted regression line">
      <line x1="40" y1="230" x2="385" y2="230" class="axis" />
      <line x1="40" y1="15" x2="40" y2="230" class="axis" />
      <line v-for="(x, i) in X" :key="'r' + i" :x1="sx(x)" :x2="sx(x)" :y1="sy(Y[i])" :y2="sy(line(x))" class="res" />
      <line :x1="sx(0.8)" :y1="sy(line(0.8))" :x2="sx(10.4)" :y2="sy(line(10.4))" class="fit" />
      <circle v-for="(x, i) in X" :key="i" :cx="sx(x)" :cy="sy(Y[i])" r="7" />
      <text x="212" y="248" text-anchor="middle">x</text>
      <text x="14" y="122" transform="rotate(-90 14 122)" text-anchor="middle">y</text>
    </svg>
  </div>
</template>

<style scoped>
.cover-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; min-height: 405px; }
.kicker { margin: 0 0 18px; color: #007fa8; font-size: 0.55em; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; }
h1 { margin: 0; color: #010101; font: 700 2.3em/1.1 Arial, Helvetica, sans-serif; letter-spacing: -0.04em; }
h1::after { content: ''; display: block; width: 54px; height: 5px; margin-top: 15px; background: #00aeef; }
h1 { max-width: 540px; }
.presenter-block { display: grid; gap: 4px; margin-top: 34px; padding-top: 16px; border-top: 1px solid #d9e2e6; max-width: 420px; }
.presenter-block p { margin: 0; color: #64727a; font-size: 0.48em; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.presenter-block strong { color: #1d2830; font-size: 0.8em; }
svg { width: 100%; height: auto; font: 12px Arial, sans-serif; fill: #64727a; }
.axis { stroke: #829099; stroke-width: 1.2; }
.fit { stroke: #00aeef; stroke-width: 3.5; }
.res { stroke: #e85d3f; stroke-width: 1.6; opacity: 0.7; }
circle { fill: #1d2830; stroke: #fff; stroke-width: 2; }
</style>
