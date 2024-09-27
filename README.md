## DSA Battle

This project is a competitive coding platform where users can engage in 1v1 matches or participate in a league-style competition to solve data structure and algorithm problems.

### Project Structure

- **Frontend**: Built using React and TypeScript.
- **Backend**: Node.js and Express, handling APIs and Socket.IO for real-time matchmaking.
- **Database**: PostgreSQL for storing user data, problem sets, and match results.
- **Monorepo**: Organized using `apps` (for web and server) and `packages` (for UI, tsconfig).

### TODOs

#### Features to Implement:

- [x] **Basic Matchmaking System**: A basic system for matching users for coding battles has been implemented.
- [ ] **Create Problem Repository with Different Levels**: Set up a repository that categorizes problems by difficulty level.
- [x] **Code Editor and Problem Display**: Implement an in-browser code editor with problem descriptions for live coding.
- [ ] **Timer for Tracking the Duration of Matches**: Add a timer to keep track of match duration and display it to users.
- [ ] **Code Execution Environment**: Set up a secure environment to compile and execute user-submitted code for battles.
- [ ] **User Authentication**
- [ ] **User Profiles**: Implement user profile pages to display coding statistics, matches played, and ranking.
- [ ] **League Mode**: Develop the league-style competition format, allowing users to participate in coding battles and climb the rankings.
- [ ] **Notifications**: Add notifications for when a user is invited to a match or a league event.
- [ ] **Leaderboard**: Create a dynamic leaderboard to track user progress.
- [ ] **Problem Setup and Approval System**: Implement a workflow for problem creation and approval by admins.
- [ ] **Live Matchmaking**: Finalize real-time matchmaking for 1v1 mode using Socket.IO.
- [ ] **Proctoring**: Develop a feature to monitor users during matches to ensure fairness.

#### Project Enhancements:

- [ ] **Improve UI/UX**: Refine the design for a better user experience across different devices.
- [ ] **Add Unit Tests**: Write unit tests for critical components in both frontend and backend.
- [ ] **Refactor Codebase**: Clean up and modularize the code for easier maintenance and scalability.

#### Documentation:

- [ ] **API Documentation**: Write detailed documentation for the backend API.
- [ ] **Developer Guide**: Add a developer setup guide explaining how to run the project locally.

---

### Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tusharag6/dsa-battles.git
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Run the project**:
   ```bash
   pnpm dev
   ```

# seed

`
INSERT INTO problems (title, description, difficulty) VALUES
('Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'Easy'),
('Add Two Numbers', 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.', 'Medium'),
('Longest Substring Without Repeating Characters', 'Given a string s, find the length of the longest substring without repeating characters.', 'Medium');

-- Insert sample test cases
INSERT INTO test_cases (problem_id, input, expected_output, is_hidden) VALUES
(1, '[2,7,11,15]\n9', '[0,1]', false),
(1, '[3,2,4]\n6', '[1,2]', false),
(1, '[3,3]\n6', '[0,1]', true),
(2, '[2,4,3]\n[5,6,4]', '[7,0,8]', false),
(2, '[0]\n[0]', '[0]', false),
(2, '[9,9,9,9,9,9,9]\n[9,9,9,9]', '[8,9,9,9,0,0,0,1]', true),
(3, 'abcabcbb', '3', false),
(3, 'bbbbb', '1', false),
(3, 'pwwkew', '3', true);
`
