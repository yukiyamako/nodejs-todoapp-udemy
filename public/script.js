const tasksDom = document.querySelector(".tasks");
const formDom = document.querySelector(".task-form");
const taskInputDom = document.querySelector(".task-input");
const formAlertDom = document.querySelector(".form-alert");

// /api/v1からタスクを読み込む
const showTasks = async () => {
    //タスクを出力
    try{
        //自作のAPIを叩く
        const {data : tasks} = await axios.get("/api/v1/tasks");

        //taskが一つもないとき
        if(tasks.length < 1){
            tasksDom.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
            return;
        }

        const allTasks = tasks.map(task => {
            const { completed, _id, name} = task;

            return `<div class="single-task ${completed && "task-completed"}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
                <!--編集リンク -->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>

                <!-- ゴミ箱リンク -->
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`
        })
        .join("");
        tasksDom.innerHTML = allTasks;
    }
    catch(error){
        console.log(err);
    }
};

showTasks();

// タスクの新規作成
formDom.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDom.value;

    try{
        await axios.post("/api/v1/tasks", {name : name});
        showTasks();
        taskInputDom.value = "";
        formAlertDom.style.display = "block";
        formAlertDom.textContent = "タスクを追加しました";
        formAlertDom.classList.add("text-success");
    }
    catch(err){
        console.log(err);

        formAlertDom.style.display = "block";
        formAlertDom.innerHTML = "20文字以下でよろしく！";
    }
    setTimeout(() => {
        formAlertDom.style.display = "none";
        formAlertDom.classList.remove("text-success");
    }, 3000);

});

// タスクを削除する
tasksDom.addEventListener("click", async(event) => {
    const element = event.target;
    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;
        try{
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        }catch(err){
            console.log(err);
        }
    }
});

