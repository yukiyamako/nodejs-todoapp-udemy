const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDom = document.querySelector(".single-task-form");
const formAlertDom = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");


const params = window.location.search;
const id = new URLSearchParams(params).get("id");

console.log(id);

// 1つの特定のタスクを取得する
const showTask = async () => {
    try{
        const { data : task } = await axios.get(`/api/v1/tasks/${id}`);
        const { _id, completed, name } = task;
        taskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        if(completed){
            taskCompletedDOM.checked = true;
        }
    }
    catch(err){
        console.log(err);
    }
};

showTask();

// タスクの編集
editFormDom.addEventListener("submit", async (e) => {
    e.preventDefault();
    try{
        const taskName = taskNameDOM.value;
        taskCompleted = taskCompletedDOM.checked;
        if(taskName.length < 20){
            const { data : task } = await axios.patch(`/api/v1/tasks/${id}`,{
                name: taskName,
                completed:taskCompleted,
            });
            formAlertDom.style.display = "block";
            formAlertDom.textContent = "編集完了！";
            formAlertDom.classList.add("text-success");
        }
        else{
            throw new RangeError();    
        }
    } catch(err){
        if (err instanceof RangeError){
            formAlertDom.style.display = "block";
            formAlertDom.textContent = "20文字以内にしてほしいなぁ〜";
        }
        else{
            console.log(err);
        }
    }
    setTimeout(() => {
        formAlertDom.style.display = "none";
        formAlertDom.classList.remove("text-success");
    }, 3000);
})