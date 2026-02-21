# ☕ Project: FreshlyGround Cafe - Cloud Migration

**AWS re/Start Portfolio Phase 1 | Junior Logic**

## 📌 Project Overview

This project involves the migration of a local business website for **FreshlyGround Cafe** to a highly available, cost-effective cloud environment using **Amazon S3**. By moving the site to AWS, I have ensured the cafe has a professional, durable web presence that is hosted in the **af-south-1 (Cape Town)** region.

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

## 🛠️ Tech Stack & Skills

* **Cloud Storage:** Amazon S3 (Simple Storage Service) configured for static web hosting.
* **Security & Identity:** Crafted and troubleshot JSON-based Bucket Policies to manage public access permissions.
* **Automation & CLI:** Used the AWS Command Line Interface (CLI) to perform efficient file synchronization from a local environment to the cloud.
* **Web Development:** HTML5 and CSS3 for the user-facing menu and error handling pages.
* **Business Communication:** Developed a professional PowerPoint presentation to align technical cloud solutions with business objectives.

## 🚀 Key Implementation Steps

1. **Architecture Setup:** Configured an S3 bucket with public access and static website hosting enabled.
2. **Security Configuration:** Resolved access issues by implementing a correct `policy.json` to allow global read access to web assets.
3. **Deployment Workflow:** Established a workflow using `aws s3 sync` to maintain version consistency between local files and the S3 bucket.
4. **Error Resilience:** Deployed a custom `error.html` page to provide a professional user experience for non-existent paths.

## 📁 Project Structure

| File | Description |
| --- | --- |
| `index.html` | The primary menu and landing page for the cafe. |
| `error.html` | Custom 404 page for professional error handling. |
| `policy.json` | The JSON security configuration used to manage bucket access. |
| `FreshlyGround-AWS-Presentation.pptx` | The technical business case and migration strategy presentation. |

## 🔗 Live Demo

> **Live Website:** [Click here to view the FreshlyGround Cafe](http://freshlyground-cafe-juniorlogic.s3-website.af-south-1.amazonaws.com)




