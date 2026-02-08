# Contributing to GitHub Contribution Tracker

Thank you for considering contributing to this project! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature already exists
- Explain the use case
- Describe the expected behavior

### Submitting Pull Requests

1. **Fork the repository**

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/awsomeproject.git
   cd awsomeproject
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**:
   ```bash
   bun install
   ```

5. **Make your changes**:
   - Follow existing code style
   - Keep commits focused and atomic
   - Write clear commit messages

6. **Test your changes**:
   ```bash
   bun run dev
   ```

7. **Commit with conventional commits**:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve issue with X"
   git commit -m "docs: update README"
   ```

8. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Open a Pull Request**:
   - Describe what you changed
   - Reference any related issues
   - Add screenshots for UI changes

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Code Style

- Use functional React components
- Follow existing file structure
- Use Tailwind CSS for styling
- Keep components focused and reusable
- Comment complex logic

## Development Setup

**Prerequisites:**
- Node.js 18+ or Bun
- Git

**Tech stack:**
- React 19
- Rsbuild
- Tailwind CSS v4

## Need Help?

- Check existing issues
- Ask questions in issue comments
- Review the README and DEPLOY guides

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Happy coding! 🚀
