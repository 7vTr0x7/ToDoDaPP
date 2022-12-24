//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TaskContract {

   event AddTask(address indexed recipient , uint256 taskId);
   event DeleteTask(uint256 indexed taskId , bool isDeleted);

   struct Tasks{
    uint256 id;
    string taskText;
    bool isDeleted;
   }

   Tasks[] private tasks;

   mapping (uint256  => address) public taskToOwner;

   function addTasks(string memory _taskText,bool _isDeleted) external {
    uint256 taskId = tasks.length;
    tasks.push(Tasks(taskId,_taskText,_isDeleted));
    taskToOwner[taskId] = msg.sender;

    emit AddTask(msg.sender,taskId);

   }

   function getMyTasks() external view returns (Tasks[] memory) {
        Tasks[] memory temporary = new Tasks[](tasks.length);
        uint counter = 0;
        for(uint i=0; i<tasks.length; i++) {
            if(taskToOwner[i] == msg.sender && tasks[i].isDeleted == false) {
                temporary[counter] = tasks[i];
                counter++;
            }
        }

        Tasks[] memory result = new Tasks[](counter);
        for (uint256 i = 0 ; i < counter ; i++){
         result[i] = temporary[i];
        }
        return result;
   }

    function deleteTasks(uint taskId, bool isDeleted) external {
        if(taskToOwner[taskId] == msg.sender) {
            tasks[taskId].isDeleted = isDeleted;
            emit DeleteTask(taskId, isDeleted);
        }
    }
}