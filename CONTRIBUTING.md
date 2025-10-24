# Contributing to Complaint Management System

Thank you for your interest in contributing to the Complaint Management System! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git
- MongoDB Atlas account (for testing)
- SendGrid account (for testing email functionality)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/complaint-management-system.git
   cd complaint-management-system
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/complaint-management-system.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   # Copy the example file
   cp env.example .env.local
   
   # Edit .env.local with your credentials
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Creating a New Feature

1. **Update your fork**
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   - Test all affected functionality
   - Test on different screen sizes (responsive design)
   - Test both user and admin flows
   - Verify email notifications work

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to GitHub and create a PR from your branch
   - Provide a clear description of changes
   - Reference any related issues

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples**:
```
feat: add complaint search functionality
fix: resolve authentication cookie issue
docs: update API documentation
refactor: simplify complaint filtering logic
```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type when possible
- Use meaningful variable and function names

**Example**:
```typescript
// Good
interface ComplaintData {
  title: string;
  description: string;
  category: Category;
}

// Avoid
const data: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper prop typing

**Example**:
```typescript
interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export default function Button({ onClick, label, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### API Routes

- Validate all input data
- Use proper HTTP status codes
- Return consistent error formats
- Add proper error handling

**Example**:
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    // Process request
    const result = await processData(body);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow responsive design principles
- Maintain consistent spacing and colors
- Use existing color scheme

**Example**:
```tsx
<div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Title
  </h2>
  <p className="text-gray-600">Content</p>
</div>
```

## Project Structure

```
complaint-management-system/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── login/             # Auth pages
│   └── page.tsx           # User dashboard
├── components/            # React components
│   ├── ComplaintForm.tsx
│   ├── ComplaintTable.tsx
│   └── FilterBar.tsx
├── lib/                   # Utility functions
│   ├── db.ts             # Database connection
│   ├── auth.ts           # Authentication helpers
│   ├── email.ts          # Email service
│   ├── api-client.ts     # API client utilities
│   └── models/           # Mongoose models
├── middleware.ts          # Route protection
├── scripts/               # Utility scripts
└── public/               # Static assets
```

## Adding New Features

### Adding a New API Endpoint

1. Create route file in appropriate directory
2. Implement request handler with validation
3. Add authentication/authorization checks
4. Update API documentation
5. Test thoroughly

### Adding a New Component

1. Create component file in `components/`
2. Define proper TypeScript interfaces
3. Implement responsive design
4. Add to appropriate page
5. Test on different screen sizes

### Adding a New Page

1. Create page in `app/` directory
2. Implement client-side logic
3. Add route protection if needed
4. Update navigation if applicable
5. Test user flow

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test the following:

- [ ] User registration and login
- [ ] Complaint submission
- [ ] Admin dashboard access
- [ ] Complaint filtering
- [ ] Status updates
- [ ] Complaint deletion
- [ ] Email notifications
- [ ] Logout functionality
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Error handling

### Testing Email Functionality

For development, you can:
1. Use SendGrid's test API
2. Check console logs for email content
3. Use a test email service like [Ethereal](https://ethereal.email/)

## Database Changes

If you need to modify the database schema:

1. Update the Mongoose model in `lib/models/`
2. Update TypeScript interfaces
3. Add migration notes in PR description
4. Test with existing data
5. Update API documentation

**Example**:
```typescript
// Before
const ComplaintSchema = new Schema({
  title: String,
  description: String,
});

// After
const ComplaintSchema = new Schema({
  title: String,
  description: String,
  attachments: [String], // New field
});
```

## Documentation

Always update documentation when:
- Adding new features
- Changing API behavior
- Modifying environment variables
- Updating dependencies
- Changing setup process

Files to update:
- `README.md` - Main documentation
- `API_DOCUMENTATION.md` - API changes
- `DEPLOYMENT.md` - Deployment changes
- Code comments - Complex logic

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All new features are tested
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design is maintained
- [ ] No linter errors

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how you tested the changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #issue_number
```

## Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**:
   - Step 1
   - Step 2
   - Step 3
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - OS
   - Browser
   - Node.js version
6. **Screenshots**: If applicable
7. **Additional Context**: Any other relevant information

## Feature Requests

When requesting features, include:

1. **Problem**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other solutions you considered
4. **Additional Context**: Why is this important?

## Code Review Process

1. A maintainer will review your PR
2. They may request changes or ask questions
3. Make requested changes and push updates
4. Once approved, a maintainer will merge your PR

## Community Guidelines

- Be respectful and constructive
- Help others when possible
- Follow the code of conduct
- Ask questions if you're unsure
- Celebrate each other's successes

## Getting Help

- Check existing documentation
- Search existing issues
- Ask in GitHub Discussions
- Join our community (if applicable)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes
- Project README (optional)

## Thank You!

Thank you for contributing to the Complaint Management System! Your efforts help make this project better for everyone.

---

**Happy Coding! 🚀**


