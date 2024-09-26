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
