# Contributing Guidelines

Hello and thank you for considering contributing to this project! Your effort and expertise are what make open-source communities thrive. Before you start, please take a moment to review our guidelines to ensure a smooth contribution process for everyone.

## Table of Contents:
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Pull Request Process](#pull-request-process)
4. [Coding Standards](#coding-standards)
5. [Feedback & Questions](#feedback-&-questions)

### Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](LINK_TO_YOUR_CODE_OF_CONDUCT). Please ensure you read and understand it.

### Getting Started

- **Fork the Repository**: Click on the 'Fork' button at the top right of this page. This will create a copy of this repository in your account.
- **Clone Your Fork**: Open your terminal and run:
    ```
    git clone https://github.com/VashonG/Loan-Widget.git
    ```

- **Set Upstream**: Navigate to your cloned directory and set the original repository as 'upstream':
    ```
    git remote add upstream https://github.com/VashonG/Loan-Widget.git
    ```

### Pull Request Process

1. **Sync Your Fork**: Before making changes, sync your local repository with the original one:
    ```
    git fetch upstream
    git merge upstream/main
    ```

2. **Branching**: Always create a new branch for your modifications. Refrain from working directly on the `main` branch.
    ```
    git checkout -b branch-name
    ```

3. **Commit Your Changes**: Make relevant changes to the codebase, ensuring you adhere to the coding standards outlined below. Commit your changes with a clear and concise message describing your modifications.

4. **Push to Your Fork**: 
    ```
    git push origin branch-name
    ```

5. **Create a Pull Request**: Navigate to your fork on GitHub and click on the 'New pull request' button. Ensure you provide a detailed description of your changes.

6. **Review & Address Feedback**: If your pull request receives feedback, make the necessary changes and push them to your branch.

7. **Squash Commits**: Before your pull request is merged, you may be asked to squash your commits into one or a few cohesive ones.

### Coding Standards

- **Code Quality**: Write clean, understandable code. Include comments when necessary, and use meaningful variable/method names.
- **Consistency**: Stick to the coding conventions and styles used throughout the project. This may include things like indentation, bracket placement, and more.
- **Error Handling**: Ensure your code handles potential errors gracefully.
- **Documentation**: If introducing a new feature, ensure you include relevant documentation.

### Feedback & Questions

If you have questions or need feedback, feel free to reach out on our community chat or open an issue on GitHub. Always ensure you search existing issues and pull requests before creating a new one.

---

Thank you for your contribution and for making our codebase even better!
