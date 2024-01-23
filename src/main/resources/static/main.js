const urlPattern = `${window.location.protocol}//${window.location.host}`;
const addHabitBtn = document.querySelector("#add-habit-btn");
const percentCompletedContainer = document.querySelector("#daily-percent-complete");
let percentCompleted;

console.log("test");

async function getAllHabits() {
    const backendEndpoint = `${urlPattern}/api/habits`;
    try {
        const response = await fetch(backendEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const responseData = await response.json();
        console.log("Habits successfully received from the backend:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error receiving habits from the backend:", error.message);
    }
}

async function getUpdatedPercent() {
    const backendEndpoint = `${urlPattern}/api/update/percent`;
    try {
        const response = await fetch(backendEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const responseData = await response.json();
        console.log("Percentage successfully received from the backend:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error receiving percentage from the backend:", error.message);
    }
}

async function updateCurrentPercent() {
    percentCompleted = await getUpdatedPercent();
    percentCompletedContainer.innerText = `${percentCompleted.toFixed(0)}%`;
    const progressbar = document.querySelector(".progress");
    progressbar.innerHTML = `
    <div class="progress-bar bg-info" style="width: ${percentCompleted}%"></div>
    `;
}


async function addNewHabit() {
    const habitName = document.querySelector("#habit-name").value;
    const habitCategory = document.querySelector("#habit-category").value;
    const habitFrequency = document.querySelector("input[name=\"habit-frequency\"]:checked").getAttribute("id");

    const habit = {
        name: habitName,
        catId: parseInt(habitCategory),
        frequency: habitFrequency
    };

    const backendEndpoint = `${urlPattern}/api/add/habit`;
    try {
        const response = await fetch(backendEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(habit),
        });

        if (!response.ok) {
            throw new Error("Failed to send habit to the backend");
        }
        const responseData = await response.json();
        await renderSingleHabit(responseData);
        await updateCurrentPercent();
        //TODO: close the bootstrap modal
        console.log("Habit successfully sent to the backend:", responseData);
    } catch (error) {
        console.error("Error sending habit to the backend:", error.message);
    }
}

async function renderSingleHabit(habit) {
    const habitsContainer = document.querySelector("#habit-container");
    let status;
    let statusIcon;
    let color;
    let textColor;
    let backgroundColor;
    let categoryColor = habit.category.color;
    let buttonColor;

    if (habit.completed === false) {
        status = "Not completed";
        statusIcon = "bi-x-circle-fill";
        color = "red";
        textColor = categoryColor;
        backgroundColor = "bg-white";
        buttonColor = `btn-${categoryColor}`;
    } else {
        status = "Completed";
        statusIcon = "bi bi-check2-all";
        color = "white";
        textColor = "white";
        buttonColor = "btn-outline-light";
        backgroundColor = `bg-${categoryColor}`;


    }

    const habitCard = document.createElement("div");
    habitCard.classList.add("card", `border-${categoryColor}`, "mb-3", "pb-2", `${backgroundColor}`);
    habitCard.innerHTML = `
            <div class="card-body text-${textColor}">
                    <p>
                        <i class="bi bi-calendar-check"></i>
                       ${habit.category.name}
                    </p>
                <h5 class="card-title d-flex justify-content-between">
                    ${habit.name}
                    
                  <div class="dropdown">
                  <button type="button" class="btn ${buttonColor} dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a id="delete-habit-btn" type="button" class="dropdown-item btn ${buttonColor}">
                      <i class="bi bi-trash3"></i>
                      </a>
                    </li>
                </ul>
                </div>
                  </div>
                </h5>
                <div class="card-text d-flex justify-content-between">
                    <p class="toggle-status text-${textColor}">
                    <i class="${statusIcon}" style="color: ${color};"></i>
                        ${status} / ${habit.frequency}
                    </p>  
                </div>
            </div>
        `;

    // event listener for habit card nodes
    const deleteBtn = habitCard.querySelector("#delete-habit-btn");
    deleteBtn.addEventListener("click", async () => {
        const backendEndpoint = `${urlPattern}/api/delete/habit/${habit.id}`;
        try {
            const response = await fetch(backendEndpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete habit from the backend");
            }
            console.log("Habit successfully deleted from the backend");
            habitCard.remove();
        } catch (error) {
            console.error("Error deleting habit from the backend:", error.message);
        }

        habitCard.remove();
        // TODO: update the percentage not working on delete
        await updateCurrentPercent();
    });

    const toggleStatusBtn = habitCard.querySelector(".toggle-status");
    toggleStatusBtn.addEventListener("click", async () => {
        const backendEndpoint = `${urlPattern}/api/update/habit/status/${habit.id}`;
        try {
            const response = await fetch(backendEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to update habit status on the backend");
            }
            console.log("Habit status successfully updated on the backend");
            const responseData = await response.json();
            console.log(responseData);
            await updateCurrentPercent();

            if (responseData.completed === false) {
                status = "Not completed";
                statusIcon = "bi-x-circle-fill";
                color = "red";
                habitCard.querySelector(".card-body").classList.remove(`text-${textColor}`);
                habitCard.querySelector(".btn").classList.remove(`${buttonColor}`);
                toggleStatusBtn.classList.remove(`text-${textColor}`);
                buttonColor = `btn-${categoryColor}`;
                textColor = categoryColor;
                toggleStatusBtn.classList.add(`text-${textColor}`);
                habitCard.querySelector(".card-body").classList.add(`text-${textColor}`);
                habitCard.querySelector(".btn").classList.add(`${buttonColor}`);
                habitCard.classList.remove(`${backgroundColor}`);
                backgroundColor = "bg-white";
                habitCard.classList.add(`${backgroundColor}`);
            } else {
                status = "Completed";
                statusIcon = "bi bi-check2-all";
                color = "white";
                habitCard.querySelector(".card-body").classList.remove(`text-${textColor}`);
                habitCard.querySelector(".btn").classList.remove(`${buttonColor}`);
                toggleStatusBtn.classList.remove(`text-${textColor}`);
                buttonColor = `btn-outline-light`;
                textColor = "white";
                toggleStatusBtn.classList.add(`text-${textColor}`);
                habitCard.querySelector(".card-body").classList.add(`text-${textColor}`);
                habitCard.querySelector(".btn").classList.add(`${buttonColor}`);
                habitCard.classList.remove(`${backgroundColor}`);
                backgroundColor = `bg-${categoryColor}`;
                habitCard.classList.add(`${backgroundColor}`);
                toggleStatusBtn.style.color = "white";
            }
            toggleStatusBtn.innerHTML = `
                    <i class="${statusIcon}" style="color: ${color};"></i>
                    ${status} / ${habit.frequency}
                `;
        } catch (error) {
            console.error("Error updating habit status on the backend:", error.message);
        }
    });

    habitsContainer.appendChild(habitCard);

}


async function renderHabits() {
    const habits = await getAllHabits();
    await updateCurrentPercent();

    habits.forEach(habit => {
        renderSingleHabit(habit);
    });
}

addHabitBtn.addEventListener("click", addNewHabit);

window.addEventListener("load", async () => {
    const habits = await getAllHabits();

    await renderHabits();


});
