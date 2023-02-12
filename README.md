This app has been bootstrapped using Create-React-App. To run it, there are several things that need to be set up:

1. You need your own Github personal access token for the app to make necessary API calls. It should be created using the instructions on https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token and added to a .env file in the root of the project with the following name: REACT_APP_GITHUB_TOKEN. An example .env file has been provided in the project.

2. Run npm install in the root of the project.

3. Run npm start to run the project.

Few disclaimers:

- The app has been made with some functionality missing. It hasn't been perfect in including all the possible use cases that an app like this should work with. The code I wrote was written to a point where it shows what I consider to be a suitable solution for the purposes of this task and to showcase my knowledge at this point. However, for a production solution, there would be more cases to handle.
- The sorting functionality is implemented using table header clicks. To try it out, please click either stars or forks in the table of repositories.