# Project Structure

## Metadata
- This project is written on a Win11 computer using PowerShell as its default shell.
- I'm using a Bambulab A1 with BambuStudio slicer
## Overview

**GCode-Generator** is a project for generating G-code files, which are used to control CNC machines, 3D printers, and other automated manufacturing equipment. This document describes the project's directory structure and organization.

## Current State

The project is currently in its initial setup phase with minimal structure:
- `.git/` - Git version control repository
- `.markdown/` - Documentation directory for project documentation

## Recommended Project Structure

```
GCode-Generator/
├── .git/                    # Git version control
├── .markdown/               # Project documentation
│   ├── project-structure.md
│   ├── architecture.md      # System architecture documentation
│   ├── api-reference.md     # API documentation
│   ├── user-guide.md        # User documentation
│   ├── requirements/        # Project requirements (numbered files)
│   │   └── REQ-001-WIP-project-initialization.md
│   ├── system-docs/         # System documentation (numbered files)
│   │   └── 001-architecture.md
│   ├── reference-docs/      # Reference documentation
│   └── .temp/               # Plans and in-development notes (numbered files)
│       └── 001-WIP-plan-example-name.md
├── README.md               # Project README
├── LICENSE                 # License file
└── .gitignore              # Git ignore rules
```

## Directory Descriptions

### `.markdown/`
**Purpose**: Centralized location for all project documentation written in Markdown format.

**Subdirectories**:
- **`requirements/`**: Project requirements documents. 
  - **File Naming Format**: `REQ-{number}-{status}-{name}.md`
    - **Prefix**: `REQ-` prefix to identify requirement documents
    - **Number**: Sequential numbering (e.g., `001`, `002`, `003`)
    - **Status**: Either `WIP` (Work In Progress) or `DONE` (completed)
    - **Name**: Descriptive name using kebab-case (e.g., `project-initialization`, `feature-name`)
  - **Example**: `REQ-001-WIP-project-initialization.md`
  - **Implementation Rule**: When implementing a requirement, a corresponding plan document must always be created in `.markdown/.temp/`. The plan should link to the requirement, and the requirement should link back to the plan.
  - Each requirement document should link to any related plans in `.markdown/.temp/` that address its implementation.
- **`system-docs/`**: System documentation describing architecture, design decisions, technical specifications, and system-level documentation.
  - **File Naming Format**: `{number}-{name}.md`
    - **Number**: Sequential numbering (e.g., `001`, `002`, `003`)
    - **Name**: Descriptive name using kebab-case (e.g., `architecture`, `api-design`, `data-flow`)
  - **Example**: `001-architecture.md`
- **`reference-docs/`**: Reference documentation, external specifications, standards, and other reference materials used during development.
- **`.temp/`**: Storage for plans and in-development notes. This directory contains temporary planning documents that are actively being worked on.
  - **File Naming Format**: `{number}-{status}-plan-{actual-name}.md`
    - **Number**: Sequential numbering (e.g., `001`, `002`, `003`)
    - **Status**: Either `WIP` (Work In Progress) or `DONE` (completed)
    - **Actual Name**: Descriptive name using kebab-case (e.g., `gcode-generator-implementation`, `ui-design`)
  - **Example**: `001-WIP-plan-gcode-generator-implementation.md`
  - **Plan Structure**: Each plan file should contain:
    - **Requirements Links**: Links to the relevant requirement documents in `.markdown/requirements/` that this plan addresses
    - **Checklist**: Task items to track progress
    - **Notes Section**: Documents errors, issues, and resolutions
      - Errors should be marked with their resolution status
      - Once an error is resolved, it should be removed from the plan file
      - Keep only active/unresolved issues in the notes section
  - **Usage**: Use this directory for planning documents that are actively being developed. Once a plan is completed and implemented, consider archiving or moving it to appropriate documentation directories.

**Contents**:
- `project-structure.md` - This file, describing the project organization
- Additional documentation files as the project evolves

**Usage**: All project documentation should be placed here for easy discovery and maintenance.

## File Naming Conventions

- **Documentation**: Use `kebab-case.md` (e.g., `project-structure.md`)
- **Requirements**: `REQ-{number}-{status}-{name}.md` format where status is `WIP` or `DONE` (e.g., `REQ-001-WIP-project-initialization.md`)
- **System Docs (`.markdown/system-docs/`)**: `{number}-{name}.md` format (e.g., `001-architecture.md`)
- **Plans (`.markdown/.temp/`)**: `{number}-{status}-plan-{actual-name}.md` where status is `WIP` or `DONE` (e.g., `001-WIP-plan-gcode-generator-implementation.md`)

## Key Principles

1. **Documentation First**: All documentation lives in `.markdown/` for easy discovery
2. **Requirement-Plan Pairing**: When implementing a requirement, a corresponding plan document must always be created in `.markdown/.temp/` to track implementation progress
3. **Modularity**: Each module has a clear, single responsibility
4. **Extensibility**: Structure supports adding new features without major reorganization

## Notes for AI Agents

When working with this project:
- **Documentation**: Always check `.markdown/` first for project documentation
- **Requirements**: Check `.markdown/requirements/` for numbered requirement documents. Files include status (`WIP` or `DONE`). **Important**: When implementing a requirement, always create a corresponding plan document in `.markdown/.temp/`. Requirements link to their related plans, and plans link back to requirements for bidirectional traceability.
- **System Documentation**: Check `.markdown/system-docs/` for system architecture, design decisions, and technical specifications. Files are numbered sequentially (e.g., `001-architecture.md`).
- **Reference Materials**: Check `.markdown/reference-docs/` for external references and specifications
- **Plans**: Check `.markdown/.temp/` for active planning documents and in-development notes. Files are numbered and include status (`WIP` or `DONE`). Each plan contains links to relevant requirements, a checklist, and notes section for tracking errors and resolutions.

## Future Considerations

As the project grows, consider adding:
- `benchmarks/` - Performance benchmarking scripts
- `ci/` - Continuous integration configuration files
- `docker/` - Docker configuration if containerization is needed
