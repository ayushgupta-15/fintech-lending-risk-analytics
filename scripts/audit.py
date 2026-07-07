import pandas as pd
import io

def run_audit():
    df = pd.read_csv('loans_full_schema.csv')
    
    with open('reports/dataset_audit.md', 'w') as f:
        f.write("# Dataset Audit Report\n\n")
        
        f.write("## 1. Shape\n")
        f.write(f"- **Rows:** {df.shape[0]}\n")
        f.write(f"- **Columns:** {df.shape[1]}\n\n")
        
        f.write("## 2. Missingness (Top 20 Columns by Missing %)\n")
        missing_pct = (df.isnull().sum() / len(df)) * 100
        missing_df = missing_pct[missing_pct > 0].sort_values(ascending=False).to_frame(name='Missing %')
        if not missing_df.empty:
            f.write(missing_df.head(20).to_markdown())
        else:
            f.write("No missing values found.")
        f.write("\n\n")
        
        f.write("## 3. Loan Status Values\n")
        status_counts = df['loan_status'].value_counts(dropna=False).to_frame(name='Count')
        status_counts['Percentage'] = (status_counts['Count'] / len(df) * 100).round(2)
        f.write(status_counts.to_markdown())
        f.write("\n\n")
        
        f.write("## 4. Date Coverage (Issue Month)\n")
        if 'issue_month' in df.columns:
            date_counts = df['issue_month'].value_counts(dropna=False).sort_index().to_frame(name='Count')
            f.write(date_counts.to_markdown())
        else:
            f.write("`issue_month` not found.")
        f.write("\n\n")
        
        f.write("## 5. Potential Leakage Variables\n")
        f.write("The following variables appear to be post-origination and should likely not be used for predictive/policy models as they represent future information:\n")
        leakage_cols = [c for c in df.columns if 'paid' in c or c in ['balance', 'loan_status']]
        for c in leakage_cols:
            f.write(f"- `{c}`\n")
            
if __name__ == "__main__":
    run_audit()
