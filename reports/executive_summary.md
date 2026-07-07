# Executive Summary: Fintech Lending Risk Analytics

## Overview

This analysis evaluates historical lending portfolio performance, borrower risk patterns, and the trade-off between funded volume and observed default exposure.

The dataset contains 10,000 loans issued between January and March 2018. Because 93.75% of loans remain in Current status, observed default metrics are calculated only across loans with eligible resolved outcomes, while the complete portfolio is retained for volume and exposure analysis.

## Findings

### 1. Observed Default Rate Is Low, but Outcome Coverage Is Limited

**Finding:** The resolved portion of the historical portfolio has a low observed default rate, although the high proportion of unresolved loans limits conclusions about overall portfolio quality.

**Evidence:** Among 454 outcome-eligible loans, 7 were classified as defaulted, producing an observed default rate of 1.54%. However, 9,375 of the 10,000 loans remain in Current status.

**Business Impact:** The observed results indicate limited defaults among resolved loans, but management should avoid interpreting the 1.54% rate as evidence of long-term portfolio quality until a larger share of loans reaches observable outcomes.

### 2. DTI Shows Differences Across Loan Outcomes

**Finding:** Debt-to-Income ratio (DTI) demonstrates differences between defaulted and non-defaulted borrowers, although observed risk does not increase uniformly across every DTI band.

**Evidence:** Statistical testing identified a difference in DTI between defaulted and non-defaulted loans. Segment analysis also revealed elevated observed default rates in specific higher-DTI groups, including the 20–30% and 30–40% bands.

**Business Impact:** DTI remains useful for borrower risk segmentation and underwriting analysis, but it should not be treated as an isolated decision rule. Its interaction with other borrower characteristics, particularly Credit Grade, provides more actionable risk differentiation.

### 3. Credit Risk Is Concentrated in Specific Grade × DTI Segments

**Finding:** Observed default risk is concentrated in specific combinations of Credit Grade and DTI rather than increasing consistently across all lower credit grades.

**Evidence:** The Credit Grade × DTI risk matrix identified concentrated pockets of elevated observed default rates, including Grade D borrowers within selected DTI bands. Statistical analysis was used to evaluate the relationship between Credit Grade and loan outcome.

**Business Impact:** Broad restrictions based only on Credit Grade may remove substantial funded volume without proportionate risk reduction. More targeted underwriting rules that consider interactions between Grade and DTI may provide a better risk-volume trade-off.

## Policy Scenario Analysis

Three retrospective underwriting strategies were evaluated:

| Policy | Lending Rules | Funded Amount Retained | Default Exposure Reduction |
|---|---|---:|---:|
| Baseline | Existing portfolio | 100.0% | 0.0% |
| Balanced | Exclude Grade G and DTI > 35% | 95.5% | 0.0% |
| Conservative | Exclude Grades E–G and DTI > 25% | 74.7% | 33.9% |

The Balanced policy preserves most historical funded volume but produces no reduction in observed default exposure.

The Conservative policy achieves measurable risk reduction but sacrifices approximately one-quarter of historical funded amount.

## Recommendation

### Evaluate Intermediate and More Targeted Underwriting Rules

**Finding:** Neither tested alternative provides a clearly efficient risk-volume trade-off. The Balanced policy retains 95.5% of funded amount but reduces observed default exposure by 0%, while the Conservative policy reduces exposure by 33.9% at the cost of 25.3% of funded amount.

**Recommended Action:** Evaluate intermediate and more targeted policy rules, including combinations of Credit Grade and DTI thresholds, rather than immediately implementing either simulated strategy.

**Expected Impact:** More targeted scenario testing may identify underwriting rules that reduce exposure to historically higher-risk segments while preserving a greater proportion of funded volume.

**Limitation:** The analysis is retrospective and based on only 454 resolved loans and 7 observed defaults. The policy scenarios demonstrate historical trade-offs rather than causal or predictive estimates of future lending performance.

## Conclusion

The analysis demonstrates that simple underwriting restrictions do not necessarily produce efficient risk reduction.

Observed credit risk is concentrated in specific borrower segments, while broad policy filters can sacrifice substantial funded volume without proportionate reductions in default exposure.

The primary business opportunity is therefore to develop and evaluate more targeted underwriting strategies that balance portfolio growth against observed credit risk while continuing to monitor outcomes as more loans reach resolution.
