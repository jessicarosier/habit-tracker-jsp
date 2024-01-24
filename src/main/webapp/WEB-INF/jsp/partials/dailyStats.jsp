<section class="row">
    <div class="row col-md-8 d-flex flex-column">
        <h2>Hello there, <span>${user.getFirstName()}</span></h2>
        <div class="d-flex gap-3">
            <button type="button" class="btn btn-outline-primary rounded-pill w-25 flex-fill"
                    data-bs-toggle="modal"
                    data-bs-target="#addHabit">+ Add Habit
            </button>
            <div class="dropdown p-0 flex-fill">
                <a class="btn btn-outline-primary dropdown-toggle rounded-pill" href="#" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    Filter By Category
                </a>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/physical">Physical Health</a></li>
                    <li><a class="dropdown-item" href="#">Mental Health</a></li>
                    <li><a class="dropdown-item" href="#">Relationships</a></li>
                    <li><a class="dropdown-item" href="#">Time</a></li>
                    <li><a class="dropdown-item" href="#">Career</a></li>
                    <li><a class="dropdown-item" href="#">Financial</a></li>
                    <li><a class="dropdown-item" href="#">Spiritual</a></li>
                </ul>
            </div>
        </div>
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