# Security Specifications

## Data Invariants
- A user document must exist under `users/{userId}` where the `userId` matches the authenticated user's ID.
- The user document must only contain `masteryPercentage` (number between 0 and 100) and `updatedAt` (timestamp).
- A user can only access and update their own document.

## Defining the "Dirty Dozen" Payloads
1. **Wrong ID (Identity Spoofing)**: Creating a users document where the document ID does not match the requester's UID.
2. **Missing required fields**: Creating a user doc without `masteryPercentage` or `updatedAt`.
3. **Invalid field types**: Setting `masteryPercentage` to a boolean or text string.
4. **Out of bounds**: Setting `masteryPercentage` to 101 or -1.
5. **Additional ghost fields**: Adding `{ isAdmin: true }` to the profile.
6. **No Auth**: Attempting to read or write without a logged in user.
7. **Cross-user read**: User A trying to get User B's profile.
8. **Invalid timestamp**: `updatedAt` being something else than `request.time`.
9. **Update missing validation**: Trying to update `masteryPercentage` but injecting an extra field.
10. **Admin spoof via array/map**: Trying to put a map inside `{ masteryPercentage: { isComplete: ... } }`.
11. **Excessive string lengths**: (Not applicable directly here as there are no strings, but `updatedAt` must solely be timestamp.)
12. **Null fields**: Sending `masteryPercentage: null`.

## Test Runner
Defined inside `firestore.rules.test.ts`.
