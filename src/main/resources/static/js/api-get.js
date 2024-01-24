import {urlPattern} from "/js/variables.js";
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

async function getHabitsByCategory(categoryName) {
    const backendEndpoint = `${urlPattern}/api/habits/${categoryName}`;
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

export {getAllHabits, getUpdatedPercent, getHabitsByCategory};