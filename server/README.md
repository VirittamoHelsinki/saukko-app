# Saukko-App backend

## Todo List and Logic Explanation

### Modification of Email Templates:
The **server/mailer.js** houses all the email templates used within the application. These templates require modifications to align with the designer's vision.

### Evaluation Data Handling Improvements:

### Evaluation Router:
- In **server/routers/evaluationRouter.js**, there is logic that manages the transformation of data returned by the frontend. Currently, when the frontend submits data, the supervisor ID is returned as supervisorId. This approach is outdated due to numerous changes and refactoring of the application's logic. To accommodate the need for evaluations to support multiple supervisors, the logic now needs to convert **supervisorId** to **supervisorsId** (an array of ids). This modification will enable the system to handle updates to evaluations when multiple supervisors are involved, a critical fix for the frontend in the future.
  
- The process of creating an evaluation includes sending emails to supervisors. This is linked to the logic within userRouter.js, which determines if a newly created user is a supervisor. If so, it omits sending an email since the supervisor will receive a distinct email when linked to an evaluation.

- The update functionality for an evaluation, accessed through 
```js
evaluationRouter.put('/evaluation/:id', async (req, res) => { ... 
```
involves complex logic for updating and sending emails. It is advisable to review this section carefully for potential improvements.
  
### Middleware for Cleaner Code:
- It is recommended to implement an asyncErrorHandler middleware for improved code cleanliness and readability. This middleware reduces the amount of boilerplate code required for error handling.

#### Example:
  ```js
  const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  module.exports = asyncHandler;
  ```

### Manual testing has been conducted using tools such as Insomnia or Postman.
