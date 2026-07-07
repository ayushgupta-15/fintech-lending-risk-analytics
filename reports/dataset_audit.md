# Dataset Audit Report

## 1. Dataset Overview

The raw lending dataset contains:

- **Rows:** 10,000
- **Columns:** 56
- **Analysis Period:** January–March 2018

The dataset contains borrower characteristics, loan attributes, credit information, payment activity, and loan performance outcomes.

## 2. Missing Data Assessment

The following columns contain the highest proportions of missing values:

| Column | Missing % |
|:--|--:|
| verification_income_joint | 85.45 |
| annual_income_joint | 85.05 |
| debt_to_income_joint | 85.05 |
| months_since_90d_late | 77.15 |
| months_since_last_delinq | 56.58 |
| months_since_last_credit_inquiry | 12.71 |
| emp_title | 8.33 |
| emp_length | 8.17 |
| num_accounts_120d_past_due | 3.18 |
| debt_to_income | 0.24 |

### Analytical Implications

The high missingness in joint-income variables is likely associated with loans that do not involve joint applicants rather than conventional data-quality failures.

Similarly, missing values in delinquency-related variables may represent borrowers without previous delinquency events.

Missing values were therefore evaluated according to their business meaning rather than being automatically removed or imputed.

The `debt_to_income` variable contains only **0.24% missing values** and was retained for credit risk segmentation, with missing observations handled explicitly during analysis.

## 3. Loan Status Distribution

| Loan Status | Count | Percentage |
|:--|--:|--:|
| Current | 9,375 | 93.75% |
| Fully Paid | 447 | 4.47% |
| In Grace Period | 67 | 0.67% |
| Late (31–120 days) | 66 | 0.66% |
| Late (16–30 days) | 38 | 0.38% |
| Charged Off | 7 | 0.07% |

### Analytical Implications

The portfolio is heavily dominated by **Current loans (93.75%)**.

Treating all Current loans as non-default observations would artificially lower the calculated default rate because these loans have not necessarily reached a final observable outcome.

To address this issue, the analytical pipeline distinguishes between:

- **Portfolio population:** all loans used for volume and exposure analysis.
- **Outcome-eligible population:** loans with sufficiently observable outcomes used for default-rate calculations.

An `outcome_eligible` indicator was introduced during data preparation to maintain this distinction consistently across Python, SQL, and Power BI analysis.

## 4. Date Coverage

| Issue Month | Count |
|:--|--:|
| Jan-2018 | 3,395 |
| Feb-2018 | 2,988 |
| Mar-2018 | 3,617 |

### Analytical Implications

The dataset covers only **January through March 2018**.

Therefore, monthly funding analysis should be interpreted as a comparison across the available three-month observation period rather than as a full-year trend analysis.

## 5. Potential Data Leakage Variables

The following variables contain post-origination information and were identified as potential sources of data leakage:

- `loan_status`
- `balance`
- `paid_total`
- `paid_principal`
- `paid_interest`
- `paid_late_fees`

### Analytical Implications

These variables contain information generated after loan origination and would not have been available when an underwriting decision was made.

They were therefore excluded as explanatory variables from borrower risk analysis and policy-rule development.

`loan_status` was used only to construct observed outcome indicators required for retrospective portfolio performance analysis.

## 6. Key Audit Conclusions

The dataset audit identified three considerations that directly shaped the analytical methodology:

1. **High missingness is structurally concentrated** in joint-applicant and credit-history variables and should not automatically be interpreted as poor data quality.

2. **The dominance of Current loans creates an outcome-observation problem.** Default-rate calculations must distinguish between total portfolio volume and loans with observable outcomes.

3. **Post-origination variables introduce potential data leakage** and should not be used when evaluating underwriting risk factors or constructing lending policy rules.

These findings informed the subsequent data-cleaning, exploratory analysis, statistical testing, SQL analytics, and lending policy simulation stages.
