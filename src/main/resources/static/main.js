import {urlPattern} from "./js/variables.js";
import {getAllHabits, getUpdatedPercent} from "./js/api-get.js";


//update the daily percent complete in the DOM
async function updateCurrentPercent() {
    let percentCompleted = await getUpdatedPercent();
    console.log(percentCompleted);
    if (percentCompleted === 0) {
        percentCompleted = 0;
    }

    if (percentCompleted === 100) {
        $("#daily-percent-complete").css({"color": "green", "font-weight": "bold"});
        $(".progress-bar").css("background-color", "green");
    } else {
        $("#daily-percent-complete").css({color: "", "font-weight": ""});
        $(".progress-bar").css("background-color", "");
    }

    $("#daily-percent-complete").text(`${percentCompleted.toFixed(0)}%`);
    $(".progress-bar").css("width", `${percentCompleted.toFixed(0)}%`);
}


//adds a new habit, sends it to the backend to save it to the database, and appends it to the DOM
async function addNewHabit() {
    const habitName = $("#habit-name").val();
    const habitCategory = $("#habit-category").val();
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

// dynamically builds a habit card node and appends it to the DOM
async function renderSingleHabit(habit) {
    let status;
    let statusIcon;
    let color;
    let textColor;
    let backgroundColor;
    let categoryColor = "primary";
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
        await checkForHabits();
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
    await checkForHabits();
    $("#habit-container").append(habitCard);

}


// callback function to render all habits from the backend into the DOM
async function renderHabits() {
    // get all habits from the backend and return them as an array
    const habits = await getAllHabits();
    await checkForHabits();
    //update the daily percent complete in the DOM
    await updateCurrentPercent();
    // iterate over the array of habits and pass each habit to renderSingleHabit()
    habits.forEach(habit => {
        renderSingleHabit(habit);
    });
}

async function checkForHabits() {
    const habits = await getAllHabits();
    console.log(habits.length);
    if (habits.length === 0) {
        $("#no-habits").show();
    } else {
        $("#no-habits").hide();
    }

}


// event listener for add habit button
    $("#add-habit-btn").click(() => addNewHabit());

// event listener always listening for the habits to be rendered
    window.addEventListener("DOMContentLoaded", renderHabits);
