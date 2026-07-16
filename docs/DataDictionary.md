# Enterprise Credit Risk - Data Dictionary

## Bronze Layer
### `bronze.loans_raw`
Raw, unprocessed loans data exactly as ingested from CSV.

---

## Silver Layer
### `silver.loans_clean`
Cleaned, type-casted, and normalized loan records.
- `loan_id` (INT): Unique identifier.
- `annual_income` (REAL): Stated annual income.
- `debt_to_income` (REAL): DTI percentage.
- `monthly_income` (REAL): Derived monthly income (`annual_income / 12`).
- `income_band` (VARCHAR): Categorical bucket (`Low`, `Medium`, `High`).
- `dti_band` (VARCHAR): Categorical bucket (`Low (<20%)`, `Medium (20-35%)`, `High (>35%)`).
- `default_flag` (INT): Binary flag (`1` = Defaulted/Charged Off, `0` = Otherwise).
- `outcome_eligible` (INT): Binary flag indicating if the loan has reached a terminal state to be considered in default rate calculations.

---

## Gold Layer
### `gold.portfolio_summary`
High-level KPIs for executive dashboards.
- `total_loans` (INT): Total number of loans.
- `total_funded_amount` (REAL): Total principal funded.
- `default_rate` (REAL): Portfolio-wide default percentage.
- `expected_loss` (REAL): Total historical loss exposure.

### `gold.risk_engine`
Aggregated risk metrics by segment.
- `grade` (VARCHAR): Credit grade (A-G).
- `dti_band` (VARCHAR): DTI Bucket.
- `income_band` (VARCHAR): Income Bucket.
- `default_rate` (REAL): Segment-specific default rate.
- `risk_score` (REAL): Scaled risk score (0-1000) representing relative segment risk.

### `gold.policy_engine`
Loan-level table pre-joined with risk segments for fast policy simulations.

### `gold.recommendations`
Rules-based business recommendations.
- `risk_trigger` (VARCHAR): The detected anomaly (e.g. `High Default Rate`).
- `recommendation` (VARCHAR): The suggested business action.
- `business_impact` (VARCHAR): Estimated impact magnitude (`High`, `Low`).
