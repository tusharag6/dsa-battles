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
('Add Two Numbers (Simple)', 'Given two integers a and b, return their sum.', 'Easy');

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
(4, '3\n5', '8', false),
(4, '-2\n7', '5', false),
(4, '0\n0', '0', true),
(4, '-10\n-20', '-30', false);
`

`
#include <iostream>
using namespace std;

int main() {
int a, b;
cin >> a >> b;
cout << a+b << endl;
return 0;
}

`

# Game Modes

Here’s an expanded overview of the selected matchmaking modes for your DSA Battle website:

---

### **1. One-on-One**

#### **Description**:

A direct, head-to-head competition between two players.

#### **Features**:

- **Problem Set**: Both players are given the same set of problems, ensuring fairness.
- **Scoring**: Points based on:
  - Correctness of solutions.
  - Time taken to solve each problem.
  - Penalty for incorrect submissions (e.g., -10% for each wrong attempt).
- **Matchmaking**:
  - Skill-based pairing using an ELO or similar ranking system.
  - Option to challenge friends directly.
- **Game Modes**:
  - Classic Mode: Solve a fixed number of problems (e.g., 5 problems).
  - Blitz Mode: Solve as many problems as possible within a short time (e.g., 10 minutes).

#### **Use Case**:

Ideal for players looking to test their skills in a focused, intense setting.

---

### **2. Free-for-All (FFA)**

#### **Description**:

Multiple players (e.g., 5-10) compete in a shared session to score the highest points.

#### **Features**:

- **Problem Set**: Shared pool of problems visible to all participants.
- **Scoring**:
  - Points awarded based on correctness and speed.
  - Bonus points for being the first to solve a problem.
- **Leaderboard**:
  - Live updates showing player rankings during the session.
- **Game Modes**:
  - Casual: Play with random participants.
  - Themed: Problems focused on specific topics like sorting or recursion.

#### **Use Case**:

Perfect for fostering competitive spirit and encouraging group participation.

---

### **3. Tournament Mode**

#### **Description**:

A structured competition where players advance through brackets to become the champion.

#### **Features**:

- **Formats**:
  - Single Elimination: Lose once and you're out.
  - Double Elimination: Get a second chance after the first loss.
  - Round Robin: Play against every participant in the group.
- **Match Structure**:
  - Timed matches or problem sets with increasing difficulty as the rounds progress.
- **Scoring**:
  - Advancement determined by match wins or cumulative scores.
- **Finale**:
  - A climactic round with more challenging problems or unique formats.

#### **Use Case**:

Great for community events, encouraging long-term engagement.

---

### **4. Timed Marathon**

#### **Description**:

A solo or multiplayer race to solve as many problems as possible within a fixed time limit.

#### **Features**:

- **Time Limit**: Common durations include 30 minutes or 1 hour.
- **Problem Dynamics**:
  - Problems start easy and become progressively harder.
  - Option to skip problems at a slight penalty.
- **Scoring**:
  - Points awarded for each correct solution.
  - Bonus for solving consecutive problems correctly.
- **Game Modes**:
  - Solo Mode: Compete for personal best scores.
  - Multiplayer Mode: Compete against others in real-time.

#### **Use Case**:

Great for quick, time-bound challenges and stamina tests.

---

### **5. Ranked Mode**

#### **Description**:

Competitive matches with a persistent ranking system that tracks player progress.

#### **Features**:

- **Ranking System**:
  - Tiers (e.g., Bronze, Silver, Gold, Platinum).
  - Gain or lose points based on match outcomes.
- **Match Formats**:
  - One-on-One matches.
  - Optional entry fee (e.g., in-game currency or points).
- **Seasonal Rewards**:
  - Exclusive badges, themes, or perks for top players.

#### **Use Case**:

Encourages long-term participation and appeals to highly competitive users.

---

### **6. Blind Mode**

#### **Description**:

Players cannot test their code during the match; they must submit it without execution.

#### **Features**:

- **Problem Set**:
  - Problems emphasize logic and syntax accuracy.
- **Submission Rules**:
  - No "Run" or "Test" option.
  - Direct submission required.
- **Scoring**:
  - High points for correct first submissions.
  - Deductions for incorrect solutions or multiple submissions.
- **Training Mode**:
  - Practice sessions to build confidence in blind coding.

#### **Use Case**:

Ideal for sharpening coding accuracy and logical thinking under pressure.

---

### **7. Speedrun Mode**

#### **Description**:

A fast-paced mode where the first player to solve a problem correctly wins the match.

#### **Features**:

- **Problem Type**:
  - Short problems designed for rapid solving (e.g., 5-10 minutes each).
- **Match Formats**:
  - Single Problem: One problem, winner takes all.
  - Best of 3: First to solve two out of three problems.
- **Leaderboards**:
  - Track fastest solvers globally or in specific problem categories.

#### **Use Case**:

Perfect for short, adrenaline-filled challenges and casual sessions.

---

### **8. Mystery Mode**

#### **Description**:

A surprise-based mode where rules, scoring, or problem types are revealed only after the match begins.

#### **Features**:

- **Randomized Elements**:
  - Problem difficulty.
  - Time limits (e.g., sudden death rules).
  - Bonus challenges (e.g., solve without loops).
- **Scoring**:
  - Points adjusted dynamically based on the revealed rules.
- **Match Types**:
  - Solo or team-based.
  - Themed or general challenges.

#### **Use Case**:

Engages players who enjoy unpredictability and creative problem-solving.
