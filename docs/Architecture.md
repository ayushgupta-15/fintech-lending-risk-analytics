# Architecture

CreditLens employs a modern data stack and enterprise design patterns. 
- **Database**: PostgreSQL (Dockerized)
- **Data Engineering**: Python ETL -> Medallion Architecture (Bronze, Silver, Gold)
- **Transformations**: dbt (Data Build Tool)
- **Backend API**: FastAPI + raw psycopg
- **Frontend**: Next.js App Router + Tailwind + Shadcn UI
