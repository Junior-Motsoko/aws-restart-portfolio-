# ☕ Project: FreshlyGround Cafe - Cloud Migration
**AWS re/Start Portfolio Phase 1 | Junior Logic**

## 📌 Project Overview
This project demonstrates the migration of a local business website for **FreshlyGround Cafe** to a highly available, cost-effective cloud environment using **Amazon S3**. This ensures a professional, durable web presence hosted in the **af-south-1 (Cape Town)** region.

## 🏗️ Architecture Diagram
```mermaid
graph LR
    subgraph Client_Side [User Environment]
        A[User in Cape Town] --> B(Web Browser)
    end

    subgraph Internet_Layer [The Network]
        B --> C((Public Internet))
    end

    subgraph AWS_Cloud [AWS Cloud: af-south-1]
        C --> D{S3 Bucket Policy}
        D -->|Access Granted| E[Amazon S3 Bucket]
        
        subgraph Bucket_Contents [Static Website Assets]
            E --- F[index.html]
            E --- G[error.html]
            E --- H[policy.json]
        end
    end

    style E fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:#fff
    style D fill:#D05C5C,stroke:#232F3E,color:#fff
    style AWS_Cloud fill:#f9f9f9,stroke:#232F3E,stroke-dasharray: 5 5
