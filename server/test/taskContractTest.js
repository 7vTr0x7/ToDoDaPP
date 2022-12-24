const { expect } = require("chai");
const { ethers } = require("hardhat");

describe(" TaskContract " , () => {
    let TaskContract;
    let taskContract;
    let owner;

    const NUM_TOTAL_TASKS = 5;

    let totalTasks;

    beforeEach(async() => {
        TaskContract = await ethers.getContractFactory("TaskContract");
        [owner] = await ethers.getSigners();
        taskContract = await TaskContract.deploy();

        totalTasks = [];

        for (let i = 0; i < NUM_TOTAL_TASKS; i++) {
            let task = {
                taskText : " task Number : " + i,
                isDeleted : false,
            };

            await taskContract.addTasks(task.taskText , task.isDeleted);

            totalTasks.push(task);
            
        }
    })

    describe(" addTasks " , () => {
        it(" Should emit add task Event" , async() => {
            let task = {
                taskText : " New Task ",
                isDeleted : false, 
            };
            
            await expect(await taskContract.addTasks(task.taskText , task.isDeleted)).to.emit(taskContract, "AddTask").withArgs(owner.address, NUM_TOTAL_TASKS);
        });
    });

    describe("getAllTasks" , () => {
        it(" should return the correct number of tasks " , async() => {
            const tasksFromChain = await taskContract.getMyTasks();
            expect(tasksFromChain.length).to.equals(NUM_TOTAL_TASKS);
        })
    })

    describe(" DeleteTasks " , () => {
        it("should emit deleteTask event", async() => {
            const TASK_ID = 0;
            const TASK_DELETED = true;

            await expect(
                taskContract.deleteTasks(TASK_ID , TASK_DELETED)
            ).to.emit(
                taskContract, " DeleteTask "
            ).withArgs(
                TASK_ID,
                TASK_DELETED,
            )
        })
    })
})