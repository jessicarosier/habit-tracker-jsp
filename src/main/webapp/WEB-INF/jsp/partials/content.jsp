<section class="row col-md-8 d-flex flex-column gap-4">
    <div class="row d-flex flex-row">
        <ul class="nav nav-pills w-75">
            <li class="nav-item">
                <a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#week-tab-pane">Week</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#month-tab-pane">Month</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#year-tab-pane">Year</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#all-tab-pane">All
                    Time</a>
            </li>
        </ul>
    </div>

    <div class="row d-flex flex-row">
        <div class="btn-group w-25" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-primary">
                <i class="bi bi-caret-left-fill"></i>
            </button>
            <button type="button" class="btn btn-outline-primary">
                <i class="bi bi-caret-right-fill"></i>
            </button>
        </div>
        <h3 class="w-50"><span>${weekStart}</span> - <span>${weekEnd}</span></h3>
    </div>

    <div class="tab-content" id="myTabContent">
        <!--Weekly View-->
        <div class="tab-pane fade" id="week-tab-pane">
            Week
        </div>
        <!--Monthly View-->
        <div class="tab-pane fade" id="month-tab-pane">
            Month
        </div>
        <!--Yearly View-->
        <div class="tab-pane fade" id="year-tab-pane">
            Year
        </div>
        <!--All Time View-->
        <div class="tab-pane fade" id="all-tab-pane">
            All Time
        </div>
    </div>

</section>