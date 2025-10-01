# vmd-backend-interview
a series of backend challenges for villageMD

# IOU API

This is an API that traacks debt between individuals (IOUs). The API has three endpoints 

 - GET /users List all users
 - GET /users/{id} Show details on a user including who they owe money too and who owes them money.
 - POST /iou Create a new iou specifying one person owing money to another and how much

The API however is not complete. Your task is to complete the API in order to make the three existing tests pass

## Steps

1. Clone this project and check out this branch
2. Install the dependencies: `poetry install`
3. Run the tests: `pytest`
4. The tests will all fail. Implement the API by reading the tests and infering their correct behavior.