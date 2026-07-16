# Warehouse & Data Model

CreditLens uses a **Medallion Architecture**.

1. **Bronze**: Raw data loaded exactly as extracted from CSVs.
2. **Silver**: Cleaned, standardized data with consistent types and formats.
3. **Gold**: Business-ready aggregates (e.g., `portfolio_summary`, `risk_engine`, `policy_engine`).
