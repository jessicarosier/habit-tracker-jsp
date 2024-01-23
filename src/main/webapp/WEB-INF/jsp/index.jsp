<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="partials/head.jsp">
    <jsp:param name="title" value="Habit Tracker"/>
</jsp:include>
<body>
<main class="page-wrapper">
    <jsp:include page="partials/preloader.jsp"></jsp:include>
    <div class="container pt-5">

        <div class="row d-flex flex-row gap-3">
            <%-- Nav Panel --%>
            <jsp:include page="partials/nav.jsp"></jsp:include>



            <section class="row col-md d-flex flex-column border rounded-4 border-dark p-5" id="habit-container">
                <section class="row">
                    <div class="row col-md-8 d-flex flex-column">
                        <h2>Hello there, <span>${user.getFirstName()}</span></h2>
                        <button type="button" class="btn btn-outline-primary rounded-pill w-25" data-bs-toggle="modal"
                                data-bs-target="#addHabit">+ Add Habit
                        </button>
                    </div>

                    <div class="row col-md d-flex flex-column justify-content-center align-items-center w-25 gap-3">
                        <div class="d-flex justify-content-between align-items-center w-100 gap-3">
                            <p class="m-0">Today <span> ${date}</span></p>
                            <div class="d-flex flex-row gap-1">
                                <button class="btn btn-outline-primary rounded-circle"><</button>
                                <button class="btn btn-outline-primary rounded-circle"> ></button>
                            </div>
                        </div>

                        <div class="progress p-0" role="progressbar" aria-label="Basic example" aria-valuenow="100"
                             aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar"></div>
                        </div>

                        <p class="m-0 text-end w-100">
                            <span class="fs-5" id="daily-percent-complete"></span>
                            of daily goal met</p>
                    </div>
                </section>
                <!-- Habits are dynamically inserted here -->
            </section>

        </div>
    </div>


    <!-- Add Habit Modal -->
    <div class="modal fade" id="addHabit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addModalLabel">Add a new Habit</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="add-habit-form">
                        <div class="mb-3">
                            <label for="habit-name" class="form-label">Habit Name</label>
                            <input type="text" class="form-control" id="habit-name" placeholder="Enter a name">
                        </div>
                        <div class="mb-3">
                            <label for="habit-category">Habit Category</label>
                            <select id="habit-category" class="form-select" aria-label="habit-category">
                                <option selected>Please make a selection</option>
                                <option value="1">Physical Health</option>
                                <option value="2">Mental Health</option>
                                <option value="3">Relationships</option>
                                <option value="4">Time</option>
                                <option value="5">Career</option>
                                <option value="6">Financial</option>
                                <option value="7">Spiritual</option>
                            </select>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="habit-frequency" id="daily" checked>
                            <label class="form-check-label" for="daily">
                                Daily
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="habit-frequency" id="weekly">
                            <label class="form-check-label" for="weekly">
                                Weekly
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="add-habit-btn" type="button" class="btn btn-primary">Add Habit</button>
                </div>
            </div>
        </div>
    </div>


</main>


<jsp:include page="partials/script.jsp">
    <jsp:param name="js" value="main.js"/>
</jsp:include>
</body>
</html>
