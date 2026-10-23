---
theme: default
title: Linear regression exercise
layout: cover
class: cover-lesson
info: |
  ## CME4150: Managing Uncertainty and Data
  An explainer of the Linear Regression for Construction Tender Pricing notebook.
fonts:
  sans: Arial
  provider: none
transition: fade-out
drawings:
  persist: false
routerMode: hash
---

<ExerciseCover />

---
layout: default
---

<p class="kicker">Today</p>

# Agenda for the class

<div class="contrast-pair">
  <div>
    <h2>Part 1 · Exercise practical</h2>
    <p>You work through the linear regression exercise yourselves. I stop at key points with short explainers: the code, the output and the decision at each stage.</p>
  </div>
  <div>
    <h2>Part 2 · Group project consultation</h2>
    <p>The second half of the class is open consultation for your group projects. Bring your questions, data and progress.</p>
  </div>
</div>

---
layout: default
---

<p class="kicker">The construction problem</p>

# What should the subcontract cost?

<div class="two-col">
  <div>
    <p class="lead">A main contractor tenders a reinforced-concrete package. Thirty past packages give quantities, programme, access and the accepted price.</p>
    <p class="teaching-note">The notebook's data is simulated for teaching. It is not real market evidence.</p>
  </div>
  <table>
    <thead><tr><th>Planned project</th><th>Value</th></tr></thead>
    <tbody>
      <tr><td>Concrete volume</td><td>1,200 m³</td></tr>
      <tr><td>Reinforcement</td><td>110 tonnes</td></tr>
      <tr><td>Formwork area</td><td>3,050 m²</td></tr>
      <tr><td>Programme duration</td><td>16 weeks</td></tr>
      <tr><td>Site-access complexity</td><td>3 out of 5</td></tr>
    </tbody>
  </table>
</div>

---
layout: default
---

<p class="kicker">The data</p>

# What is in the data?

<table>
  <thead><tr><th>Variable</th><th>Role</th><th>Unit</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><code>accepted_price_kEUR</code></td><td><strong>Outcome (y)</strong></td><td>k€</td><td>Accepted subcontract price of a past package</td></tr>
    <tr><td><code>concrete_m3</code></td><td>Predictor</td><td>m³</td><td>Concrete volume</td></tr>
    <tr><td><code>reinforcement_t</code></td><td>Predictor</td><td>tonnes</td><td>Reinforcement quantity</td></tr>
    <tr><td><code>formwork_m2</code></td><td>Predictor</td><td>m²</td><td>Formwork area</td></tr>
    <tr><td><code>programme_weeks</code></td><td>Predictor</td><td>weeks</td><td>Programme duration</td></tr>
    <tr><td><code>access_score</code></td><td>Predictor</td><td>1–5</td><td>Site-access complexity</td></tr>
  </tbody>
</table>

<p class="teaching-note">30 rows, one per package. Column names are inferred from the notebook summary and may differ in the file.</p>

---
layout: default
---

<p class="kicker">Your turn · Notebook</p>

# Set up and look at the data

<div class="contrast-pair">
  <div><h2>Run cells 2–5</h2><p>Install and import the libraries, load the 30 packages, run <code>df.describe().T</code> and draw the concrete-versus-price scatter plot.</p></div>
  <div><h2>Be ready to answer</h2><p>Is the planned 1,200 m³ package within the historical range? Does price rise with concrete volume? How much do prices still vary?</p></div>
</div>

<p class="teaching-note">We continue when most of you have finished.</p>

---
layout: default
---

<p class="kicker">The notebook at a glance</p>

# Each step: problem, code, output, decision

<table>
  <thead><tr><th>Model</th><th>Price depends on</th><th>R²</th><th>Adj. R²</th><th>AIC</th></tr></thead>
  <tbody>
    <tr><td>A · Simple</td><td>Concrete</td><td>0.726</td><td>0.717</td><td>344.2</td></tr>
    <tr><td>B · Two predictors</td><td>Concrete + reinforcement</td><td>0.812</td><td>0.798</td><td>334.9</td></tr>
    <tr><td>Full</td><td>All five predictors</td><td>0.887</td><td>0.864</td><td>325.6</td></tr>
    <tr><td><strong>C · Selected</strong></td><td>Reinforcement + formwork + programme</td><td>0.883</td><td><strong>0.869</strong></td><td><strong>322.8</strong></td></tr>
  </tbody>
</table>

<p class="teaching-note">We walk through four stages: simple regression, quality and uncertainty, multiple regression, and variable selection with AIC. Each stage asks a problem, explains the code, shows the output, then states the decision.</p>

---
layout: default
---

<p class="kicker">1 · Simple regression · Problem</p>

# Can concrete volume alone predict the price?

<p class="lead narrow">Packages with more concrete tend to cost more, but prices scatter even at similar volumes. We need a line that turns volume into a price estimate.</p>

<p class="teaching-note">Model: Y = β₀ + β₁X + ε, with Y the price and X the concrete volume.</p>

---
layout: default
---

<p class="kicker">Your turn · Notebook</p>

# Fit the simple regression

<div class="contrast-pair">
  <div><h2>Run cells 6–7</h2><p>Fit price on concrete volume with OLS, print the summary and predict the planned package.</p></div>
  <div><h2>Be ready to answer</h2><p>What are the intercept and slope in words? What price do you get for 1,200 m³?</p></div>
</div>

<p class="teaching-note">We continue when most of you have finished.</p>

---
layout: default
---

<p class="kicker">1 · Simple regression · Code explained</p>

# Fit the line and predict

<div class="two-col">
<div>

```python
X = df[["concrete_m3"]]            # predictors
y = df["accepted_price_kEUR"]      # outcome
X = sm.add_constant(X)             # add intercept
model = sm.OLS(y, X).fit()         # least squares
print(model.summary())             # table of results

new = pd.DataFrame({"const": [1.0],
                    "concrete_m3": [1200]})
model.predict(new)                 # about 553.7
```

</div>
<div class="code-notes">
  <p><b>X, y</b> what we know vs what we want to estimate.</p>
  <p><b>add_constant</b> adds the intercept β₀ column.</p>
  <p><b>OLS(...).fit()</b> picks coefficients with the smallest squared residuals.</p>
  <p><b>summary()</b> coefficients, standard errors, t, p, R².</p>
  <p><b>predict</b> applies the equation to a new package.</p>
</div>
</div>

---
layout: default
---

<p class="kicker">1 · Simple regression · Output</p>

# The fitted line and first estimate

<div class="two-col">
  <div>
    <p class="equation-large">Price = 176.6 + 0.3142 × Concrete</p>
    <p>Price in k€, concrete in m³. Each extra m³ is associated with about €314.</p>
  </div>
  <div>
    <p class="big-number">€553.7k</p>
    <p class="small-label">estimate for 1,200 m³ of concrete</p>
  </div>
</div>

---
layout: default
---

<p class="kicker">1 · Simple regression · Decision</p>

# A usable start, not an answer

<div class="contrast-pair">
  <div><h2>What we conclude</h2><p>Concrete volume gives a first price, but only as a point estimate. It is not a guarantee.</p></div>
  <div><h2>What we do next</h2><p>Measure how good the line is and how uncertain the estimate is.</p></div>
</div>

---
layout: default
---

<p class="kicker">2 · Quality and uncertainty · Problem</p>

# How good is the line, and how sure are we?

<p class="lead narrow">A price estimate is only useful if we know its error, whether the relationship is real, and how wide the range is for one new package.</p>

<p class="teaching-note">Tools: residuals, SSE / RSE / RMSE / MAE, R², t-test, confidence and prediction intervals.</p>

---
layout: default
---

<p class="kicker">Your turn · Notebook</p>

# Check the model and its uncertainty

<div class="contrast-pair">
  <div><h2>Run cells 8–10 and 15</h2><p>Compute residuals and error statistics (8), plot the residual diagnostics (9), read the t-test (10), then get the confidence and prediction intervals (15).</p></div>
  <div><h2>Be ready to answer</h2><p>What does R² say? Is the slope statistically convincing? Why is the prediction interval wider?</p></div>
</div>

<p class="teaching-note">We continue when most of you have finished.</p>

---
layout: default
---

<p class="kicker">2 · Quality and uncertainty · Code explained</p>

# Residuals, tests and intervals

<div class="two-col">
<div>

```python
fitted = model.fittedvalues        # model price per package
resid = model.resid                # actual - fitted
model.rsquared                     # R², share explained
model.tvalues, model.pvalues       # t statistic and p

pred = model.get_prediction(new)
pred.summary_frame(alpha=0.05)     # 95% CI and PI
```

</div>
<div class="code-notes">
  <p><b>fittedvalues, resid</b> feed the residual plots and SSE, RMSE, MAE.</p>
  <p><b>rsquared</b> share of variation explained.</p>
  <p><b>tvalues, pvalues</b> test H₀: β₁ = 0.</p>
  <p><b>get_prediction</b> returns mean_ci (confidence) and obs_ci (prediction) bounds.</p>
  <p><b>alpha=0.05</b> asks for 95% intervals.</p>
</div>
</div>

---
layout: default
---

<p class="kicker">2 · Quality and uncertainty · Output</p>

# Fit, evidence and residuals

<div class="residual-list">
  <div><strong>Residuals</strong><p>Actual minus fitted price. +€50k means the model underestimated. Plots and a Q–Q check look for patterns.</p></div>
  <div><strong>Fit</strong><p>R² = 0.726: concrete explains about 73% of the variation. SSE, RSE, RMSE and MAE: lower is better.</p></div>
  <div><strong>Evidence</strong><p>Slope 0.3142, SE 0.0364, t = 8.62, p &lt; 0.001, 95% CI 0.240 to 0.389.</p></div>
</div>

---
layout: default
---

<p class="kicker">2 · Quality and uncertainty · Output</p>

# Confidence versus prediction interval

<IntervalBars />

<p class="teaching-note">The confidence interval covers the average price of comparable packages. The prediction interval covers one new package, so it is wider. 1,200 m³ is inside the 470–1,717 m³ data range.</p>

---
layout: default
---

<p class="kicker">2 · Quality and uncertainty · Decision</p>

# Real, but not precise enough alone

<div class="contrast-pair">
  <div><h2>What we conclude</h2><p>The association is strong and statistically convincing, but it is not causal. For tender risk, use the prediction interval: €402k to €705k is very wide.</p></div>
  <div><h2>What we do next</h2><p>Add more project information to narrow the range.</p></div>
</div>

---
layout: default
---

<p class="kicker">3 · Multiple regression · Problem</p>

# Does reinforcement add information?

<p class="lead narrow">Two packages with 1,200 m³ of concrete can cost different amounts if one needs 75 t of steel and the other 120 t. Multiple regression accounts for both.</p>

<p class="teaching-note">Model: Y = β₀ + β₁X₁ + β₂X₂ + ε.</p>

---
layout: default
---

<p class="kicker">Your turn · Notebook</p>

# Add reinforcement and test for overlap

<div class="contrast-pair">
  <div><h2>Run cells 16–18</h2><p>Fit concrete plus reinforcement, then compute the correlation matrix and the VIFs.</p></div>
  <div><h2>Be ready to answer</h2><p>What happens to the concrete coefficient? Which predictors overlap, and why does that matter?</p></div>
</div>

<p class="teaching-note">We continue when most of you have finished.</p>

---
layout: default
---

<p class="kicker">3 · Multiple regression · Code explained</p>

# Add predictors and check overlap

<div class="two-col">
<div>

```python
X2 = sm.add_constant(df[["concrete_m3",
                         "reinforcement_t"]])
model2 = sm.OLS(y, X2).fit()
model2.params                      # 127.6, 0.1186, 2.835

df[["concrete_m3", "reinforcement_t",
    "formwork_m2"]].corr()         # correlations

vif(Xfull.values, i)               # variance inflation
```

</div>
<div class="code-notes">
  <p><b>two columns in X</b> each coefficient holds the other predictor fixed.</p>
  <p><b>params</b> fitted coefficients.</p>
  <p><b>corr()</b> pairwise correlations between predictors.</p>
  <p><b>vif</b> above about 10 flags overlapping predictors.</p>
</div>
</div>

---
layout: default
---

<p class="kicker">3 · Multiple regression · Output</p>

# Better fit, but overlapping predictors

<div class="two-col">
  <div>
    <p class="equation-large">Price = 127.6 + 0.1186 C + 2.835 R</p>
    <p>R² rises from 0.726 to 0.812 and the estimate moves to €581.7k. The concrete p-value rises to 0.073.</p>
    <p class="muted">Correlations: concrete–formwork 0.95, concrete–reinforcement 0.88, reinforcement–formwork 0.84.</p>
  </div>
  <table>
    <thead><tr><th>Predictor</th><th>VIF</th></tr></thead>
    <tbody>
      <tr><td>Concrete volume</td><td><strong>14.27</strong></td></tr>
      <tr><td>Formwork area</td><td><strong>11.67</strong></td></tr>
      <tr><td>Reinforcement</td><td>4.54</td></tr>
      <tr><td>Site access</td><td>1.14</td></tr>
      <tr><td>Programme</td><td>1.05</td></tr>
    </tbody>
  </table>
</div>

---
layout: default
---

<p class="kicker">3 · Multiple regression · Decision</p>

# More predictors, less stable coefficients

<div class="contrast-pair">
  <div><h2>What we conclude</h2><p>Reinforcement helps, but concrete, formwork and steel overlap. Predictions stay fine, individual coefficients do not.</p></div>
  <div><h2>What we do next</h2><p>Choose a smaller set of predictors in a principled way, using AIC.</p></div>
</div>

---
layout: default
---

<p class="kicker">4 · Variable selection · Problem</p>

# Which predictors should stay?

<p class="lead narrow">R² always rises when we add a variable, so it cannot choose for us. We need a measure that rewards fit but penalises complexity.</p>

---
layout: default
---

<p class="kicker">4 · Variable selection · Problem</p>

# What is AIC?

<p class="lead narrow">The Akaike Information Criterion scores fit plus a charge for complexity. Lower is better.</p>

<p class="aic-eq" style="margin:6px 0">AIC = 2k − 2 ln(L̂)</p>

<div class="contrast-pair" style="gap:20px">
  <div><h2>−2 ln(L̂): the fit term</h2><p>L̂ is the maximised likelihood: how probable the observed prices are under the model. A better fit makes this term fall, and any added predictor can only help.</p></div>
  <div><h2>2k: the complexity penalty</h2><p>k counts estimated parameters, intercept included. Each extra predictor adds 2, so it must improve the fit by more than that.</p></div>
</div>

---
layout: default
---

<p class="kicker">4 · Variable selection · Problem</p>

# Reading AIC: only differences matter

<div class="two-col">
  <table>
    <thead><tr><th>Model</th><th>AIC</th><th>Δ from best</th></tr></thead>
    <tbody>
      <tr><td>Concrete only</td><td>344.2</td><td>21.4</td></tr>
      <tr><td>Concrete + reinforcement</td><td>334.9</td><td>12.1</td></tr>
      <tr><td>All five</td><td>325.6</td><td>2.8</td></tr>
      <tr><td><strong>Selected three</strong></td><td><strong>322.8</strong></td><td><strong>0</strong></td></tr>
    </tbody>
  </table>
  <div>
    <p>The AIC value alone means nothing; only the gap between models fitted to the <strong>same data</strong> does.</p>
    <p>Rule of thumb: a gap under about 2 means similar support, over about 10 means the weaker model has essentially none.</p>
    <p class="muted">Here the full model is only 2.8 behind, so dropping two predictors costs almost nothing in fit.</p>
  </div>
</div>

<p class="teaching-note">Why not R²? R² rises with every added variable, so it always favours the full model. AIC can go up when a variable adds too little, which is why it can choose a simpler model.</p>

---
layout: default
---

<p class="kicker">4 · Variable selection · Problem</p>

# Why AIC fits this notebook

<div class="residual-list">
  <div><strong>Guards against overfitting</strong><p>With 30 packages and five predictors, extra terms can chase noise. The penalty discourages that.</p></div>
  <div><strong>Works for any search</strong><p>The same score drives forward selection, backward elimination and the final model comparison.</p></div>
  <div><strong>Has limits</strong><p>It compares only the candidate models, assumes the same data, and is not an out-of-sample test. Small samples can make the choice unstable.</p></div>
</div>

---
layout: default
---

<p class="kicker">Your turn · Notebook</p>

# Select variables with AIC

<div class="contrast-pair">
  <div><h2>Run cells 19–22</h2><p>Fit the full model, run forward and backward AIC selection, compare the candidates and fit the final model.</p></div>
  <div><h2>Be ready to answer</h2><p>Which variables does each method keep? Why does the selected model beat the full one?</p></div>
</div>

<p class="teaching-note">We continue when most of you have finished.</p>

---
layout: default
---

<p class="kicker">4 · Variable selection · Code explained</p>

# Compare models with AIC

<div class="two-col">
<div>

```python
model.aic                          # AIC of one model

# forward step (sketch of the idea)
chosen, scores = [], {}
for var in candidates:
    m = sm.OLS(y, X[chosen + [var]]).fit()
    scores[var] = m.aic
# add the best var if it lowers AIC;
# repeat until no variable improves AIC
```

</div>
<div class="code-notes">
  <p><b>model.aic</b> AIC of a fitted model.</p>
  <p><b>forward</b> start empty, add the variable that lowers AIC most.</p>
  <p><b>backward</b> start full, drop the variable whose removal lowers AIC most.</p>
  <p><b>note</b> the loop is a sketch of the idea, not the notebook code.</p>
</div>
</div>

---
layout: default
---

<p class="kicker">4 · Variable selection · Output</p>

# Where AIC was used

<table>
  <thead><tr><th>Aspect</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td>Comparing models</td><td>344.2 → 334.9 → 325.6 → <strong>322.8</strong></td></tr>
    <tr><td>Forward selection</td><td>Add reinforcement (336.5), programme (326.7), formwork (322.8), then stop</td></tr>
    <tr><td>Backward elimination</td><td>Drop concrete, then site access: same three variables</td></tr>
    <tr><td>Full vs selected</td><td>R² 0.887 vs 0.883, but the selected model has the better adjusted R² and AIC</td></tr>
  </tbody>
</table>

---
layout: default
---

<p class="kicker">4 · Variable selection · Decision</p>

# Keep reinforcement, formwork and programme

<div class="contrast-pair">
  <div><h2>What we conclude</h2><p>The simpler three-predictor model wins on AIC and adjusted R². Concrete is dropped because it overlaps with other scope variables here, not because it is unimportant.</p></div>
  <div><h2>What we do next</h2><p>Check the diagnostics and price the planned package. With 30 rows, selection can be unstable.</p></div>
</div>

---
layout: default
---

<p class="kicker">Your turn · Notebook</p>

# Check the final model and price the package

<div class="contrast-pair">
  <div><h2>Run cells 23–26</h2><p>Fit the selected model, inspect the diagnostics and Cook’s distance, and compute the estimate with its intervals.</p></div>
  <div><h2>Be ready to answer</h2><p>What price and range do you get? Which rows are most influential? What would you add before tendering?</p></div>
</div>

<p class="teaching-note">We continue when most of you have finished.</p>

---
layout: default
---

<p class="kicker">5 · Tender estimate · Output</p>

# Final model and planned package

<div class="two-col">
  <div>
    <p class="equation-large">Price = 11.03 + 3.005 R + 0.0419 F + 6.536 P</p>
    <p>R tonnes, F m², P weeks, price in k€. Coefficients are conditional associations, not unit costs. RMSE €45.9k and MAE €36.6k are in-sample. Cook's distance flags rows 8, 16 and 7 for inspection.</p>
  </div>
  <div>
    <p class="big-number">€573,926</p>
    <p class="small-label">estimate for R = 110, F = 3,050, P = 16</p>
    <p class="muted">95% CI €551k to €596k. 95% PI €470k to €678k.</p>
  </div>
</div>

<IntervalBars :final="true" />

---
layout: default
---

<p class="kicker">5 · Tender estimate · Decision</p>

# A starting allowance, not a tender decision

<div class="contrast-pair">
  <div><h2>What we conclude</h2><p>About €574k is an evidence-based starting allowance. Do not use the upper prediction limit as contingency: that needs a separate risk assessment.</p></div>
  <div><h2>What we do next</h2><p>Add current quotations, scope, contract conditions and judgement. The notebook has no cross-validation and uses 30 simulated rows, so fit is not future accuracy.</p></div>
</div>

---
layout: default
---

<p class="kicker">Your turn · Notebook</p>

# Test yourself

<div class="contrast-pair">
  <div><h2>Run cell 27</h2><p>Answer the final quiz questions, then open the suggested answers to compare.</p></div>
  <div><h2>Be ready to answer</h2><p>Can you connect each statistical idea to the tender-pricing decision?</p></div>
</div>

<p class="teaching-note">We continue when most of you have finished.</p>

---
layout: section
---

# Takeaways

<p class="lead">A regression gives a quantitative starting point. It is not a tender decision.</p>

<div class="takeaways" style="color:#fff">
  <div><strong style="color:#00aeef">More is not better</strong><p style="color:#b9cbd1">Overlapping predictors weaken interpretation. Compare adjusted R² and AIC.</p></div>
  <div><strong style="color:#00aeef">Mind the intervals</strong><p style="color:#b9cbd1">Use the prediction interval for a single package.</p></div>
  <div><strong style="color:#00aeef">Validate out of sample</strong><p style="color:#b9cbd1">Add quotes and judgement before tendering.</p></div>
</div>
