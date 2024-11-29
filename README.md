## CodeAscend

CodeAscend is an interactive platform designed for developers to engage in competitive coding challenges, enhance their problem-solving skills, and climb the ranks in real-time coding battles. Whether you're a beginner or an experienced coder, CodeAscend provides a fun and challenging environment to test your abilities in problem solving through head-to-head matches, tournaments, and dynamic coding challenges.

### Project Structure

- **Frontend**: Built using React and TypeScript.
- **Backend**: Node.js and Express, handling APIs and Socket.IO for real-time matchmaking.
- **Database**: PostgreSQL for storing user data, problem sets, and match results.
- **Monorepo**: Organized using `apps` (for web and server) and `packages` (for UI, tsconfig).

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
