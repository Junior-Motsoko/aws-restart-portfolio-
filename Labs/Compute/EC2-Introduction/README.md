---
title: Introduction to Amazon EC2
description: Hands-on lab covering EC2 instance launch, monitoring, security configuration, resizing, and termination protection
tags: [EC2, Compute, AWS, Instance Management, Security Groups]
---

# Introduction to Amazon EC2

**Lab Date:** 14 May 2026
**Score:** 1/1 ✅

## Overview

This lab provides hands-on experience with Amazon Elastic Compute Cloud (EC2), AWS's foundational compute service. The lab covers the complete lifecycle of an EC2 instance, from initial launch through monitoring, security configuration, resizing, and termination protection.

### Learning Objectives

By completing this lab, I gained practical experience with:
- Launching and configuring EC2 instances with custom user data
- Monitoring instance metrics and resource utilization
- Configuring security groups and network access controls
- Resizing instances to meet changing performance requirements
- Implementing termination protection for critical workloads

## Tasks Completed

### ✅ Task 1: Launch an Amazon EC2 Instance

Successfully launched a web server instance with the following specifications:
- Used Amazon Linux 2023 AMI
- Configured t3.micro instance type
- Applied user data script for automatic Apache installation
- Assigned to default VPC with public subnet
- Enabled public IP addressing for internet access

**Key Actions:**
- Selected appropriate AMI for workload
- Configured instance details and network settings
- Added user data script for automated configuration
- Created and configured security group
- Reviewed and launched instance

### ✅ Task 2: Monitor Your Instance

Monitored instance performance using CloudWatch metrics:
- Reviewed CPU utilization metrics
- Analyzed network traffic (in/out)
- Examined disk I/O operations
- Verified instance status checks
- Monitored system and instance reachability

**Monitoring Insights:**
- CloudWatch provides 5-minute metric intervals by default
- Detailed monitoring available for 1-minute intervals
- Status checks validate both AWS infrastructure and instance OS

### ✅ Task 3: Update Security Group

Modified security group rules to control network access:
- Added HTTP (port 80) inbound rule for web traffic
- Configured source as 0.0.0.0/0 for public access
- Verified existing SSH (port 22) rule
- Tested web server accessibility via public IP

**Security Best Practices Applied:**
- Principle of least privilege for access rules
- Specific port and protocol definitions
- Documented rule purposes for maintainability

### ✅ Task 4: Resize Your Instance

Changed instance type to demonstrate vertical scaling:
- Stopped the running instance
- Changed instance type from t3.micro to t3.small
- Restarted instance with new specifications
- Verified application functionality post-resize

**Resizing Process:**
1. Stop instance (EBS-backed instances only)
2. Modify instance type through console/CLI
3. Start instance with new configuration
4. Monitor performance with updated resources

### ✅ Task 5: Test Termination Protection

Implemented and tested instance termination protection:
- Enabled termination protection on running instance
- Attempted termination (blocked by protection)
- Disabled protection for controlled termination
- Verified protection mechanism effectiveness

**Protection Importance:**
- Prevents accidental deletion of critical instances
- Required step before terminating protected instances
- Essential for production environment safety

## Instance Configuration

| Configuration Item | Value |
|-------------------|-------|
| **AMI** | Amazon Linux 2023 AMI |
| **Instance Type** | t3.micro (later resized to t3.small) |
| **VPC** | Default VPC |
| **Subnet** | Public subnet (default) |
| **Storage** | 8 GB gp3 (General Purpose SSD) |
| **Public IP** | Auto-assigned (enabled) |
| **Security Group** | Custom SG with HTTP (80) and SSH (22) |
| **Key Pair** | Lab-provided key pair |
| **Termination Protection** | Enabled (then disabled for cleanup) |

## User Data Script

The following bash script was used to automatically configure the web server on instance launch:

```bash
#!/bin/bash
# Update system packages
yum update -y

# Install Apache web server
yum install -y httpd

# Start Apache service
systemctl start httpd

# Enable Apache to start on boot
systemctl enable httpd

# Create a simple web page
echo "<html><h1>Welcome to My EC2 Web Server</h1>" > /var/www/html/index.html
echo "<p>Instance provisioned on: $(date)</p>" >> /var/www/html/index.html
echo "<p>Instance ID: $(ec2-metadata --instance-id | cut -d ' ' -f 2)</p>" >> /var/www/html/index.html
echo "<p>Availability Zone: $(ec2-metadata --availability-zone | cut -d ' ' -f 2)</p>" >> /var/www/html/index.html
echo "</html>" >> /var/www/html/index.html
```

**Script Functionality:**
- Updates all system packages to latest versions
- Installs Apache HTTP Server (httpd)
- Configures Apache to start automatically on boot
- Creates custom HTML page with instance metadata
- Displays instance ID and availability zone dynamically

## Key Concepts Learned

| Concept | Description | Practical Application |
|---------|-------------|----------------------|
| **EC2 Instance Types** | Different combinations of CPU, memory, storage, and network capacity | Selected t3.micro for cost-effective testing; resized to t3.small for increased capacity |
| **Amazon Machine Image (AMI)** | Pre-configured template containing OS and software | Used Amazon Linux 2023 AMI for modern, secure foundation |
| **User Data** | Scripts executed during instance launch | Automated Apache installation and web page creation |
| **Security Groups** | Virtual firewalls controlling inbound/outbound traffic | Configured HTTP and SSH access with appropriate source restrictions |
| **CloudWatch Monitoring** | Service for collecting and tracking metrics | Monitored CPU, network, and disk metrics for performance analysis |
| **Instance Lifecycle** | States: pending, running, stopping, stopped, terminated | Managed instance through stop/start cycle for resizing |
| **Elastic IP vs Public IP** | Static vs dynamic IP addressing | Used auto-assigned public IP for temporary lab environment |
| **Termination Protection** | Safeguard against accidental instance deletion | Enabled protection for critical instance preservation |
| **Vertical Scaling** | Changing instance size to adjust capacity | Demonstrated by resizing from t3.micro to t3.small |
| **EBS Volumes** | Persistent block storage for EC2 instances | Understood that EBS persistence enables stop/start operations |

## Technical Skills Demonstrated

### AWS Console Navigation
- Navigated EC2 dashboard and instance management interfaces
- Located and interpreted CloudWatch metrics
- Modified instance attributes and security settings

### Linux System Administration
- Understood bash scripting for automation
- Recognized systemctl commands for service management
- Applied package management with yum

### Networking Fundamentals
- Configured security group rules with protocol and port specifications
- Understood difference between public and private IP addressing
- Applied CIDR notation for access control (0.0.0.0/0)

### Cloud Architecture Principles
- Implemented infrastructure as code concepts via user data
- Applied vertical scaling strategies
- Recognized importance of monitoring and observability

## Lab Outcomes

This lab successfully demonstrated:
1. ✅ Ability to launch and configure EC2 instances independently
2. ✅ Understanding of security group configuration and best practices
3. ✅ Knowledge of instance monitoring and CloudWatch integration
4. ✅ Capability to resize instances for changing requirements
5. ✅ Implementation of instance protection mechanisms

## Next Steps

To expand on this lab:
- Explore Auto Scaling groups for horizontal scaling
- Implement Application Load Balancers for traffic distribution
- Configure CloudWatch alarms for automated monitoring
- Practice infrastructure as code with CloudFormation or Terraform
- Implement EC2 instance backup strategies with AMIs and snapshots

---

**Lab completed successfully on 14 May 2026**
*AWS re/Start Program - Compute Module*
