# GitHub User Information Viewer

This project is a simple web application that allows users to enter a GitHub username and retrieve and display relevant user information using the GitHub API. It also includes functionality to store and retrieve past searches from local storage.

## Features

- Fetch and display GitHub user information.
- Store user searches in local storage for quick retrieval.
- Show user's favorite programming language based on recent repository activity.

## How to Use

1. Enter a GitHub username in the input field.
2. Click the 'Submit' button to retrieve the user's information.
3. View the user's profile photo, bio, personal details, and favorite programming language.
4. If the user has been searched before, their information will be loaded from local storage.

## Technical Details

- The application uses `fetch` API to retrieve user data from GitHub's API.
- User information is displayed dynamically using DOM manipulation.
- Local storage is utilized to store and retrieve user data for repeated searches.
- The application identifies the user's favorite programming language by analyzing the most recent repositories.
