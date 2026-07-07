# Fintech Lending Decision Analytics — Business Problem & Metric Definitions

## 1. Business Context

A fictional digital lending company provides unsecured personal loans to consumers.
The company wants to grow loan volume, but faces a core tension:

> Approving more borrowers increases loan volume and potential interest income,
> but it also increases exposure to defaults and financial loss.

Management currently has no centralized system to answer:

- How is the loan portfolio performing overall?
- Which borrower and loan characteristics are associated with higher default risk?
- Are these risk differences statistically meaningful, or just noise?
- How would tightening or loosening lending criteria change portfolio volume and risk?

## 2. Central Business Question

> **How should the company balance loan growth against credit risk when setting
> lending policy?**

## 3. Project Scope

This project covers three analytical modules:

| Module | Business Question |
|---|---|
| **1. Portfolio Performance** | How large is the portfolio, and how healthy is it overall? |
| **2. Borrower Risk & Statistical Analysis** | Which borrower/loan attributes are associated with default, and is that association statistically meaningful? |
| **3. Policy Scenario Analysis** | What happens to volume and risk under stricter or looser lending criteria? |

**Out of scope for this version:** vintage/seasoning analysis (requires monthly
loan performance history this dataset does not have), machine learning models
(logistic regression / XGBoost / neural nets), a live interactive dashboard app,
and production underwriting logic. These are documented as future extensions,
not gaps that were missed.

## 4. Dataset Integrity Principle

This project will not report any financial metric that the underlying dataset
cannot actually support. Specifically:

- We calculate **Defaulted Principal Exposure**, not "actual financial loss" —
  the dataset does not tell us recovery amounts, so true loss is unknown.
- We do **not** calculate Expected Loss (PD × EAD × LGD) as an observed fact,
  because Loss Given Default (LGD) is not present in the data. If an
  illustrative Expected Loss figure is shown at all, the LGD assumption used
  (e.g., "assumed 60%") will be stated next to every instance of the number.
- Every derived metric below has a formula, and every analytical decision
  (missing values, outliers, category grouping) will be documented with its
  reasoning, not just its outcome.

## 5. Core Metric Definitions

| Metric | Formula |
|---|---|
| Total Loans | Count of unique `loan_id` |
| Total Funded Amount | Σ `loan_amount` |
| Average Loan Size | Total Funded Amount / Total Loans |
| Default Rate | Defaulted Loans / Total Eligible Loans* |
| Defaulted Principal Exposure | Σ `loan_amount` for loans with a default/charge-off status |
| Average Interest Rate | Σ `interest_rate` / Total Loans |
| Weighted Avg. Interest Rate | Σ(`loan_amount` × `interest_rate`) / Σ `loan_amount` |
| Segment Default Rate | Defaulted Loans in Segment / Total Eligible Loans in Segment |

*\*"Eligible loans" excludes loans still `Current`/in-progress with unresolved
outcomes, since these cannot yet be classified as defaulted or fully paid.
This exclusion rule will be stated explicitly in the cleaning notebook.*

### Default definition (to finalize once dataset is loaded)
A loan is treated as **defaulted** if `loan_status` is one of: `Charged Off`,
`Default`. A loan is treated as **non-defaulted / good** if `loan_status` is
`Fully Paid`. Loans with status `Current`, `In Grace Period`, or `Late` are
excluded from default-rate denominators (documented, not silently dropped —
they will still appear in portfolio volume/composition analysis).

## 6. Business Questions (trimmed to ~14, prioritizing rigor over count)

**Portfolio Performance**
1. How many loans are in the portfolio, and what is the total funded amount?
2. What is the average loan size and average/weighted interest rate?
3. What is the overall default rate?
4. How has loan volume changed over time (monthly/quarterly)?
5. Which loan purposes and credit grades represent the largest share of funded amount?
6. Is the portfolio concentrated in a small number of loan purposes or credit grades?

**Borrower Risk**
7. How does default rate vary across income bands?
8. How does default rate vary across debt-to-income (DTI) bands?
9. Are higher interest rates associated with higher observed default rates?
10. Which loan purpose shows the highest default rate?
11. What do the 4 defined risk segments (Credit Grade × DTI) look like in terms of volume, funded amount, and default rate?

**Statistical**
12. Is the difference in DTI between defaulted and non-defaulted borrowers statistically significant? (t-test / Mann-Whitney)
13. Is loan purpose associated with default outcome? (Chi-square)
14. Is credit grade associated with default outcome? (Chi-square)

**Decision**
15. How do a Conservative vs. Baseline vs. Growth lending policy compare in retained volume, funded amount, and default exposure?

## 7. Deliverable Structure (per finding)

Every finding in the executive summary will follow:

**Finding → Evidence → Business Impact**

And every recommendation will follow:

**Finding → Recommended Action → Expected Impact → Limitation**

## 8. Known Limitations (stated upfront, not discovered later)

- This is a **retrospective** analysis of historical approved loans — it says
  nothing about applicants who were rejected, so it cannot describe the full
  applicant population, only the approved-and-observed portfolio.
- The policy simulator is **not causal and not predictive** — it shows what
  the historical portfolio would have looked like under different retroactive
  filters, not what would happen to *future* applicants under a new policy.
- Statistical significance is reported alongside effect size specifically to
  avoid overstating small differences found in a large sample as important.
