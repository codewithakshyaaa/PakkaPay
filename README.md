# 🏦 Autonomous AI-Powered Cheque Processing System

An advanced, end-to-end fintech solution engineered to eliminate queue friction in semi-urban and rural banking. By combining intelligent document processing with accessible financial inclusion tools, this system bridges the digital divide for both bank clerks and feature-phone customers while ensuring institutional-grade security.

---

## 📋 Table of Contents
* [Core Features](#-core-features)
* [System Workflow](#-system-workflow)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Usage Guide](#-usage-guide)
* [Roadmap](#-roadmap)
* [License](#-license)

---

## 🌟 Core Features

* **Intelligent OCR & AI Cross-Verification:** Extracts key cheque fields instantly and runs a specialized pipeline to cross-verify numerical values against written amounts.
* **Geo-Velocity Risk Scoring:** Evaluates transaction velocity and location patterns in real-time, displaying a color-coded fraud risk level (`Green`: Safe, `Yellow`: Review, `Red`: High Risk).
* **Inclusive IVR & SMS Authorization:** Bridges the digital divide by triggering automated smartphone notifications or IVR voice calls for one-tap voice verification for feature-phone users.
* **Cost-Effective UV Watermark Checks:** Utilizes an innovative smartphone flash simulation technique for secure ultraviolet watermark validations without expensive specialized hardware.
* **Tamper-Proof Blockchain Audit Trail:** Records every verified transaction onto a cryptographic ledger, establishing an immutable audit trail to eliminate insider tampering.

---

## 🔄 System Workflow

```text
[ Snap Photo via Web UI ] 
        │
        ▼
[ OCR & Field Extraction ] ──► [ AI Cross-Verification (Figures vs. Words) ]
        │
        ▼
[ Geo-Velocity Risk Scoring ] ──► [ Color-Coded Dashboard (Green / Yellow / Red) ]
        │
        ├─► [ Smartphone Flash Simulation (UV Watermark Check) ]
        │
        └─► [ IVR Call / SMS Trigger for Feature-Phone Authorization ]
                        │
                        ▼
         [ Cryptographic Blockchain Audit Trail ]
